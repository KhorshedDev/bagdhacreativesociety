"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMetaData, createMetaData } from "@/lib/userService";
import Image from "next/image";
import { uploadToSupabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MetaData() {
  const [meta, setMeta] = useState(null);
  const [state, setState] = useState({
    phone: "",
    email: "",
    target: "",
    bkash: "",
    nagad: "",
    acName: "",
    ac: "",
    bank: "",
    add: "",
    routing: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getMeta();
  }, []);

  const getMeta = async () => {
    const data = await getMetaData();
    setMeta(data || {});
  };

  const updateValue = async (field, value) => {
    if (!value) return;
    await createMetaData(meta.id, { [field]: value });
    await getMeta();
    setState((prevState) => ({ ...prevState, [field]: "" }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const fileUrl = await uploadToSupabase(file, "coverPictures");
      await createMetaData(meta.id, { pictureUrl: fileUrl });
      await getMeta();
      alert("Cover picture uploaded successfully to Supabase Storage!");
      setFile(null);
    } catch (e) {
      console.error("Error uploading picture: ", e);
      alert("Something went wrong while uploading: " + (e.message || e));
    } finally {
      setUploading(false);
    }
  };

  if (!meta) {
    return <p className="text-center font-bold text-lg py-12">Loading metadata...</p>;
  }

  return (
    <ProtectedRoute>
      <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="mb-6">
            <Link
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
              href="/admin/home"
            >
              ← Back to Admin Dashboard
            </Link>
          </nav>

          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
                Website Meta & Contact Details
              </h1>
            </div>

            {/* Bank Details */}
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Bank Details</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Bkash Number</p>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">{meta.bkash || "-"}</p>
                  <div className="flex gap-2">
                    <input
                      value={state.bkash}
                      placeholder="New Bkash number"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none"
                      onChange={(e) => setState((p) => ({ ...p, bkash: e.target.value }))}
                    />
                    <button
                      onClick={() => updateValue("bkash", state.bkash)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </li>

                <li className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Nagad Number</p>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">{meta.nagad || "-"}</p>
                  <div className="flex gap-2">
                    <input
                      value={state.nagad}
                      placeholder="New Nagad number"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none"
                      onChange={(e) => setState((p) => ({ ...p, nagad: e.target.value }))}
                    />
                    <button
                      onClick={() => updateValue("nagad", state.nagad)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </li>

                <li className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Account Name</p>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">{meta.acName || "-"}</p>
                  <div className="flex gap-2">
                    <input
                      value={state.acName}
                      placeholder="New Account Name"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none"
                      onChange={(e) => setState((p) => ({ ...p, acName: e.target.value }))}
                    />
                    <button
                      onClick={() => updateValue("acName", state.acName)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </li>

                <li className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Account No.</p>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">{meta.ac || "-"}</p>
                  <div className="flex gap-2">
                    <input
                      value={state.ac}
                      placeholder="New Account No."
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs outline-none"
                      onChange={(e) => setState((p) => ({ ...p, ac: e.target.value }))}
                    />
                    <button
                      onClick={() => updateValue("ac", state.ac)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            {/* Route Privacy & Access Control */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🛡️</span>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                  /deposite Route Security & Lock Control
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Control whether the <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-mono text-emerald-700 dark:text-emerald-400 font-semibold">/deposite</code> route is accessible or locked. If locked, anyone visiting this route will be shown the 404 (Not Found) page.
              </p>

              <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Status:</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        Boolean(meta.isDepositLocked || meta.depositLocked)
                          ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
                          : "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                      }`}
                    >
                      {Boolean(meta.isDepositLocked || meta.depositLocked)
                        ? "🔒 Locked (Returns 404)"
                        : "🟢 Unlocked (Public Screen)"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {Boolean(meta.isDepositLocked || meta.depositLocked)
                      ? "Visiting /deposite currently shows the 404 Not Found screen."
                      : "Visiting /deposite currently shows the regular deposit & investment screen."}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/deposite"
                    target="_blank"
                    className="flex-1 sm:flex-initial text-center px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    Test Route ↗
                  </Link>
                  <button
                    onClick={async () => {
                      const currentLocked = Boolean(meta.isDepositLocked || meta.depositLocked);
                      const nextLocked = !currentLocked;
                      await createMetaData(meta.id, {
                        isDepositLocked: nextLocked,
                        depositLocked: nextLocked,
                      });
                      await getMeta();
                    }}
                    className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-bold rounded-lg text-white shadow transition-colors ${
                      Boolean(meta.isDepositLocked || meta.depositLocked)
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-rose-600 hover:bg-rose-700"
                    }`}
                  >
                    {Boolean(meta.isDepositLocked || meta.depositLocked)
                      ? "🔓 Unlock Route"
                      : "🔒 Lock Route (Show 404)"}
                  </button>
                </div>
              </div>
            </div>

            {/* Cover Picture */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Homepage Group Cover Picture
              </h2>
              {meta.pictureUrl && (
                <div className="relative w-full max-w-lg h-60 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4 bg-slate-100">
                  <Image
                    className="object-cover"
                    alt="Group Cover Picture"
                    fill
                    src={meta.pictureUrl}
                  />
                </div>
              )}

              <div className="max-w-md bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Upload New Cover Picture (Supabase Storage)
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <button
                  disabled={uploading || !file}
                  onClick={handleFileUpload}
                  className="mt-3 w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {uploading ? "Uploading to Supabase..." : "Upload Cover Picture"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
