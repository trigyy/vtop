// Runs at document_start — catches and removes the CGPA section as it appears
(function () {
  const KEYWORDS = ["cgpa and credit status", "current cgpa", "earned credits", "total credits required"];

  function hasCGPA(text) {
    const t = text.toLowerCase();
    return KEYWORDS.some(k => t.includes(k));
  }

  function nuke(el) {
    el.style.setProperty("display", "none", "important");
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll("h3, h4, h5, th, td, caption, .box-title, .panel-title, .card-title, .box-header, .panel-heading, .card-header").forEach(el => {
      if (hasCGPA(el.textContent || "")) {
        const container = el.closest(".box, .panel, .card, table, section, aside") || el.parentElement?.parentElement?.parentElement;
        if (container) nuke(container);
      }
    });
  }

  scan(document);

  const obs = new MutationObserver(muts => {
    for (const m of muts)
      for (const n of m.addedNodes)
        if (n.nodeType === 1) scan(n);
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener("load", () => {
    scan(document);
    setTimeout(() => { scan(document); obs.disconnect(); }, 2000);
  });
})();
