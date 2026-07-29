"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getUsers } from "@/lib/userService";
import Member from "@/components/Member";
import { convertBengaliToEnglish, normalizeSearchQuery } from "@/lib/banglaToEnglish";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const userList = await getUsers();
    setMembers(userList || []);
    setLoading(false);
  };

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;

    const { en, bn, raw } = normalizeSearchQuery(searchQuery);

    return members.filter((m) => {
      const mId = String(m.id || "");
      const mIdEn = convertBengaliToEnglish(mId);

      const mName = (m.name || "").toLowerCase();
      const mNameEn = (m.nameEn || "").toLowerCase();
      const mPhone = (m.phone || "").toLowerCase();

      // Check ID match in Bangla or English
      if (mId === raw || mId === bn || mIdEn === en || mId === en) return true;

      // Check Name match in Bangla or English
      if (mName.includes(raw) || mNameEn.includes(raw)) return true;

      // Check Phone match
      if (mPhone.includes(raw) || mPhone.includes(en)) return true;

      return false;
    });
  }, [members, searchQuery]);

  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      const idA = parseInt(convertBengaliToEnglish(String(a.id || "0")), 10) || 0;
      const idB = parseInt(convertBengaliToEnglish(String(b.id || "0")), 10) || 0;
      return idA - idB;
    });
  }, [filteredMembers]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 mb-6">
            <Link
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
              href="/admin/home"
            >
              ← Back to Admin Dashboard
            </Link>
            <Link
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow transition-colors"
              href="/admin/add-new-member"
            >
              + Add New Member
            </Link>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                All Society Members
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Total Members: <span className="font-semibold text-emerald-700">{members.length}</span>
              </p>
            </div>

            <div className="w-full md:w-80">
              <input
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                type="text"
                value={searchQuery}
                placeholder="Search by ID (101/১০১), Name, or Phone..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Loading members...
              </div>
            ) : sortedMembers.length > 0 ? (
              sortedMembers.map((user) => (
                <Member key={user.id} userData={user} fun={fetchUsers} isWeb={false} />
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
                No members found matching &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
