import { Card, CardContent } from "@/components/ui/card";

const mockEntries = [
  { title: "The Math of Conway's Game", tags: ["math", "CS"], views: 120 },
  { title: "Deep Dive into React Server Components", tags: ["programming", "react"], views: 230 },
  { title: "Intro to Watch Mechanisms", tags: ["engineering"], views: 94 }
];

export function RecentActivity() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockEntries.map((entry, idx) => (
        <Card key={idx}>
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg">{entry.title}</h4>
            <p className="text-sm mt-2">{entry.tags.join(", ")}</p>
            <p className="text-xs text-muted-foreground mt-1">{entry.views} views</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
