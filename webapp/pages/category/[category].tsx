
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Entry {
  url: string;
  title: string;
  summary: string;
  timestamp: number;
}

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    async function fetchCategoryEntries() {
      try {
        const res = await fetch(`http://localhost:3001/entries/${category}`);
        if (!res.ok) throw new Error('Category fetch failed');
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('Failed to fetch category entries:', err);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryEntries();
  }, [category]);

  async function handleCardClick(url: string) {
    setSummaryLoading(true);
    setSelectedSummary(null);
    try {
      const res = await fetch('http://localhost:3000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: url }),
      });

      const data = await res.json();
      setSelectedSummary(data.summary);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
      setSelectedSummary('Error fetching summary.');
    } finally {
      setSummaryLoading(false);
    }
  }

  return (
    <>
      {/* Title Bar - Keep As Is */}
      <div className="bg-white py-12 px-6 border-b border-gray-200">
        <h1 className="text-5xl font-light mb-0 capitalize text-center text-gray-800 tracking-tight">
          {category} Notes
        </h1>
      </div>

      {/* Main Content */}
      <main className="bg-[#e4ebf1] min-h-screen py-16 px-6 text-gray-900 font-sans">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-12">
            {/* Summary Panel */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-12 max-h-[750px] overflow-y-auto transition-all">
              <h2 className="text-3xl font-light text-gray-800 mb-6 tracking-tight text-center">
                Teaching Assistant
              </h2>
              <div className="text-3xl font-light text-gray-800 leading-relaxed tracking-tight whitespace-pre-wrap">
                {summaryLoading ? (
                  <p className="italic text-blue-500">Fetching the data...</p>
                ) : selectedSummary ? (
                  <p>{selectedSummary}</p>
                ) : (
                  <p className="text-gray-400 text-center">Click a note to view its summary here.</p>
                )}
              </div>
            </div>

            {/* Entry Cards */}
            <div className="flex flex-col gap-6">
              {entries.length ? (
                entries.map((entry, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(entry.url)}
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <h3 className="text-lg font-light text-gray-800 mb-1 tracking-tight">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-blue-600 truncate">{entry.url}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notes found in this category.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
