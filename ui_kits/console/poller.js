/* WeRoFleet Console — fleet poller
   Continuously sweeps every device's live xAPI status (in-call, RoomOS version,
   uptime) at LOW priority, so user actions always preempt it. After each full
   sweep it waits `cooldown` then sweeps again. Live mode only. */
(function () {
  let cfg = {};
  let stopped = true;
  let running = false;
  let timer = null;
  let sweeping = false;

  async function sweep() {
    if (stopped) return;
    sweeping = true;
    if (cfg.onState) cfg.onState({ sweeping: true });
    const devices = (cfg.getDevices && cfg.getDevices()) || [];
    for (const d of devices) {
      if (stopped) { sweeping = false; return; }
      try {
        const s = await window.WRF_WEBEX.liveStatus(d.id, 'low');
        if (stopped) { sweeping = false; return; }
        if (cfg.onDevice) cfg.onDevice(d.id, s);
      } catch (e) {
        if (e && e.kind === 'cancelled') { sweeping = false; return; }
        // ignore per-device errors (offline device, transient) and continue
      }
    }
    sweeping = false;
    if (cfg.onState) cfg.onState({ sweeping: false, sweptAt: Date.now() });
    if (!stopped) timer = setTimeout(sweep, cfg.cooldown || 20000);
  }

  function start(opts) {
    cfg = opts || {};
    stopped = false;
    if (!running) { running = true; sweep(); }
  }
  function stop() {
    stopped = true;
    running = false;
    sweeping = false;
    clearTimeout(timer);
    if (window.WRF_RM) window.WRF_RM.clear('low'); // drop queued low-priority polls
  }
  function isRunning() { return running && !stopped; }

  window.WRF_POLLER = { start, stop, isRunning };
})();
