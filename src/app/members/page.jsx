"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getUsers } from "@/lib/userService";
import { convertBengaliToEnglish } from "@/lib/banglaToEnglish";
import Member from "@/components/Member";
export default function Members() {
  const [members, setMembers] = useState([]);
  const [id, setId] = useState("");
  const [mem, setMem] = useState("");
  const [editMood, setEditMood] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const userList = await getUsers();
    setMembers(userList);
  };
  const findMember = () => {
    setEditMood(true);
    const member = members.find((m) => m.id === id);
    setMem(member);
  };
  return (
    <main className="min-h-svh bg-white">
      <div className="w-5/6 mx-auto">
        <nav className="py-4 flex justify-between items-center">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>

        <div className="px-5 bg-gray-100">
          <div className="py-8 rounded flex justify-center items-center">
            <div className="flex items-center">
              <input
                className="w-5/6 bg-blue-100 py-2 px-3 text-gray-900 border-none outline-none"
                type="text"
                value={id}
                placeholder="আইডি নম্বর লিখুন"
                onChange={(e) => setId(e.target.value)}
              />
              <button
                onClick={findMember}
                className="w-50 bg-blue-300 py-2 px-3 text-white"
              >
                খুঁজুন
              </button>
            </div>
          </div>
          {editMood && (
            <div className="px-5">
              {mem ? (
                <Member userData={mem} isWeb={true} />
              ) : (
                <p className="my-2 text-center py-10">Member not found</p>
              )}
            </div>
          )}
        </div>
        <h1 className="text-lg font-bold text-center py-5 my-4 bg-blue-200">
          আমাদের সদস্য{" "}
        </h1>
        <div className="p-4 mt-4 bg-gray-300">
          {members.length > 0 ? (
            <div>
              {members
                .sort((a, b) => {
                  const idA = parseInt(convertBengaliToEnglish(a.id), 10);
                  const idB = parseInt(convertBengaliToEnglish(b.id), 10);
                  return idA - idB;
                })
                .map((user) => (
                  <Member key={user.id} userData={user} isWeb={true} />
                ))}
            </div>
          ) : (
            <p className="text-center py-5">No member are here</p>
          )}
        </div>
      </div>
    </main>
  );
}
