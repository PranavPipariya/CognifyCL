// pages/api/getEntries.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("http://localhost:3001/entries");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch from sync-bridge:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
}
