import { useEffect, useState } from 'react';
import EntryCard from '@/components/EntryCard';
import { Card, CardContent } from "@/components/ui/card";

interface Entry {
  url: string;
  title: string;
  summary: string;
  timestamp: number;
}


import { InterestGraph } from "@/components/InterestGraph";
import { RecentActivity } from "@/components/RecentActivity";

export default function Dashboard() {

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
    <div className="bg-gradient-to-br from-[#eaeef8] via-[#f8fafc] to-[#eef1f8] text-black font-sans min-h-screen">

      <section className="py-8 bg-transparent border-b border-gray-200 relative">
  <div className="flex items-center justify-center relative h-full">



     <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 animate-fadeIn glow-subtle">
            ✨ Your Mindspace ✨
          </h1>
           <p className="mt-2 text-base text-gray-500 italic">
        Click nodes to explore categories !
      </p>
      </div>

  </div>
</section>




      {/* 🔷 Interest Graph Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-8 pb-24 bg-[#a6d5f5]">
        <div className="w-full max-w-[1300px] h-[750px] rounded-2xl shadow-lg bg-white/80 border border-gray-200 backdrop-blur-md animate-fadeUp">
          <InterestGraph />
        </div>
      </section>





<section className="bg-[#c3eddc] py-20 px-4 sm:px-8 md:px-16">
  <div className="max-w-5xl mx-auto text-center mb-10">
    <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-[#1f3c2d] mb-2 animate-fadeIn">
      Recent Activity
    </h3>
    <p className="text-[#3f5c4e] text-base sm:text-lg font-normal mb-4">
      Your recent entries and activity
    </p>
    <button
      onClick={async () => {
        try {
          const res = await fetch('http://localhost:3001/clear', {
            method: 'POST',
          });
          const result = await res.json();
          if (result.status === 'cleared') {
            setEntries([]);
          }
        } catch (err) {
          console.error('Failed to clear entries');
        }
      }}
      className="bg-[#1f3c2d] text-white py-2 px-4 rounded-lg text-sm shadow hover:bg-[#2d4f3f] transition duration-150"
    >
      Clear All
    </button>
  </div>

  {loading ? (
    <p className="text-center text-[#3f5c4e] text-lg">Loading...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {entries.length ? (
        entries.map((e, idx) => (
          <Card
            key={idx}
            className="bg-[#f3fcf8] border border-[#b2d8ca] rounded-2xl shadow-sm hover:shadow-md transition duration-200"
          >
            <CardContent className="p-6">
              <EntryCard entry={e} />
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-[#3f5c4e] text-center col-span-full">
          No entries yet. Start browsing!
        </p>
      )}
    </div>
  )}
</section>


      {/* 🎨 Custom Styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.9s ease-out;
        }

        .animate-fadeUp {
          animation: fadeUp 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glow-subtle {
          text-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}
