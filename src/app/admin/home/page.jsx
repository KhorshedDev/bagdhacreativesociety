"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/");
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
