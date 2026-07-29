"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { getNotices } from "@/lib/userService";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Notice() {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getNotices();
    setNotice(d || []);
  };

  if (!notice) {
    return <Loading />;
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col justify-between pt-4 pb-0">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <nav className="mb-6">
          <Link
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
            href="/"
          >
            ← প্রধান পাতায় ফিরে যান
          </Link>
        </nav>

        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold mb-2 border border-emerald-200 dark:border-emerald-800">
            জরুরি ঘোষণা
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            সংগঠনের নোটিশ ও বিজ্ঞপ্তি
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটির সমসাময়িক খবরাখবর ও বিজ্ঞপ্তি
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {notice.length > 0 ? (
            notice.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-200 dark:border-amber-800 text-lg">
                  📢
                </div>
                <div className="pt-1">
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {item.notice}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center text-slate-500 border border-slate-200 dark:border-slate-700 text-sm">
              কোনো নতুন নোটিশ পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
