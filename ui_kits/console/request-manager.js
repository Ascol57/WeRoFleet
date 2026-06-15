/* WeRoFleet Console — RequestManager
   Throttles all Webex API calls to a global rate limit (default 3 req/s) with a
   3-level priority queue. Higher-priority jobs always start before lower ones.

   429 handling (adaptive backoff + auto-retry):
   - A job that rejects with kind 'rate' (HTTP 429) is automatically re-queued
     at the FRONT of its own priority lane and retried (up to MAX_ATTEMPTS).
   - The whole queue pauses for the server's Retry-After (or an exponential
     backoff), and the EFFECTIVE rate is cut so we ease off Webex.
   - When 429s stop, the effective rate ratchets back up to the configured rate.

   window.WRF_RM.schedule(fn, priority) -> Promise resolving to fn()'s result. */
(function () {
  const RATE_KEY = 'wrf-rate-limit';
  function loadRate() { const n = parseInt(localStorage.getItem(RATE_KEY), 10); return (n >= 1 && n <= 20) ? n : 3; }

  let RATE = loadRate();         // configured ceiling (req per WINDOW)
  let effRate = RATE;            // current effective rate (<= RATE; drops on 429)
  const WINDOW = 1000;           // ms
  const ORDER = ['high', 'normal', 'low'];

  const MAX_ATTEMPTS = 6;        // per-job retry cap for 429s
  const BACKOFF_BASE = 1000;     // ms, first backoff when no Retry-After header
  const BACKOFF_MAX = 30000;     // ms cap
  const RECOVERY_STEP = 4000;    // ms of calm before nudging effRate back up

  const queues = { high: [], normal: [], low: [] };
  let starts = [];               // timestamps of recent request starts
  let pumping = false;
  let inFlight = 0;
  let totalDone = 0;
  let totalRetried = 0;

  // throttle state
  let pausedUntil = 0;           // wall-clock ms; queue won't start jobs before this
  let consec429 = 0;            // consecutive 429s (drives exponential backoff)
  let lastHit = 0;              // last 429 timestamp
  let throttled = false;
  let recoveryTimer = null;

  const stateListeners = new Set();
  function emitState() {
    const s = snapshot();
    stateListeners.forEach((f) => { try { f(s); } catch (e) {} });
  }
  function onState(f) { stateListeners.add(f); return () => stateListeners.delete(f); }

  function pending() { return queues.high.length + queues.normal.length + queues.low.length; }

  function schedule(fn, priority) {
    const p = queues[priority] ? priority : 'normal';
    return new Promise((resolve, reject) => {
      queues[p].push({ fn, resolve, reject, priority: p, attempts: 0 });
      kick();
    });
  }

  function dequeue() {
    for (const p of ORDER) { if (queues[p].length) return queues[p].shift(); }
    return null;
  }

  function kick() { if (!pumping) { pumping = true; step(); } }

  function step() {
    const now = Date.now();

    // Hard pause window after a 429 (Retry-After / backoff).
    if (now < pausedUntil) { setTimeout(step, pausedUntil - now + 5); return; }

    starts = starts.filter((t) => now - t < WINDOW);
    if (pending() === 0) { pumping = false; return; }

    if (starts.length >= effRate) {
      const wait = WINDOW - (now - starts[0]) + 5;
      setTimeout(step, Math.max(5, wait));
      return;
    }

    const job = dequeue();
    starts.push(Date.now());
    inFlight++;
    Promise.resolve().then(job.fn).then(
      (v) => { inFlight--; onSuccess(); job.resolve(v); finish(); },
      (e) => { inFlight--; onFailure(job, e); finish(); }
    );
    setTimeout(step, 0);
  }

  function finish() { if (!pumping) kick(); }

  function onSuccess() {
    totalDone++;
    // A clean response means we can begin easing the throttle back off.
    if (throttled) startRecovery();
    consec429 = 0;
  }

  function onFailure(job, e) {
    const isRate = e && (e.kind === 'rate' || e.status === 429);
    if (isRate && job.attempts < MAX_ATTEMPTS) {
      job.attempts++;
      totalRetried++;
      applyBackoff(e);
      // Re-queue at the front of its lane so it retries as soon as the pause lifts.
      queues[job.priority].unshift(job);
      kick();
      return;
    }
    totalDone++;
    job.reject(e);
  }

  function applyBackoff(e) {
    const now = Date.now();
    consec429++;
    lastHit = now;
    throttled = true;

    // Cut the effective rate (halve, floor 1) so we stop hammering Webex.
    effRate = Math.max(1, Math.floor(Math.min(effRate, RATE) / 2));

    // Respect server Retry-After (seconds) when present, else exponential backoff.
    let waitMs = parseInt(e && e.retryAfter, 10);
    waitMs = (waitMs > 0)
      ? waitMs * 1000
      : Math.min(BACKOFF_MAX, BACKOFF_BASE * Math.pow(2, consec429 - 1));
    pausedUntil = Math.max(pausedUntil, now + waitMs);

    startRecovery();
    emitState();
  }

  // Gradually walk effRate back up to RATE once 429s stop arriving.
  function startRecovery() {
    if (recoveryTimer) return;
    recoveryTimer = setInterval(() => {
      if (Date.now() - lastHit < RECOVERY_STEP) return; // still hot; wait
      if (effRate < RATE) {
        effRate = Math.min(RATE, effRate + 1);
        emitState();
        kick();
      }
      if (effRate >= RATE) {
        throttled = false;
        clearInterval(recoveryTimer); recoveryTimer = null;
        emitState();
      }
    }, RECOVERY_STEP);
  }

  // Drop queued (not yet started) jobs; rejects them as cancelled.
  function clear(priority) {
    const ps = priority ? [priority] : ORDER;
    ps.forEach((p) => {
      const q = queues[p] || [];
      q.splice(0).forEach((j) => { const e = new Error('cancelled'); e.kind = 'cancelled'; j.reject(e); });
    });
  }

  function snapshot() {
    return {
      pending: pending(), inFlight, totalDone, totalRetried,
      rate: RATE, effRate, throttled,
      pausedMs: Math.max(0, pausedUntil - Date.now()),
    };
  }
  function stats() { return snapshot(); }

  function setRate(n) {
    n = Math.max(1, Math.min(20, Math.round(Number(n) || 3)));
    RATE = n;
    // Keep the effective rate at the ceiling when calm; never above it when throttled.
    effRate = throttled ? Math.min(effRate, RATE) : RATE;
    try { localStorage.setItem(RATE_KEY, String(n)); } catch (e) {}
    emitState();
    kick();
    return RATE;
  }
  function getRate() { return RATE; }

  window.WRF_RM = { schedule, clear, pending, stats, setRate, getRate, onState, WINDOW };
})();
