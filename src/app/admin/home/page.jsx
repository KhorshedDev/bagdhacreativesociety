"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { getMetaData, createMetaData } from "@/lib/userService";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [meta, setMeta] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchMeta();
  }, []);

  const fetchMeta = async () => {
    const data = await getMetaData();
    setMeta(data || {});
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/");
  };

  const isMembersLocked = Boolean(meta?.isMembersLocked || meta?.membersLocked);

  const toggleMembersLock = async () => {
    if (!meta) return;
    setIsUpdating(true);
    try {
      const nextStatus = !isMembersLocked;
      await createMetaData(meta.id, {
        isMembersLocked: nextStatus,
        membersLocked: nextStatus,
      });
      await fetchMeta();
      setNotification(
        nextStatus
          ? "🔒 /members রুটটি সফলভাবে লক করা হয়েছে (এখন ৪০৪ দেখাবে)!"
          : "🔓 /members রুটটি সফলভাবে উন্মুক্ত করা হয়েছে (সবার জন্য দৃশ্যমান)!"
      );
      setTimeout(() => setNotification(""), 4000);
    } catch (err) {
      console.error(err);
      alert("Error updating lock status: " + (err.message || err));
    } finally {
      setIsUpdating(false);
    }
  };

  const adminCards = [
    { title: "+ Add Deposit", link: "add-deposite", desc: "Record member deposits and payments", icon: "💰" },
    { title: "Manage Members", link: "members", desc: "View, search, edit & add members", icon: "👥" },
    { title: "Rules, Notice & Vision", link: "rules", desc: "Update society policies and notices", icon: "📜" },
    { title: "Meta Data & Contact", link: "meta-data", desc: "Manage bank accounts & cover photo", icon: "⚙️" },
    { title: "Photo Gallery", link: "photos", desc: "Upload and delete gallery photos", icon: "🖼️" },
    { title: "Investments", link: "invest", desc: "Track organizational investments", icon: "📈" },
    { title: "Committee", link: "committee", desc: "Manage executive committee list", icon: "🏛️" },
  ];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                Admin Control Center
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 mt-2">
                Welcome Back, Admin
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Logged in as: <span className="font-medium text-slate-700 dark:text-slate-300">{user?.email || "Admin"}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/"
                className="w-full sm:w-auto text-center px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow transition-colors"
              >
                View Website 🌐
              </Link>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto text-center px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow transition-colors"
              >
                Log Out 🚪
              </button>
            </div>
          </div>

          {/* Notification toast */}
          {notification && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center justify-between shadow-sm animate-fade-in">
              <span>{notification}</span>
              <button
                onClick={() => setNotification("")}
                className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900 rounded hover:bg-emerald-200 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Route Access & Security Control */}
          <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    রুট অ্যাক্সেস কন্ট্রোল (Route Access Control)
                  </h2>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      isMembersLocked
                        ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
                        : "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                    }`}
                  >
                    {isMembersLocked ? "🔒 লক করা (404 Not Found)" : "🟢 উন্মুক্ত (Active / Visible)"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    /members
                  </code>{" "}
                  {isMembersLocked
                    ? "রুটটি বর্তমানে লক করা আছে। যেকোনো ব্যবহারকারী বা ভিজিটর প্রবেশ করলে ৪০৪ (Not Found) পেইজ দেখতে পাবে।"
                    : "রুটটি বর্তমানে সবার জন্য উন্মুক্ত আছে। সাধারণ ব্যবহারকারীরা স্বাভাবিকভাবে প্রবেশ করতে পারবেন।"}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/members"
                  target="_blank"
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
                >
                  পেইজ টেস্ট করুন ↗
                </Link>
                <button
                  onClick={toggleMembersLock}
                  disabled={isUpdating || !meta}
                  className={`px-4 py-2 text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5 ${
                    isMembersLocked
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  } disabled:opacity-50`}
                >
                  {isUpdating
                    ? "আপডেট হচ্ছে..."
                    : isMembersLocked
                    ? "🔓 আনলক করুন (Make Visible)"
                    : "🔒 লক করুন (Show 404)"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {adminCards.map((card) => (
              <Link key={card.link} href={card.link}>
                <div className="h-full bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform w-fit">
                      {card.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-end">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                      Open →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
