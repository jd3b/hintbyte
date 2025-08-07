# 🧠 HintByte – AI-Powered LeetCode Helper Extension

**HintByte** is a Chrome Extension that provides AI-generated hints for LeetCode problems directly on the problem page. Powered by the OpenAI API and a custom Node.js backend, it enhances your problem-solving experience without giving away the entire solution.

---

## 🔗 Live Backend

**Deployed on Render**  
🌐 https://hintbyte.onrender.com

---

## ⚙️ Features

- 🧠 Displays up to 3 helpful hints using Gemini/OpenAI for any LeetCode problem.
- 🎛️ Clean and draggable UI with pagination dots and reset functionality.
- 💾 Saves draggable position locally between page loads.
- 🔁 Reacts automatically when you switch LeetCode problems.
- 🧪 Minimal backend using Node.js + Express.

---

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

## 🧠 Powered By

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [OpenAI API](https://platform.openai.com/)
- [Render](https://render.com)

---

## 🧑‍💻 Author

**Debojyoti Jha**  
🔗 GitHub: [debojytijha](https://github.com/debojytijha)

---

## 📄 License

MIT