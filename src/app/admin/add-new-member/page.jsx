"use client";

import Link from "next/link";
import { useState } from "react";

import { addUser } from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddNewMember() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
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
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErr(false);
    try {
      await addUser(userData, file);
      setLoading(false);
      setUserData({
        id: "",
        name: "",
        phone: "",
        fatherName: "",
        share: 0,
        monthRate: 0,
        payroll: [],
        total: 0,
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <ProtectedRoute>
      <main className="bg-white min-h-svh">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/members">
              Go Back
            </Link>
          </nav>
          <div className="w-3/6 mx-auto pb-32 max-sm:w-5/6">
            <h3 className="text-center mb-3 text-lg font-semibold">
              Adding a new member
            </h3>
            <p className="font-medium">Enter ID</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.id}
              name="id"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Name</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.name}
              name="name"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Father Name</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.fatherName}
              name="fatherName"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Phone Number</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.phone}
              name="phone"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Share</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.share}
              name="share"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Monthly Charge</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userData.monthRate}
              name="monthRate"
              onChange={handleChange}
            />
            <p className="font-medium mb-2">Upload Image</p>
            <input onChange={handleFileChange} type="file" name="" id="" />
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="mt-3 block bg-blue-400 py-1 px-4 text-white"
            >
              {loading ? "Loading.." : "Submit"}
            </button>
            {err && <p className="text-red-500">There is an error!</p>}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
