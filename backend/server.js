import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not found in .env");
}

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/hints", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Missing 'title' in request body." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Give exactly 3 helpful and distinct hints to solve the LeetCode problem titled: "${title}".
Number them from 1 to 3 (e.g., 1. ..., 2. ..., 3. ...) and do not include anything else like explanation or summary.
`;

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    const hints = content
      .split(/\n\d+\.\s+/)
      .map((h) => h.trim())
      .filter((h) => h.length > 0)
      .slice(0, 3);

    res.json({ hints });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate hints from Gemini AI." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Gemini backend running at http://localhost:${PORT}`)
);
