"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRules } from "@/lib/userService";
import Loading from "@/components/Loading";

export default function Rules() {
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getRules();
    setTodoList(d || []);
  };

  if (!todoList) {
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
            সংগঠনের নিয়মাবলি
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            যেসব নিয়ম কানুন মেনে চলতে হবে
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটির সকল সদস্যদের জন্য অনুসরণীয় সুনির্দিষ্ট নিয়ম ও শর্তাবলি
          </p>
        </div>

        <div className="space-y-4">
          {todoList.length > 0 ? (
            todoList.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex-shrink-0 border border-emerald-200 dark:border-emerald-800">
                  {index + 1}
                </span>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium pt-1">
                  {item.rule}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center text-slate-500 border border-slate-200 dark:border-slate-700">
              কোন নিয়ম কানুন যুক্ত করা হয়নি।
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
