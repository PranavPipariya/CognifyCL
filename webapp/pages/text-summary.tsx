'use client';
import { useState } from "react";
import { getSummaryAndLinks } from "@/lib/summarizer";

export default function SummaryTest() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const result = await getSummaryAndLinks("https://www.nature.com/articles/d41586-024-01234-w");
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-4">🧠 LLM Summarizer Test</h1>
      <button
        onClick={handleSummarize}
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Loading..." : "Summarize Article"}
      </button>

      <div className="mt-6 whitespace-pre-wrap text-lg">
        {summary}
      </div>
    </div>
  );
}
