"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData } from "@/lib/userService";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default function Contact() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getMetaData();
    setMeta(d || {});
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
            যোগাযোগ মাধ্যম
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            আমাদের সাথে যোগাযোগের উপায়
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটির সাথে যেকোনো তথ্যের জন্য সরাসরি যোগাযোগ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200 dark:border-emerald-800 text-xl">
              📞
            </div>
            <h3 className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">ফোন / মোবাইল</h3>
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {meta.phone || "N/A"}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200 dark:border-emerald-800 text-xl">
              ✉️
            </div>
            <h3 className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">ইমেইল ঠিকানা</h3>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {meta.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
