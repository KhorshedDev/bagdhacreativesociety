"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getUserById, updateUserPayroll } from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AddDeposite() {
  const [id, setId] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState("2024");
  const [mathod, setMathod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [rashid, setRashid] = useState("");
  const [payDate, setPayDate] = useState(null);
  const [running, setRunning] = useState(false);
  const [errorInFuc, setErrorInFuc] = useState(false);

  const handleClick = async () => {
    await fetchUser();
  };

  const fetchUser = async () => {
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
  const handleSubmit = async () => {
    setRunning(true);
    setErrorInFuc(false);
    try {
      const data = {
        date: `${month}-${year}`,
        payMathod: mathod,
        amount,
        rashid,
        payDate: new Date(payDate),
      };
      await updateUserPayroll(id, data);
      setRunning(false);
      setUser("");
    } catch (error) {
      console.log(error);
      alert("Error Happned");
      setErrorInFuc(true);
      setRunning(false);
    }
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const paymentMethods = ["bkash", "nagad", "bank", "cash", "others"];

  return (
    <ProtectedRoute>
      <main className="min-h-svh bg-white">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Back to Home
            </Link>
          </nav>
          {!user && (
            <div className="py-4 px-3 mt-5">
              <p className="font-bold text-xl">Input member id below</p>
              <input
                className="py-1 px-2 my-3 bg-gray-200 outline-none"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                disabled={loading}
                onClick={handleClick}
                className="block py-1 text-white px-5 mt-1 bg-blue-400"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && (
                <p className="text-left text-red-500">
                  There is an error: {error}
                </p>
              )}
            </div>
          )}
          {user && (
            <div className="flex justify-center items-center flex-col">
              <p className="font-medium text-md my-2">Member found</p>
              <Image
                className="border-2 border-gray-300"
                width={100}
                height={100}
                src={user.pictureUrl}
                alt="member photo"
              />
              <p className="text-gray-600 mt-2">{user.name}</p>
              <p className="text-gray-600 py-1">Share - {user.share}</p>
              <p className="text-gray-600">Monthly - {user.monthRate} tk</p>
              <div className="mt-4 pb-20">
                <p className="font-medium my-3">Select Month</p>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="p-3 w-5/6 bg-blue-200"
                  name="month"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <p className="font-medium my-3">Select Year</p>
                <input
                  className="w-5/6 py-2 px-4 bg-blue-200"
                  type="number"
                  min="2024"
                  max="2099"
                  step="1"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <p className="font-medium my-3">Select payment method</p>
                <select
                  className="w-5/6 py-2 px-4 bg-blue-200"
                  name="paymentMethod"
                  onChange={(e) => setMathod(e.target.value)}
                  value={mathod}
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                <p> Payment Date</p>
                <input
                  className="w-5/6 py-2 px-4 bg-blue-200"
                  type="date"
                  value={payDate}
                  onChange={(e) => setPayDate(e.target.value)}
                />
                <p className="font-medium my-3">Enter Amount</p>
                <input
                  className="w-5/6 py-2 px-4 bg-blue-200"
                  type="number"
                  name="amount"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="font-medium my-3">Rashid No</p>
                <input
                  className="w-5/6 py-2 px-4 bg-blue-200"
                  type="text"
                  name="rashid"
                  min="0"
                  value={rashid}
                  onChange={(e) => setRashid(e.target.value)}
                />
                <button
                  disabled={running}
                  onClick={handleSubmit}
                  className="w-5/6 py-2 px-4 mt-4 bg-blue-500 text-white"
                >
                  {running ? "Loading..." : "Publish"}
                </button>
                {errorInFuc && (
                  <p className="text-red-600">There is a error.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
