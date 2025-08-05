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

### 1. Backend (Node.js)

```bash
git clone https://github.com/jd3b/hintbyte.git
cd hintbyte/backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

Start the backend:

```bash
npm start
# or
node index.js
```

The backend will run on `http://localhost:5000`.

### 2. Chrome Extension (Frontend)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (top right)
3. Click **"Load unpacked"**
4. Select the `extension/` folder inside the project
5. Open any LeetCode problem like [https://leetcode.com/problems/two-sum](https://leetcode.com/problems/two-sum) and see the magic!

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

## 📦 Sample `.env`

```env
GEMINI_API_KEY=your-secret-api-key-here
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



