"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUsers } from "@/lib/userService";
import Member from "@/components/Member";
import { convertBengaliToEnglish } from "@/lib/banglaToEnglish";
import ProtectedRoute from "@/components/ProtectedRoute";
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
    <ProtectedRoute>
      <main className="min-h-svh bg-white">
        <div className="w-5/6 mx-auto">
          <nav className="py-4 flex justify-between items-center">
            <Link className="text-blue-400" href="/admin/home">
              Back to Home
            </Link>
            <Link
              className="bg-blue-400 p-4 text-white max-sm:p-1 max-sm:text-sm"
              href="/admin/add-new-member"
            >
              + Add new member
            </Link>
          </nav>
          <h1 className="text-lg font-bold text-center my-4">
            All the members
          </h1>
          <div className="py-8 bg-gray-100 rounded px-4">
            <div>
              <div className="p-6">
                <input
                  className="w-5/6 bg-blue-100 py-2 px-3 text-gray-900 border-none outline-none"
                  type="text"
                  value={id}
                  placeholder="Input Id"
                  onChange={(e) => setId(e.target.value)}
                />
                <button
                  onClick={findMember}
                  className="w-50 bg-blue-300 py-2 px-3 text-white"
                >
                  Search
                </button>
              </div>
              {editMood && (
                <div>
                  {mem ? (
                    <Member userData={mem} isWeb={false} />
                  ) : (
                    <p className="my-10 text-center">Member not found</p>
                  )}
                </div>
              )}
            </div>
          </div>
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
                    <Member key={user.id} userData={user} fun={fetchUsers} />
                  ))}
              </div>
            ) : (
              <p className="text-center">No member are here</p>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
