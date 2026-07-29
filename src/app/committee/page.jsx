"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCommittees } from "@/lib/userService";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import CommitteeCard from "@/components/CommitteeCard";

export default function Committee() {
  const [committees, setCommittees] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getCommittees();
    setCommittees(d || []);
  };

  if (!committees) {
    return <Loading />;
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col justify-between pt-4 pb-0">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <nav className="mb-6">
          <Link
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
            href="/"
          >
            ← প্রধান পাতায় ফিরে যান
          </Link>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            পরিচালক পর্ষদ
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটি-এর পরিচালনা কমিটি
          </p>
        </div>

        {committees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {committees.map((committee) => (
              <CommitteeCard key={committee.id} isweb={true} details={committee} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center text-sm text-slate-500 border border-slate-200 dark:border-slate-700">
            কোনো পরিচালনা কমিটি তালিকা পাওয়া যায়নি।
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
