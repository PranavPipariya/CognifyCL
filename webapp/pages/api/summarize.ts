
import type { NextApiRequest, NextApiResponse } from "next";
import { runLocalLLMSummary } from "@/lib/summarizer";
import { addEntry } from "@/lib/dataStore";
import { getCategoryFromContent } from "@/lib/categoryKeywords";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  try {
    const summary = await runLocalLLMSummary(content);
    const category = getCategoryFromContent(content + summary); // <-- check both url + summary for keywords

    addEntry({
      url: content,
      summary,
      category,
      createdAt: Date.now(),
    });

    return res.status(200).json({ summary, category });
  } catch (error) {
    console.error("Summarization Error:", error);
    return res.status(500).json({ error: "Failed to summarize content" });
  }
};

export default handler;
