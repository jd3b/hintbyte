# 🧠 HintByte - GenAI LeetCode Helper

**HintByte** is a Chrome Extension that provides real-time AI-generated hints for LeetCode problems using Google’s Gemini API. When you open any LeetCode problem, the extension injects a draggable, beautiful hints window into the page—helping you think, not Google!

---

## 🚀 Features

- ✅ Automatically detects the current LeetCode problem title
- 💡 Fetches 3 helpful Gemini AI-generated hints instantly
- ↔️ Paginated hint view with Previous/Next controls
- 🔄 Reset to regenerate fresh hints
- 🔒 Secure backend using environment variables
- 🧲 Draggable and position-persistent hint window
- 📦 Gemini 2.5 flash API integration

---

## 🧩 Tech Stack

- **Frontend**: Vanilla JS + HTML + Tailwind CSS (injected via content script)
- **Backend**: Node.js + Express
- **AI Model**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Browser Support**: Chrome with Manifest V3

---

## 🛠️ Setup Instructions

### Backend (Node.js)

**Deployed on Render**  
🌐 https://hintbyte.onrender.com

## 🛠️ Backend Setup (Optional for Local Testing)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/hintbyte.git
cd hintbyte/backend
```

### 2. Create `.env`

```env
PORT=10000
OPENAI_API_KEY=your_openai_key
```

> Note: This is already deployed, but you can run it locally if needed.

### 3. Start the server

```bash
npm install
npm start
```

Backend will run at: `http://localhost:10000`

---

## 🧩 Chrome Extension Setup

1. Clone the repo or download as ZIP.
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `extension/` folder

---

## 🔁 How It Works

- The content script detects the LeetCode problem title.
- Sends it to the deployed backend (`https://hintbyte.onrender.com/api/hints`).
- Receives and displays AI-generated hints in a draggable UI.

---

## 💻 Folder Structure

```
hintbyte/
│
├── backend/              # Node.js server using Gemini API
│   ├── index.js
│   └── .env
│
├── extension/            # Chrome extension source code
│   ├── content.js
│   ├── manifest.json
│   ├── icon.png
│
└── README.md
```

---


## ❓ Coming Soon

- ✨ AI-generated solutions
- 🔎 Support for filtering hint types (conceptual / edge case / brute force)
- 💾 Saving hint history

---

## 🤝 Contributing

PRs welcome! Please open issues or submit improvements for:
- UI responsiveness
- Gemini prompt quality
- Multi-language support

---

## ⚠️ Disclaimer

This is not affiliated with LeetCode or Google. It uses publicly accessible Gemini APIs and browser extension mechanisms for educational purposes.



