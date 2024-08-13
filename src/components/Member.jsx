"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteUser, updateUser } from "@/lib/userService";
import PopUp from "@/components/PopUp";

const TableOfPay = ({ data }) => (
  <div className=" py-3 px-2 flex justify-between items-center my-2">
    <div>
      <p className="text-center">{data.date}</p>
      <p className="text-sm text-gray-600">
        {data.payDate ? new Date(data.payDate.toDate()).toDateString() : "-"}
      </p>
    </div>

    <p className="text-center">{data.payMathod}</p>
    <p className="text-center">{data.rashid ? data.rashid : "-"}</p>
    <p className="text-center">{data.amount}tk</p>
  </div>
);

export default function Member({ isWeb, userData, fun }) {
  const [expand, setExpand] = useState(false);
  const [editMood, setEditMood] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: userData.id,
    name: userData.name,
    phone: userData.phone,
    fatherName: userData.fatherName,
    share: userData.share,
    monthRate: userData.monthRate,
    payroll: [...userData.payroll],
    total: userData.total,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
    if (!confirmation) {
      alert("User deletion canceled.");
      return;
    }
    await deleteUser(userData.id);
    await fun();
  };
  const handleUserUpdate = async () => {
    setLoading(true);
    await updateUser(userData.id, userInfo, file);
    setLoading(false);
    await fun();
    setEditMood(false);
  };

  return (
    <div>
      <div className="bg-white p-3 flex justify-between items-center my-3 max-sm:flex-col">
        <div className="flex justify-between items-center max-sm:flex-col">
          <Image
            width={130}
            height={200}
            alt="User Picture"
            src={userData.pictureUrl}
          />
          <div className="ml-3 max-sm:mt-2">
            <p className="text-gray-400 text-sm">
              {isWeb ? "আইডি " : "ID"}: {userData.id}
            </p>
            <p className="font-medium">
              {isWeb ? "নাম" : "Name"}: {userData.name}
            </p>
            <p className="text-gray-400 text-sm">
              {isWeb ? "বাবার নাম" : "Father's Name"}: {userData.fatherName}
            </p>
            <p className="text-gray-400 text-sm">
              {isWeb ? "মোবাইল " : "Mobile"}: {userData.phone}
            </p>
            <p className="text-gray-400 text-sm">
              {isWeb ? "শেয়ার " : "Share"}: {userData.share}
            </p>
          </div>
        </div>
        <div>
          {!isWeb && (
            <div className="my-2">
              <button
                onClick={() => handleDelete()}
                className="py-2 px-5 bg-red-400 text-white rounded-sm max-sm:mt-2"
              >
                delete
              </button>
              <button
                onClick={() => setEditMood(true)}
                className="py-2 ml-2 px-5 bg-green-400 text-white rounded-sm max-sm:mt-2"
              >
                Edit
              </button>
            </div>
          )}
          <button
            onClick={() => setExpand(true)}
            className="ml-2 py-2 px-5 bg-blue-400 text-white rounded-sm max-sm:mt-2"
          >
            {isWeb ? "জমা দেখুন" : "See Deposits"}
          </button>
        </div>
      </div>
      {expand && (
        <div
          style={{ backgroundColor: "rgba(0,0,0)" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto"
        >
          <div className="relative mt-10 max-sm:mt-60 bg-white w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center my-4">
              <button onClick={() => setExpand(false)}>Close</button>
              <p className="text-xl font-bold">
                {isWeb ? "মোট জমা" : "Total"}: {userData.total} Tk
              </p>
            </div>

            <div className="bg-gray-300 py-3 px-2 flex justify-between items-center mt-5">
              <p className="text-center font-medium">Pay Month</p>
              <p className="text-center font-medium">Pay Mathod</p>
              <p className="text-center font-medium">Rashid No</p>
              <p className="text-center font-medium">Pay Amount</p>
            </div>
            <div>
              {userData.payroll.length > 0 ? (
                <div>
                  {userData.payroll.map((item) => (
                    <TableOfPay key={item.month} data={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center">No deposits found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!isWeb && editMood && (
        <PopUp isOpen={true} onClose={() => setEditMood(false)}>
          <h1 className="text-center font-bold text-2xl">Edit Member</h1>
          <div>
            <p className="font-medium">Enter Name</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userInfo.name}
              name="name"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Father Name</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userInfo.fatherName}
              name="fatherName"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Phone Number</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userInfo.phone}
              name="phone"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Share</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userInfo.share}
              name="share"
              onChange={handleChange}
            />
            <p className="font-medium">Enter Monthly Charge</p>
            <input
              className="w-full bg-blue-100 outline-none border-none py-1 px-2 text-sm my-1"
              type="text"
              value={userInfo.monthRate}
              name="monthRate"
              onChange={handleChange}
            />
            <p className="font-medium mb-2">Upload Image</p>
            <input onChange={handleFileChange} type="file" name="" id="" />
            <button
              onClick={handleUserUpdate}
              disabled={loading}
              className="mt-3 block bg-blue-400 py-1 px-4 text-white"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            {false && <p className="text-red-500">There is an error!</p>}
          </div>
        </PopUp>
      )}
    </div>
  );
}
