// popup.js — Minimal settings for VTOP CGPA Hider

const btnHide = document.getElementById("btn-hide");
const btnEdit = document.getElementById("btn-edit");
const editBox = document.getElementById("edit-box");
const cgpaInput = document.getElementById("cgpa-value");
const applyBtn = document.getElementById("apply-btn");

// Load saved settings
chrome.storage.sync.get(["mode", "customCGPA"], (data) => {
  const mode = data.mode || "hide";
  const cgpa = data.customCGPA || "";
  setMode(mode, false);
  if (cgpa) cgpaInput.value = cgpa;
});

function setMode(mode, save = true) {
  if (mode === "hide") {
    btnHide.classList.add("active");
    btnEdit.classList.remove("active");
    editBox.classList.remove("show");
  } else {
    btnEdit.classList.add("active");
    btnHide.classList.remove("active");
    editBox.classList.add("show");
  }
  if (save) {
    chrome.storage.sync.set({ mode });
    notifyTabs();
  }
}

btnHide.addEventListener("click", () => setMode("hide"));
btnEdit.addEventListener("click", () => setMode("edit"));

// Input validation — only numbers and one dot
cgpaInput.addEventListener("input", () => {
  let val = cgpaInput.value.replace(/[^0-9.]/g, "");
  const parts = val.split(".");
  if (parts.length > 2) val = parts[0] + "." + parts.slice(1).join("");
  if (parseFloat(val) > 10) val = "10.00";
  cgpaInput.value = val;
});

// Apply button
applyBtn.addEventListener("click", () => {
  const val = cgpaInput.value.trim();
  if (!val || isNaN(parseFloat(val))) {
    cgpaInput.style.borderColor = "#ef4444";
    setTimeout(() => (cgpaInput.style.borderColor = ""), 1000);
    return;
  }

  chrome.storage.sync.set({ customCGPA: val, mode: "edit" }, () => {
    applyBtn.textContent = "✓ Done";
    applyBtn.classList.add("done");
    notifyTabs();
    setTimeout(() => {
      applyBtn.textContent = "Apply";
      applyBtn.classList.remove("done");
    }, 1200);
  });
});

function notifyTabs() {
  chrome.tabs.query(
    { url: ["*://vtop.vitbhopal.ac.in/*", "*://vtop.vit.ac.in/*", "*://vtopcc.vit.ac.in/*", "*://vtop.vitap.ac.in/*"] },
    (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { action: "settingsChanged" }).catch(() => {});
      }
    }
  );
}
