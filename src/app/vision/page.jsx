"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { getVisions } from "@/lib/userService";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Vision() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getVisions();
    setMeta(d || []);
  };

  if (!meta) {
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
            সংগঠনের লক্ষ্য ও উদ্দেশ্য
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            আমাদের উদ্দেশ্য ও দৃষ্টিভঙ্গি
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটির ভবিষ্যৎ উন্নয়ন ও অর্থনৈতিক স্বাবলম্বিতার লক্ষ্যসমূহ
          </p>
        </div>

        <div className="grid gap-4">
          {meta.length > 0 ? (
            meta.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-200 dark:border-emerald-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium pt-1">
                  {item.vision}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center text-slate-500 border border-slate-200 dark:border-slate-700">
              কোন উদ্দেশ্য বা লক্ষ্য তথ্য পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
