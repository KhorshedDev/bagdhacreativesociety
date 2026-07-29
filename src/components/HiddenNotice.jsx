"use client";

import { useState } from "react";

export default function HiddenNotice({ func }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const checkfunc = (e) => {
    if (e) e.preventDefault();
    if (password === "est@july2024") {
      func(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
        পাসওয়ার্ড প্রয়োজন
      </h2>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6">
        সঞ্চয় ও বিনিয়োগের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে পাসওয়ার্ড প্রদান করুন
      </p>

      <form onSubmit={checkfunc} className="space-y-4">
        <div>
          <input
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
            type="password"
            placeholder="পাসওয়ার্ড লিখুন"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
          {error && (
            <p className="text-xs text-red-500 font-semibold mt-1 text-left">
              ভুল পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors"
        >
          প্রবেশ করুন
        </button>
      </form>
    </div>
  );
}
