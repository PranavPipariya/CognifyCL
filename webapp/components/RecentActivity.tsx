// components/RecentActivity.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockEntries = [
  {
    title: "The Math of Conway's Game of Life",
    tags: ["math", "CS"],
    link: "https://www.conwaylife.com",
  },
  {
    title: "Inside the Craft of Watchmaking",
    tags: ["watchmaking", "design"],
    link: "https://www.hodinkee.com",
  },
  {
    title: "Learn Piano the Neuroplastic Way",
    tags: ["music", "piano"],
    link: "https://www.pianoscience.net",
  },
  // Add more real-time browsing links in the future here
];

export function RecentActivity() {
  return (
    <>
      {mockEntries.slice(0, 10).map((entry, index) => (
        <Card
          key={index}
          className="bg-white/60 backdrop-blur-md border border-gray-300 text-black shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-200"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold leading-tight">
              {entry.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs rounded-md bg-[#e6e9f1] text-gray-700 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-sm text-blue-600 underline hover:text-blue-800 break-all"
            >
              {entry.link.replace(/^https?:\/\//, '')}
            </a>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
