import express from "express";
import OpenAI from "openai";

const router = express.Router();

let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
};

router.post("/smart-replies", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ replies: [] });
    }

    const completion = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate 3 short natural chat replies. Max 8 words. No emojis."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.6,
    });

    const replies = completion.choices[0].message.content
      .split("\n")
      .map(r => r.replace(/^[0-9.-]/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

    res.json({ replies });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ replies: [] });
  }
});

export default router;
