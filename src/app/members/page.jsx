"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getUsers } from "@/lib/userService";

import Member from "@/components/Member";
export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const userList = await getUsers();
    setMembers(userList);
  };
  return (
    <main className="min-h-svh bg-white">
      <div className="w-5/6 mx-auto">
        <nav className="py-4 flex justify-between items-center">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>
        <div className="py-8 bg-gray-100 rounded flex justify-center items-center">
          <h1 className="text-lg font-bold">আমাদের সদস্য </h1>
          {false && (
            <div className="flex items-center">
              <input
                className="w-5/6 bg-blue-100 py-2 px-3 text-gray-900 border-none outline-none"
                type="text"
                placeholder="নাম লিখুন"
              />
              <button className="w-50 bg-blue-300 py-2 px-3 text-white ">
                খুঁজুন
              </button>
            </div>
          )}
        </div>
        <div className="p-4 mt-4 bg-gray-300">
          {members.length > 0 ? (
            <div>
              {members.map((user) => (
                <Member key={user.id} userData={user} isWeb={true} />
              ))}
            </div>
          ) : (
            <p className="text-center">No member are here</p>
          )}
        </div>
      </div>
    </main>
  );
}
