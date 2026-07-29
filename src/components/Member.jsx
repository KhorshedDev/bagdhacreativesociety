"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { deleteUser, updateUser } from "@/lib/userService";
import PopUp from "@/components/PopUp";
import { useRouter } from "next/navigation";
import { formatBilingualId } from "@/lib/banglaToEnglish";

const TableOfPay = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [newVal, setNewVal] = useState(0);
  return (
    <div className="py-3 px-3 flex flex-wrap justify-between items-center my-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
      {!edit ? (
        <>
          <div className="flex flex-col m-1">
            <button
              onClick={() => setEdit(true)}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs mb-1"
            >
              Edit
            </button>
          </div>
          <div className="m-1">
            <p className="font-semibold text-emerald-800 dark:text-emerald-300">{data.date}</p>
            <p className="text-xs text-slate-500">
              {data.payDate ? new Date(data.payDate).toDateString() : "-"}
            </p>
          </div>

          <p className="text-center m-1 font-medium">{data.payMathod || "-"}</p>
          <p className="text-center m-1 text-slate-600 dark:text-slate-300">
            {data.rashid ? `রশিদ: ${data.rashid}` : "-"}
          </p>
          <p className="text-center m-1 font-bold text-emerald-700 dark:text-emerald-400">
            ৳{data.amount}
          </p>
        </>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <p className="text-xs font-semibold">Edit Amount:</p>
          <input
            type="number"
            className="px-2 py-1 border rounded text-sm w-28 dark:bg-slate-900"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
          />
          <button
            onClick={() => setEdit(false)}
            className="px-3 py-1 bg-slate-400 text-white text-xs rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E";

export default function Member({ isWeb, userData, fun }) {
  const [expand, setExpand] = useState(false);
  const [editMood, setEditMood] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: userData.id,
    name: userData.name || "",
    nameEn: userData.nameEn || "",
    phone: userData.phone || "",
    fatherName: userData.fatherName || "",
    share: userData.share || 0,
    monthRate: userData.monthRate || 0,
    payroll: [...(userData.payroll || [])],
    total: userData.total || 0,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      `Are you sure you want to delete user ${userData.name}?`
    );
    if (!confirmation) return;
    await deleteUser(userData.id);
    if (fun) await fun();
  };

  const handleUserUpdate = async () => {
    setLoading(true);
    await updateUser(userData.id, userInfo, file);
    setLoading(false);
    if (fun) await fun();
    setEditMood(false);
  };

  const displayId = formatBilingualId(userData.id);

  return (
    <div className="my-3">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex justify-between items-center max-sm:flex-col gap-4">
        <div className="flex items-center gap-4 max-sm:flex-col text-center max-sm:w-full">
          <div className="w-24 h-28 relative overflow-hidden rounded-lg border-2 border-emerald-100 dark:border-emerald-900 bg-slate-50 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-inner">
            <SafeImage
              width={120}
              height={150}
              alt={userData?.name || "Member Picture"}
              src={userData.pictureUrl}
              fallbackType="avatar"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="text-left max-sm:text-center">
            <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-1 border border-emerald-200 dark:border-emerald-800">
              ID: {displayId}
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              {userData.name}
            </h4>
            {userData.nameEn && (
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">
                {userData.nameEn}
              </p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isWeb ? "বাবার নাম" : "Father"}: <span className="text-slate-700 dark:text-slate-300">{userData.fatherName || "-"}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isWeb ? "মোবাইল" : "Mobile"}: <span className="text-slate-700 dark:text-slate-300">{userData.phone || "-"}</span>
            </p>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
              {isWeb ? "শেয়ার" : "Share"}: {userData.share || 0}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 max-sm:w-full">
          <button
            onClick={() => setExpand(true)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:bg-emerald-900 text-xs font-semibold rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            {isWeb ? "জমার বিবরণ" : "History"} ({userData.total || 0} Tk)
          </button>
          <button
            onClick={() => router.push(`/members/deposits?id=${userData.id}`)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            {isWeb ? "জমা দেখুন" : "See Deposits"}
          </button>

          {!isWeb && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setEditMood(true)}
                className="w-full sm:w-auto px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {expand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 w-full max-w-3xl p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {userData.name} {userData.nameEn ? `(${userData.nameEn})` : ""}
                </h3>
                <p className="text-xs text-slate-500">ID: {displayId}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {isWeb ? "মোট জমা" : "Total"}: {userData.total || 0} Tk
                </p>
                <button
                  onClick={() => setExpand(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4">
              {userData.payroll && userData.payroll.length > 0 ? (
                <div className="space-y-2">
                  {userData.payroll
                    .slice()
                    .reverse()
                    .map((item, idx) => (
                      <TableOfPay key={item.month || idx} data={item} />
                    ))}
                </div>
              ) : (
                <p className="text-center py-8 text-sm text-slate-500">
                  No deposit records found for this member.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {!isWeb && editMood && (
        <PopUp isOpen={true} onClose={() => setEditMood(false)}>
          <h2 className="text-center font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-4">
            Edit Member Info
          </h2>
          <div className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Name (Bangla)
              </label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                type="text"
                value={userInfo.name}
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
                value={userInfo.nameEn}
                name="nameEn"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Father Name
              </label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                type="text"
                value={userInfo.fatherName}
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
                value={userInfo.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Share Count
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  value={userInfo.share}
                  name="share"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Monthly Rate
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  type="text"
                  value={userInfo.monthRate}
                  name="monthRate"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Update Photo
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>
            <div className="pt-2">
              <button
                onClick={handleUserUpdate}
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Updating Member..." : "Save Changes"}
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
}
