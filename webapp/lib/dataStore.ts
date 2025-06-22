
type Entry = {
  url: string;
  summary: string;
  category: string;
  createdAt: number;
};

const globalAny = global as any;
if (!globalAny.entriesStore) {
  globalAny.entriesStore = [];
}
let entries: Entry[] = globalAny.entriesStore;

export function addEntry(entry: Entry) {
  console.log("📥 Adding Entry:", entry);
  entries.push(entry);
}

export function getEntriesByCategory(category: string): Entry[] {
  const result = entries.filter(e => e.category.toLowerCase() === category.toLowerCase());
  console.log("📤 Fetched Entries for", category, "→", result);
  return result;
}

export function getAllCategories(): string[] {
  const cats = new Set(entries.map(e => e.category));
  return Array.from(cats);
}

