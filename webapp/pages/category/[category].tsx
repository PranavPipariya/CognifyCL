import { useRouter } from "next/router";

const categoryData: Record<string, { summary: string; links: string[] }> = {
  Math: {
    summary: "Math is the foundation of logic, patterns, and quantitative reasoning...",
    links: [
      "https://betterexplained.com/articles/understanding-the-math-behind-calc/",
      "https://mathigon.org/course",
    ],
  },
  Programming: {
    summary: "Programming is the art of giving machines instructions...",
    links: [
      "https://developer.mozilla.org/en-US/",
      "https://frontendmasters.com/",
    ],
  },
  // Add more dummy categories as needed
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const data = categoryData[category as string];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No data found for this category.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 bg-[#0d0d0d] text-white">
      <h1 className="text-4xl font-bold mb-4">{category}</h1>
      <p className="text-lg text-gray-300 mb-10">{data.summary}</p>

      <h2 className="text-2xl font-semibold mb-3">Related Links</h2>
      <ul className="list-disc list-inside space-y-2">
        {data.links.map((link, i) => (
          <li key={i}>
            <a
              href={link}
              className="text-blue-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
