/* WeRoFleet Console — apply-run PDF report (window.WRF_REPORT)
   Turns a deployment run (the same log the RunModal renders) into a printable
   PDF: a summary, a FAILURES-FIRST section (what didn't apply and why), then a
   per-room breakdown. Uses jsPDF (window.jspdf), inlined offline by the bundler. */
(function () {
  const { t } = window.WRF_I18N;

  function jsPDFCtor() {
    if (window.jspdf && typeof window.jspdf.jsPDF === 'function') return window.jspdf.jsPDF;
    if (typeof window.jsPDF === 'function') return window.jsPDF;
    return null;
  }
  function available() { return !!jsPDFCtor(); }

  // Split a flat run log ([head, act, act, head, act, …]) into per-device groups.
  function groupLog(log) {
    const groups = [];
    let cur = null;
    (log || []).forEach((e) => {
      if (e.kind === 'head') { cur = { name: e.name || '—', model: e.model || '', acts: [] }; groups.push(cur); }
      else if (e.kind === 'act') {
        if (!cur) { cur = { name: '—', model: '', acts: [] }; groups.push(cur); }
        cur.acts.push(e);
      }
    });
    groups.forEach((g) => {
      g.ok = g.acts.filter((a) => a.status === 'ok').length;
      g.err = g.acts.filter((a) => a.status === 'err').length;
    });
    return groups;
  }

  function stamp(d) {
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
  }
  function slug(s) { return String(s || 'preset').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'preset'; }
  function locale() { try { return (window.WRF_I18N && window.WRF_I18N.getLang && window.WRF_I18N.getLang()) || undefined; } catch (e) { return undefined; } }

  // Palette (RGB) — mirrors the app's accent/status colors.
  const INK = [23, 32, 38], SUB = [110, 120, 128], LINE = [222, 226, 230];
  const TEAL = [14, 124, 134], RED = [194, 65, 12], GREEN = [31, 138, 91];

  // Generate + download the PDF. `run` = { preset, total, log, ok, err, live, title? }.
  function applyRunPdf(run) {
    const JsPDF = jsPDFCtor();
    if (!JsPDF) throw new Error(t('PDF engine unavailable'));

    const doc = new JsPDF({ unit: 'pt', format: 'a4', compress: true });
    const PW = doc.internal.pageSize.getWidth();
    const PH = doc.internal.pageSize.getHeight();
    const M = 42;
    const CW = PW - M * 2;
    let y = M;

    // Embed IBM Plex Sans (the product typeface) when the font asset is loaded;
    // fall back to jsPDF's core Helvetica if it isn't.
    let FONT = 'helvetica';
    try {
      const F = window.WRF_REPORT_FONTS;
      if (F && F.normal && F.bold) {
        const fam = F.family || 'IBMPlexSans';
        doc.addFileToVFS('WRFPlex-Regular.ttf', F.normal);
        doc.addFont('WRFPlex-Regular.ttf', fam, 'normal');
        doc.addFileToVFS('WRFPlex-SemiBold.ttf', F.bold);
        doc.addFont('WRFPlex-SemiBold.ttf', fam, 'bold');
        FONT = fam;
      }
    } catch (e) { FONT = 'helvetica'; }

    const setColor = (c) => doc.setTextColor(c[0], c[1], c[2]);
    function ensure(h) { if (y + h > PH - M) { doc.addPage(); y = M; } }
    function line() { doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.setLineWidth(0.6); doc.line(M, y, PW - M, y); }
    // Draw wrapped text; returns the height consumed. x/width optional.
    function para(str, opts) {
      opts = opts || {};
      const size = opts.size || 10, x = opts.x != null ? opts.x : M, w = opts.w != null ? opts.w : CW;
      doc.setFont(FONT, opts.bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      setColor(opts.color || INK);
      const lines = doc.splitTextToSize(String(str == null ? '' : str), w);
      const lh = size * 1.32;
      ensure(lines.length * lh);
      lines.forEach((ln) => { doc.text(ln, x, y + size); y += lh; });
      return lines.length * lh;
    }
    function gap(h) { y += (h == null ? 8 : h); }

    const now = new Date();
    const groups = groupLog(run.log);
    const okN = run.ok != null ? run.ok : groups.reduce((n, g) => n + g.ok, 0);
    const errN = run.err != null ? run.err : groups.reduce((n, g) => n + g.err, 0);
    const roomsTotal = groups.length;
    const roomsFailed = groups.filter((g) => g.err > 0).length;

    // ---- header band ----
    doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.rect(0, 0, PW, 74, 'F');
    doc.setFont(FONT, 'bold'); doc.setFontSize(17); doc.setTextColor(255, 255, 255);
    doc.text(run.title || t('Deployment report'), M, 34);
    doc.setFont(FONT, 'normal'); doc.setFontSize(10); doc.setTextColor(224, 244, 245);
    const presetName = (run.preset && run.preset.name) || t('(preset)');
    const modeLbl = run.live ? t('Live') : t('Demo');
    doc.text(presetName + '  ·  ' + modeLbl + '  ·  ' + now.toLocaleString(locale()), M, 54);
    y = 74 + 26;

    // ---- summary line ----
    const roomsOk = roomsTotal - roomsFailed;
    para(t('{rooms} room(s) · {ok} OK · {err} with errors', { rooms: roomsTotal, ok: roomsOk, err: roomsFailed }),
      { size: 10, color: SUB });
    gap(4); line(); gap(14);

    // ---- one entry per room: "Room : OK", or "Room — Error:" + the reasons ----
    if (!groups.length) para(t('No devices were processed.'), { size: 10, color: SUB });
    groups.forEach((g) => {
      const label = g.name + (g.model ? '  (' + g.model + ')' : '');
      if (g.err === 0) {
        ensure(20);
        para(label + ' : ' + t('OK'), { size: 11, bold: true, color: GREEN });
        gap(8);
      } else {
        ensure(30);
        para(label + ' — ' + t('Error') + ' :', { size: 11, bold: true, color: RED });
        g.acts.filter((a) => a.status === 'err').forEach((a) => {
          para('•  ' + a.label + (a.detail ? '  —  ' + a.detail : ''), { size: 9.5, x: M + 14, w: CW - 14, color: INK });
        });
        gap(12);
      }
    });

    // ---- footers (page x / n) ----
    const pages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFont(FONT, 'normal'); doc.setFontSize(8); setColor(SUB);
      doc.text('WeRoFleet', M, PH - 20);
      doc.text(t('Page {n} / {total}', { n: i, total: pages }), PW - M, PH - 20, { align: 'right' });
    }

    doc.save('WeRoFleet-' + slug(presetName) + '-' + stamp(now) + '.pdf');
  }

  window.WRF_REPORT = { applyRunPdf, available, groupLog };
})();
