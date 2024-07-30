"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteUser } from "@/lib/userService";

export default function Member({ isWeb, userData, fun }) {
  const [expand, setExpand] = useState(false);

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
  const TableOfPay = ({ data }) => (
    <div className=" py-3 px-2 flex justify-between items-center my-2">
      <p className="text-center">{data.date}</p>
      <p className="text-center">{data.payMathod}</p>
      <p className="text-center">{data.amount}tk</p>
    </div>
  );
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
            <button
              onClick={() => handleDelete()}
              className="py-2 px-5 bg-red-400 text-white rounded-sm max-sm:mt-2"
            >
              delete
            </button>
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
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          className="w-full h-full absolute top-0 left-0"
        >
          <div className="bg-white w-5/6 mx-auto p-5 max-h-svh min-h-svh overflow-y-scroll">
            <div className="flex justify-between items-center my-4">
              <button onClick={() => setExpand(false)}>Close</button>
              <p className="text-xl font-bold">
                {isWeb ? "মোট জমা" : "Total"}: {userData.total} Tk
              </p>
            </div>

            <div className="bg-gray-300 py-3 px-2 flex justify-between items-center mt-5">
              <p className="text-center font-medium">Pay Month</p>
              <p className="text-center font-medium">Pay Mathod</p>
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
    </div>
  );
}
