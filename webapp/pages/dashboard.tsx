

import { InterestGraph } from "@/components/InterestGraph";
import { RecentActivity } from "@/components/RecentActivity";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-[#eaeef8] via-[#f8fafc] to-[#eef1f8] text-black font-sans min-h-screen">

      <section className="py-8 bg-transparent border-b border-gray-200 relative">
  <div className="flex items-center justify-center relative h-full">

    {/* Logo: gently nudge vertically */}
    <div className="absolute left-5 top-1/2 -translate-y-1/2">
      <h1 className="text-2xl sm:text-3xl font-light tracking-[0.02em] text-neutral-800 uppercase">
        Cognify<span className="font-medium text-[#1a2d6d]">CL</span>
      </h1>
    </div>

   
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

      {/* 🕓 Recent Activity */}
      {/* <section className="px-8 py-24 bg-[#f0f2f6] text-black">
        <div className="text-center ">
        <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 animate-fadeIn glow-subtle">
          Recent Activity
        </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <RecentActivity />
        </div>
      </section> */}
      <section className="px-8 py-20 bg-[#f0f2f6] text-black">
  <div className="text-center">
    <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 animate-fadeIn glow-subtle">
      Recent Activity
    </h3>
  </div>
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    <RecentActivity />
  </div>
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

