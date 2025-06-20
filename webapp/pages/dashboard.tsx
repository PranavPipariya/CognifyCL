
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InterestGraph } from "@/components/InterestGraph";
import { RecentActivity } from "@/components/RecentActivity";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white px-6 py-4">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold">CognifyCL</h1>
        <h2 className="text-2xl font-bold">Your Mindspace</h2>
        <div /> {/* placeholder for right corner (optional) */}
      </header>

      <section className="mt-8">
        <InterestGraph />
      </section>

      <section className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <RecentActivity />
      </section>
    </div>
  );
}

