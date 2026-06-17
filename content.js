// content.js — VTOP CGPA Hider / Editor
// Runs at document_start, catches elements as they load
(function () {
  let settings = { mode: "hide", customCGPA: "" };
  let processing = false;
  let timer = null;

  function loadSettings(cb) {
    if (chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(["mode", "customCGPA"], (data) => {
        settings.mode = data.mode || "hide";
        settings.customCGPA = data.customCGPA || "";
        if (cb) cb();
      });
    } else {
      if (cb) cb();
    }
  }

  function apply() {
    if (processing) return;
    processing = true;

    try {
      // Target #status card-body and its parent .card
      const statusEl = document.getElementById("status");
      if (statusEl) {
        const card = statusEl.closest(".card") || statusEl.parentElement;
        if (card && card.textContent.toLowerCase().includes("cgpa")) {
          handleSection(card);
          processing = false;
          return;
        }
      }

      // Fallback: text-based search
      const headers = document.querySelectorAll(".card-header, .panel-heading, h3, h4, h5, caption, th");
      for (const el of headers) {
        const txt = el.textContent.toLowerCase();
        if (txt.includes("cgpa") && (txt.includes("credit") || txt.includes("status"))) {
          const container = el.closest(".card") || el.parentElement;
          if (container) {
            handleSection(container);
            break;
          }
        }
      }
    } finally {
      processing = false;
    }
  }

  function handleSection(container) {
    if (settings.mode === "edit" && settings.customCGPA) {
      // Show the section
      container.style.removeProperty("display");

      // Find "Current CGPA" row and replace value
      const items = container.querySelectorAll("li, tr");
      for (const item of items) {
        if (item.textContent.toLowerCase().includes("current cgpa")) {
          const spans = item.querySelectorAll("span");
          for (const s of spans) {
            if (s.children.length === 0 && /^\d+\.?\d*$/.test(s.textContent.trim())) {
              if (s.textContent.trim() !== settings.customCGPA) {
                s.textContent = settings.customCGPA;
              }
            }
          }
        }
      }
      container.setAttribute("data-cgpa-processed", "1");
    } else {
      // Hide
      container.style.setProperty("display", "none", "important");
      container.setAttribute("data-cgpa-processed", "1");
    }
  }

  // Debounced apply for MutationObserver
  function scheduleApply() {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      apply();
    }, 200);
  }

  // Listen for popup messages
  if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "settingsChanged") {
        // Reset processed state so it re-applies
        document.querySelectorAll("[data-cgpa-processed]").forEach(el => {
          el.removeAttribute("data-cgpa-processed");
        });
        loadSettings(() => apply());
      }
    });
  }

  // Start
  loadSettings(() => {
    apply();

    const obs = new MutationObserver((mutations) => {
      // Only react if new nodes were added, not attribute changes from us
      const dominated = mutations.some(m =>
        m.type === "childList" && m.addedNodes.length > 0
      );
      if (dominated) scheduleApply();
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    window.addEventListener("load", () => {
      apply();
      setTimeout(() => { apply(); obs.disconnect(); }, 3000);
    });
  });
})();
