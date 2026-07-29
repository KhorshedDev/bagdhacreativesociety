"use client";

import { useState } from "react";
import { updateInvest, deleteInvest } from "@/lib/userService";

export default function InvestCard({ isWeb, investData, func }) {
  const [editMood, setEditMood] = useState(false);
  const [invest, setInvest] = useState({
    date: investData.date,
    amount: investData.amount,
    profit: investData.profit,
    details: investData.details,
  });

  const handleUpdate = async () => {
    await updateInvest(investData.id, invest);
    setEditMood(false);
    if (func) func();
    alert("Updated Successfully");
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this investment entry?")) {
      await deleteInvest(investData.id);
      if (func) func();
      alert("Deleted Successfully");
    }
  };

  const isProfit = Number(investData.profit) >= 0;

  return (
    <div className="my-3 bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
      {!editMood ? (
        <div>
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
            <span className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">
              📅 {investData.date}
            </span>
            <span className="text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              ৳{investData.amount}
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-200 mb-3 font-medium leading-relaxed">
            {investData.details}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isProfit
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800"
              }`}
            >
              {isProfit ? "লাভ (Profit): " : "লোকসান (Loss): "} ৳{investData.profit}
            </span>

            {!isWeb && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditMood(true)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-left text-xs md:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
              তারিখ (Select Date)
            </label>
            <input
              value={invest.date}
              onChange={(e) =>
                setInvest((oldVal) => ({ ...oldVal, date: e.target.value }))
              }
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none"
              type="date"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
              বিস্তারিত বিবরণ (Details)
            </label>
            <textarea
              onChange={(e) =>
                setInvest((oldVal) => ({
                  ...oldVal,
                  details: e.target.value,
                }))
              }
              value={invest.details}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
                পরিমাণ (Amount Tk)
              </label>
              <input
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none"
                type="number"
                value={invest.amount}
                onChange={(e) =>
                  setInvest((oldVal) => ({ ...oldVal, amount: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">
                লাভ/ক্ষতি (Profit/Loss)
              </label>
              <input
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none"
                type="number"
                value={invest.profit}
                onChange={(e) =>
                  setInvest((oldVal) => ({ ...oldVal, profit: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
              onClick={() => setEditMood(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
