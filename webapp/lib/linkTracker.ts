
import fs from "fs";
import path from "path";

const VISITED_PATH = path.join(process.cwd(), "webapp", "data", "visited.json");

export function addVisitedLink(category: string, url: string) {
  let data = {};
  if (fs.existsSync(VISITED_PATH)) {
    data = JSON.parse(fs.readFileSync(VISITED_PATH, "utf-8"));
  }

  if (!data[category]) data[category] = [];
  if (!data[category].includes(url)) data[category].push(url);

  fs.writeFileSync(VISITED_PATH, JSON.stringify(data, null, 2));
}
