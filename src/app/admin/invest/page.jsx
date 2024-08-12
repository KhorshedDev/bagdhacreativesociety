"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createInvest, getInvest } from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";
import InvestCard from "@/components/InvestCard";

export default function Rules() {
  const [invest, setInvest] = useState({
    date: "",
    amount: "",
    profit: "",
    details: "",
  });
  const [investList, setInvestList] = useState([]);
  useEffect(() => {
    getInvestList();
  }, []);

  const handleSubmit = async () => {
    await createInvest(invest);
    alert("Successfully added.");
    setInvest({
      date: "",
      amount: "",
      profit: "",
      details: "",
    });
    getInvestList();
  };
  const getInvestList = async () => {
    const data = await getInvest();
    console.log(data);
    setInvestList(data);
  };
  return (
    <ProtectedRoute>
      <main className="bg-white min-h-svh">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Go back
            </Link>
          </nav>
          <div className="mt-1">
            <h2 className="text-lg font-bold my-3">Add Investment</h2>
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
              <p className="text-sm text-gray-600">
                If loss add (-) before number
              </p>
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
                onClick={handleSubmit}
                className="bg-gray-200 block py-2 px-3 my-2 font-sm rounded outline-none"
              >
                Submit
              </button>
            </div>
            <h2 className="text-center bg-gray-300 py-3 mb-4">
              List of Previous Investments
            </h2>
            <div>
              {investList?.map((investItem) => {
                return (
                  <InvestCard
                    key={investItem.id}
                    investData={investItem}
                    func={getInvestList}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
