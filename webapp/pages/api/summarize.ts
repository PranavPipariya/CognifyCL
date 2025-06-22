
import type { NextApiRequest, NextApiResponse } from "next";
import { runLocalLLMSummary } from "@/lib/summarizer";
import { addEntry } from "@/lib/dataStore";
import { getCategoryFromContent } from "@/lib/categoryKeywords";

import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content } = req.body; // content is the URL string

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  try {
    // Fetch the HTML content of the URL
    const response = await fetch(content);
    if (!response.ok) {
      return res.status(400).json({ error: "Failed to fetch URL content" });
    }

    const html = await response.text();

    // Extract readable text using Readability
    const dom = new JSDOM(html, { url: content });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res.status(400).json({ error: "Could not extract readable content" });
    }

    const readableText = article.textContent.slice(0, 3000); // limit for LLM

    // Generate summary
    const summary = await runLocalLLMSummary(readableText);

    // Categorize using readable content + summary
    const category = getCategoryFromContent(readableText + summary);

    // Save to data store
    addEntry({
      url: content,         // still store the original URL
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
