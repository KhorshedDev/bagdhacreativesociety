"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { getMetaData } from "@/lib/userService";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Payment() {
  const [meta, setMeta] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getMetaData();
    setMeta(d || {});
  };

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
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
            জমা বা পেমেন্ট মাধ্যম
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            সঞ্চয় জমা প্রদানের হিসাব বিবরণী
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
            সবাই নিম্নোক্ত মাধ্যমে আমাদের সোসাইটির সঞ্চয় নির্দিষ্ট সময়ের মধ্যে জমা প্রদান করার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে।
          </p>
        </div>

        {/* Warning Notice Banner */}
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-center gap-3 text-amber-800 dark:text-amber-300 text-xs md:text-sm">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p className="font-medium">
            বিকাশ বা নগদ মাধ্যমে টাকা পাঠালে অবশ্যই <strong className="font-bold underline">ক্যাশ আউট খরচসহ</strong> পাঠাতে হবে।
          </p>
        </div>

        {/* Mobile Banking Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* bKash Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                  বিকাশ পার্সোনাল
                </span>
                <span className="text-xs text-slate-400">bKash</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-wide my-2">
                {meta.bkash || "N/A"}
              </p>
            </div>
            <button
              onClick={() => handleCopy(meta.bkash, "bkash")}
              className="mt-4 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {copiedKey === "bkash" ? (
                <>✓ নম্বর কপি হয়েছে!</>
              ) : (
                <>📋 নম্বর কপি করুন</>
              )}
            </button>
          </div>

          {/* Nagad Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  নগদ পার্সোনাল
                </span>
                <span className="text-xs text-slate-400">Nagad</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-wide my-2">
                {meta.nagad || "N/A"}
              </p>
            </div>
            <button
              onClick={() => handleCopy(meta.nagad, "nagad")}
              className="mt-4 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {copiedKey === "nagad" ? (
                <>✓ নম্বর কপি হয়েছে!</>
              ) : (
                <>📋 নম্বর কপি করুন</>
              )}
            </button>
          </div>
        </div>

        {/* Bank Account Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
              <span>🏦</span> ব্যাংক অ্যাকাউন্ট এর মাধ্যমে
            </h2>
            <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md font-semibold">
              Bank Transfer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">Account Name (হিসাবের নাম)</p>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                {meta.acName || "-"}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Account Number (হিসাব নম্বর)</p>
                <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {meta.ac || "-"}
                </p>
              </div>
              {meta.ac && (
                <button
                  onClick={() => handleCopy(meta.ac, "bank_ac")}
                  className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  {copiedKey === "bank_ac" ? "কপি হয়েছে!" : "কপি"}
                </button>
              )}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">Bank Name (ব্যাংকের নাম)</p>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                {meta.bank || "-"}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">Routing Number (রাউটিং নম্বর)</p>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {meta.routing || "-"}
              </p>
            </div>
          </div>

          {meta.add && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">শাখা/ঠিকানা: </span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">{meta.add}</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
