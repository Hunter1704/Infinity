const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

let ai = null;

if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} else {
    console.log(process.env.GEMINI_API_KEY);
  console.warn("GEMINI_API_KEY is not set; AI routes are disabled.");
}

module.exports = ai;