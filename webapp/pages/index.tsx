import { useEffect, useState } from 'react';
import EntryCard from '@/components/EntryCard';

interface Entry {
  url: string;
  title: string;
  summary: string;
  timestamp: number;
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch('http://localhost:3001/entries');
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('Failed to fetch from sync bridge');
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">My Reading & Watching Footprint</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 w-full max-w-3xl">
          {entries.length ? (
            entries.map((e, idx) => <EntryCard key={idx} entry={e} />)
          ) : (
            <p className="text-gray-500 text-center">
              No entries yet. Start browsing!
            </p>
          )}
        </div>
      )}
    </main>
  );
}
