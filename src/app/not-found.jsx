"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col justify-between pt-4 pb-0">
      <div className="max-w-3xl mx-auto px-4 w-full text-center my-auto">
        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 text-3xl font-black shadow-inner">
            404
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-emerald-800 dark:text-emerald-400 mb-3">
            ৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি
          </h1>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরিয়ে নেওয়া হয়েছে, মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল (URL) প্রবেশ করা হয়েছে।
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all hover:scale-105 mb-8"
          >
            ← প্রধান পাতায় ফিরে যান
          </Link>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              দ্রুত নেভিগেশন লিঙ্কসমূহ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/members"
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                👥 সদস্যবৃন্দ
              </Link>
              <Link
                href="/rules"
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                📜 নীতি মালা
              </Link>
              <Link
                href="/notice"
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                📢 নোটিশ
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                📞 যোগাযোগ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
