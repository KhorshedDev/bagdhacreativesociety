"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  getUserById,
  createCommittee,
  getCommittees,
  deleteCommittee,
} from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommitteeCard from "@/components/CommitteeCard";
export default function AddCommittee() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);
  const [position, setPosition] = useState("");
  const [committeeList, setCommitteeList] = useState([]);

  useEffect(() => {
    fetchCommittee();
  }, []);

  const handleClick = async () => {
    await fetchUser();
  };

  const fetchUser = async () => {
    if (id === "") {
      alert("Enter Valid Id");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userData = await getUserById(id);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleAddCommitte = async () => {
    if (position === "") {
      alert("add something first");
      return;
    }
    try {
      await createCommittee({ user_Id: id, position });
      alert("Committee added");
      setUser(null);
      setPosition("");
      await fetchCommittee();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCommittee = async () => {
    const c = await getCommittees();
    setCommitteeList(c);
  };
  return (
    <ProtectedRoute>
      <main className="min-h-svh bg-white">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Back to Home
            </Link>
          </nav>
          <div>
            <p className="font-bold text-lg my-4">Add a new committee member</p>
            <div className="p-3 bg-gray-100 rounded">
              {!user ? (
                <div>
                  <input
                    className="py-1 px-3 outline-none border-none bg-gray-200 rounded my-2"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <button
                    onClick={handleClick}
                    disabled={loading}
                    className="block py-1 px-3 bg-blue-400 text-white rounded mb-2"
                  >
                    {loading ? "Loading..." : "Search"}
                  </button>
                </div>
              ) : (
                <div>
                  <Image
                    src={user.pictureUrl}
                    alt="member pic"
                    width={100}
                    height={150}
                  />
                  <p className="font-medium my-1">{user.name}</p>
                  <p>Enter post</p>
                  <input
                    className="bg-gray-200 rounded py-1 px-2 my-2"
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={handleAddCommitte}
                      className="py-1 px-2 bg-blue-400 text-white"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setUser(null)}
                      className="py-1 px-2 bg-gray-400 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="font-bold text-lg my-4">Committee Members</p>
            <div className="mt-3 flex flex-wrap">
              {committeeList?.map((committee) => (
                <CommitteeCard
                  key={committee.id}
                  func={fetchCommittee}
                  details={committee}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
