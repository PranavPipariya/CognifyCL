
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "../sync-bridge/entries.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  if (!category || typeof category !== "string") {
    return res.status(400).json({ error: "Missing category" });
  }

  const rawData = fs.readFileSync(dataPath, "utf-8");
  const entries = JSON.parse(rawData);

  const filtered = entries.filter((e: any) =>
    e.title?.toLowerCase().includes(category.toLowerCase())
  );

  res.status(200).json(filtered);
}
