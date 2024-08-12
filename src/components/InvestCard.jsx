"use client";
import { useState } from "react";

import { updateInvest, deleteInvest } from "@/lib/userService";
export default function InvestCard({ isWeb, investData, func }) {
  const [editMood, setEditMood] = useState(false);
  const [invest, setInvest] = useState({
    date: investData.date,
    amount: investData.amount,
    profit: investData.profit,
    details: investData.details,
  });

  const handleUpdate = async () => {
    await updateInvest(investData.id, invest);
    setEditMood(false);
    func();
    alert("Updated Succesfully");
  };
  const handleDelete = async () => {
    await deleteInvest(investData.id);
    func();
    alert("Delete Success");
  };
  return (
    <div className=" my-3 bg-gray-50 py-3  border-t-2 border-b-2 px-3">
      {!editMood && (
        <div>
          <div className="flex justify-between bg-gray-100 p-2 mb-2">
            <p>{investData.date}</p>
            <p>{investData.amount} Tk</p>
          </div>
          <div>
            <p>{investData.details}</p>
            <p
              style={{
                background: Number(investData.profit) > 0 ? "green" : "red",
              }}
              className="mt-2 p-1 bg-gray-200 inline-block text-white rounded"
            >
              {Number(investData.profit) > 0 ? "Profit" : "Loss"} :{" "}
              {investData.profit}
            </p>
          </div>
          {!isWeb && (
            <div className="my-2">
              <button
                onClick={() => setEditMood(true)}
                className="px-3 py-1 text-sm rounded bg-blue-400"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded text-sm bg-red-400 ml-2"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {editMood && (
        <div className="my-3">
          <p className="font-medium">Select Date</p>
          <input
            value={invest.date}
            onChange={(e) =>
              setInvest((oldVal) => ({ ...oldVal, date: e.target.value }))
            }
            className="p-3 bg-gray-400 rounded border-none outline-none text-white my-2"
            type="date"
          />
          <p className="font-medium">Write Details</p>
          <textarea
            onChange={(e) =>
              setInvest((oldVal) => ({
                ...oldVal,
                details: e.target.value,
              }))
            }
            value={invest.details}
            className="bg-gray-200 max-sm:w-full p-2 my-2 border-none outline-none rounded w-4/6"
          ></textarea>
          <p className="font-medium">Enter Amount</p>
          <input
            className="bg-gray-200 py-2 px-3 my-2 font-sm rounded outline-none"
            type="text"
            name=""
            id=""
            value={invest.amount}
            onChange={(e) =>
              setInvest((oldVal) => ({ ...oldVal, amount: e.target.value }))
            }
          />
          <p className="font-medium">Enter Profit and Loss</p>
          <p className="text-sm text-gray-600">If loss add (-) before number</p>
          <input
            className="bg-gray-200 py-2 px-3 my-2 font-sm rounded outline-none"
            type="text"
            name=""
            id=""
            value={invest.profit}
            onChange={(e) =>
              setInvest((oldVal) => ({ ...oldVal, profit: e.target.value }))
            }
          />
          <button
            onClick={handleUpdate}
            className="bg-gray-200 block py-2 px-3 my-2 font-sm rounded outline-none"
          >
            Submit
          </button>
          <button
            className="py-2 px-3 bg-blue-400 rounded text-white"
            onClick={() => setEditMood(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
