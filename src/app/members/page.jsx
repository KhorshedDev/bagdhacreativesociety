"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getUsers, getMetaData } from "@/lib/userService";
import { convertBengaliToEnglish, normalizeSearchQuery } from "@/lib/banglaToEnglish";
import Member from "@/components/Member";
import Footer from "@/components/Footer";
import NotFound from "@/app/not-found";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    fetchUsers();
    getMetaData().then((d) => setMeta(d || {}));
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

  if (meta?.isMembersLocked || meta?.membersLocked) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col justify-between pt-4 pb-0">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <nav className="py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 mb-6">
          <Link
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
            href="/"
          >
            ← প্রধান পাতায় ফিরে যান
          </Link>
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            মোট সদস্য: {members.length}
          </div>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            আমাদের সম্মানিত সদস্যবৃন্দ
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            আইডি নম্বর (ইংরেজি ১০১ বা বাংলা ১০১), নাম বা মোবাইল নম্বর দিয়ে খুঁজুন
          </p>

          <div className="max-w-md mx-auto mt-4">
            <input
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm text-center"
              type="text"
              value={searchQuery}
              placeholder="আইডি, নাম (বাংলা / English) বা মোবাইল খুঁজুন..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              সদস্য তালিকা লোড হচ্ছে...
            </div>
          ) : sortedMembers.length > 0 ? (
            sortedMembers.map((user) => (
              <Member key={user.id} userData={user} isWeb={true} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
              &quot;{searchQuery}&quot; দিয়ে কোনো সদস্য পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
