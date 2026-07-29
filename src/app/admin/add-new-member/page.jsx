"use client";

import Link from "next/link";
import { useState } from "react";
import { addUser } from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddNewMember() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    nameEn: "",
    phone: "",
    fatherName: "",
    share: 0,
    monthRate: 0,
    payroll: [],
    total: 0,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!userData.id || !userData.name) {
      alert("Please provide both Member ID and Name.");
      return;
    }
    setLoading(true);
    setErr(false);
    try {
      await addUser(userData, file);
      setLoading(false);
      setUserData({
        id: "",
        name: "",
        nameEn: "",
        phone: "",
        fatherName: "",
        share: 0,
        monthRate: 0,
        payroll: [],
        total: 0,
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 text-slate-800 dark:text-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="mb-6">
            <Link
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
              href="/admin/members"
            >
              ← Go Back to Members
            </Link>
          </nav>

          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                Add New Member
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter member details in Bangla and English. Bangla or English digits for ID are automatically accepted.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Member ID * (Bangla or English digits, e.g. 101 or ১০১)
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  placeholder="e.g. 101 or ১০১"
                  value={userData.id}
                  name="id"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Name (Bangla) *
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  placeholder="e.g. মোঃ রফিকুল ইসলাম"
                  value={userData.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Name (English)
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  placeholder="e.g. Md. Rafiqul Islam"
                  value={userData.nameEn}
                  name="nameEn"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Father&apos;s Name
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  placeholder="Father's Name"
                  value={userData.fatherName}
                  name="fatherName"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Phone Number
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  placeholder="01700000000"
                  value={userData.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Share Count
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="number"
                  placeholder="1"
                  value={userData.share}
                  name="share"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Monthly Rate (Tk)
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="number"
                  placeholder="500"
                  value={userData.monthRate}
                  name="monthRate"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Profile Photo (Uploaded to Supabase Storage)
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-950 dark:file:text-emerald-300"
                />
              </div>
            </div>

            {err && (
              <p className="text-red-500 text-xs font-medium mt-4">
                Something went wrong. Please check your Supabase configuration and try again.
              </p>
            )}

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-2.5 px-6 rounded-xl shadow transition-colors text-sm"
              >
                {loading ? "Adding Member..." : "Save New Member"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
