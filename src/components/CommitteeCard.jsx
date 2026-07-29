"use client";
import { useEffect, useState } from "react";
import { getUserById, deleteCommittee } from "@/lib/userService";
import Image from "next/image";

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E";

export default function CommitteeCard({ details, isweb, func }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!details?.user_Id) return;
      const u = await getUserById(details.user_Id);
      setUser(u);
    };
    fetchUser();
  }, [details?.user_Id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this committee member?")) {
      await deleteCommittee(details.id);
      alert("Successfully deleted");
      if (func) await func();
    }
  };

  return (
    <div className="shadow-md m-2 p-4 bg-white dark:bg-gray-800 rounded-lg flex justify-center items-center flex-col border border-gray-100 dark:border-gray-700">
      {user ? (
        <>
          <div className="w-24 h-24 relative overflow-hidden rounded-full border-2 border-indigo-100 bg-gray-100 flex items-center justify-center">
            <Image
              src={user?.pictureUrl || DEFAULT_AVATAR}
              alt={user?.name || "Committee member photo"}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-base font-semibold text-center mt-3 text-gray-900 dark:text-white">
            {user?.name || "Unknown Member"}
          </p>
          <p className="py-1 font-medium text-sm text-indigo-600 dark:text-indigo-400 text-center">
            {details?.position}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {user?.phone || "-"}
          </p>
          {!isweb && (
            <button
              onClick={handleDelete}
              className="px-3 rounded text-xs py-1 mt-3 bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Delete
            </button>
          )}
        </>
      ) : (
        <div className="p-4 text-center text-sm text-gray-400">Loading member...</div>
      )}
    </div>
  );
}

