# 🙈 VTOP CGPA Hider

A Chrome extension that **hides** or **fakes** your CGPA on VTOP — so nobody peeking at your screen sees the real thing.

Works on **all VIT campuses**: VIT Vellore, VIT Bhopal, VIT AP, and VTOPCC.

---

## ✨ Features

### 🚫 Hide Mode (Default)
- Completely hides the CGPA & Credit Status section
- Injected before the page even renders — zero flash

### ✏️ Edit Mode (NEW!)
- **Set a custom CGPA** that replaces your real one on screen
- Live preview in the extension popup
- Changes apply instantly — no page reload needed

---

## 📦 How to Install

### Step 1: Download & Unzip
- Download the `vtop-cgpa-hider.zip` file from [Releases](https://github.com/trigyy/vtop/releases)
- Unzip it to a folder on your computer

### Step 2: Open Chrome Extensions
- Open Chrome and go to `chrome://extensions/`

### Step 3: Enable Developer Mode
- Toggle **"Developer mode"** ON (top-right corner)

### Step 4: Load the Extension
- Click **"Load unpacked"**
- Select the **unzipped folder**

### Step 5: Done! ✅
- Click the extension icon in the toolbar to switch between **Hide** and **Edit** mode

---

## 🎮 How to Use

1. Click the **extension icon** in your Chrome toolbar
2. Choose your mode:
   - **🚫 Hide** — CGPA section disappears completely
   - **✏️ Edit** — Enter any CGPA value (e.g., `9.50`) and it replaces your real one
3. Changes apply instantly on any open VTOP tab

---

## 🔧 How It Works
- CSS injection at `document_start` for instant hiding
- MutationObserver catches dynamically loaded CGPA sections
- `chrome.storage.sync` saves your settings across sessions
- Real-time messaging between popup and content script

## ❓ FAQ

**Q: Will this affect my actual grades?**
A: No. It only changes what YOU see in your browser. Nothing is modified on the server.

**Q: Does it work on Edge/Brave?**
A: Yes — any Chromium-based browser (Chrome, Edge, Brave, Arc, etc.)

**Q: How do I see my real CGPA again?**
A: Switch back to **Hide** mode and disable the extension, or just disable it from `chrome://extensions/`.

---

Made with ❤️ to save you from awkward moments.
