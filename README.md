# 🙈 VTOP CGPA Hider

A Chrome extension that **automatically hides** the CGPA and Credit Status section on VTOP — so nobody peeking at your screen can see it.

Works on **all VIT campuses**: VIT Vellore, VIT Bhopal, VIT AP, and VTOPCC.

---

## 📦 How to Install

Since this isn't on the Chrome Web Store, you'll install it manually (takes 30 seconds):

### Step 1: Download & Unzip
- Download the `vtop-cgpa-hider.zip` file
- Unzip it to a folder on your computer (remember where you put it!)

### Step 2: Open Chrome Extensions
- Open Chrome and go to `chrome://extensions/`
- Or click ⋮ → Extensions → Manage Extensions

### Step 3: Enable Developer Mode
- Toggle **"Developer mode"** ON (top-right corner)

### Step 4: Load the Extension
- Click **"Load unpacked"**
- Select the **unzipped `vtop-cgpa-hider` folder**

### Step 5: Done! ✅
- The extension is now active
- Go to VTOP and log in — your CGPA section will be hidden automatically

---

## 🔧 How It Works
- Injects CSS at `document_start` to hide CGPA elements before they render
- Uses a MutationObserver to catch dynamically loaded CGPA sections
- Zero flash — the section never appears on screen

## ❓ FAQ

**Q: Will this affect my grades or VTOP data?**
A: No. It only hides the display on your browser. Nothing is modified on the server.

**Q: Does it work on Firefox/Edge?**
A: It works on any Chromium-based browser (Chrome, Edge, Brave, Arc, etc.). For Firefox, you'd need to load it as a temporary add-on via `about:debugging`.

**Q: How do I see my CGPA again?**
A: Just disable or remove the extension from `chrome://extensions/`.

---

Made with ❤️ to save you from awkward moments.
