// lib/categoryKeywords.ts

const categoryKeywords: Record<string, string[]> = {
  Math: ["math", "mathematics", "integration", "algebra", "geometry", "calculus"],
  Programming: ["programming", "code", "javascript", "python", "software", "developer"],
  Drawing: ["art", "drawing", "sketch", "illustration"],
  Piano: ["piano", "keyboard", "music", "melody"],
  Watchmaking: ["watch", "horology", "timepiece"],
  Woodworking: ["wood", "carpentry", "furniture"],
};

export function getCategoryFromContent(content: string): string {
  const lowerContent = content.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => lowerContent.includes(kw))) {
      return category;
    }
  }

  return "Miscellaneous";
}
