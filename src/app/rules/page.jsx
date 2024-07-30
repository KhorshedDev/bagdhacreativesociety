"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRules } from "@/lib/userService";
export default function Rules() {
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getRules();
    setTodoList(d);
  };
  if (!todoList) {
    return <p className="text-center font-bold text-lg">Loading...</p>;
  }
  return (
    <main className="bg-white min-h-svh">
      <div className="w-5/6 mx-auto">
        <nav className="py-4">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>
        <div className="">
          <h1 className="text-center font-bold pb-2 border-b-2 mb-4">
            যেসব নিয়ম কানুন মেনে চলতে হবে
          </h1>
          <ul>
            {todoList.map((i) => (
              <li key={i._id} className="p-2 my-2 bg-gray-200">
                {i.rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
