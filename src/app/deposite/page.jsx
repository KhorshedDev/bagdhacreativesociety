"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData, getInvest } from "@/lib/userService";
import Loading from "@/components/Loading";
import InvestCard from "@/components/InvestCard";
import HiddenNotice from "@/components/HiddenNotice";

export default function Deposite() {
  const [meta, setMeta] = useState(null);
  const [invest, setInvest] = useState(null);
  const [rightPass, setRightPass] = useState(false);
  const [binoyog, setBiniyog] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const d = await getMetaData();
    const i = await getInvest();
    setMeta(d || {});
    setInvest(i || []);
  };

  useEffect(() => {
    if (invest) {
      const totalAmount = invest.reduce((acc, item) => acc + Number(item.amount || 0), 0);
      setBiniyog(totalAmount);
      const totalProfit = invest.reduce((acc, item) => acc + Number(item.profit || 0), 0);
      setProfit(totalProfit);
    }
  }, [invest]);

  if (!meta) {
    return <Loading />;
  }

  const totalAll = meta.totalAll || 0;
  const currentBalance = totalAll - binoyog;
  const balanceWithProfit = totalAll + profit - binoyog;

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

        {rightPass ? (
          <div>
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold mb-2 border border-emerald-200 dark:border-emerald-800">
                অর্থনৈতিক হিসাব ও বিনিয়োগ
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
                মোট সঞ্চয় ও বিনিয়োগ স্থিতি
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                বাগধা ক্রিয়েটিভ সোসাইটির সর্বমোট জমা, বিনিয়োগ এবং অর্জিত মুনাফার সামারি
              </p>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট সঞ্চয় (Total Deposits)</p>
                <h3 className="text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
                  ৳{totalAll}
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট বিনিয়োগ (Investment)</p>
                <h3 className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
                  ৳{binoyog}
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট ব্যালেন্স (Current Balance)</p>
                <h3 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
                  ৳{currentBalance}
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট লাভ (Total Profit)</p>
                <h3 className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mt-2">
                  ৳{profit}
                </h3>
              </div>
            </div>

            {/* Total Balance with Profit Banner */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-emerald-200">লাভসহ সংগঠনের সর্বমোট ব্যালেন্স</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-1">
                  ৳{balanceWithProfit}
                </h2>
              </div>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold border border-white/20">
                হিসাব আপডেট সম্পন্ন
              </span>
            </div>

            {/* Investments List Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                বিনিয়োগের বিবরণী
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                মোট প্রজেক্ট: {invest?.length || 0}টি
              </span>
            </div>

            <div className="space-y-4">
              {invest?.length > 0 ? (
                invest.map((item) => (
                  <InvestCard key={item.id} isWeb={true} investData={item} />
                ))
              ) : (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center text-slate-500 border border-slate-200 dark:border-slate-700">
                  কোন বিনিয়োগ পাওয়া যায়নি।
                </div>
              )}
            </div>
          </div>
        ) : (
          <HiddenNotice func={setRightPass} />
        )}
      </div>

      <Footer />
    </main>
  );
}
