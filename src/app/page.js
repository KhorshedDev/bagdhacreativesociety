"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getMetaData } from "@/lib/userService";
import { useState, useEffect } from "react";

export default function Home() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getMeta();
  }, []);

  const getMeta = async () => {
    const data = await getMetaData();
    setMeta(data);
  };

  const listOfMenu = [
    { link: "/", name: "হোম", key: 0 },
    { link: "/members", name: "সদস্য", key: 1 },
    { link: "/deposite", name: "জমা", key: 2 },
    { link: "/rules", name: "নিয়ম", key: 3 },
    { link: "/contact", name: "যোগাযোগ", key: 4 },
    { link: "/payment", name: "জমার মাধ্যম ", key: 5 },
  ];
  const MenuItem = ({ name, link }) => {
    return (
      <li className="mx-3 my-3 cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 max-sm:w-full max-sm:block max-sm:text-center max-sm:mx-0 max-sm:bg-blue-200">
        <Link
          className="cursor-pointer hover:text-blue-400 block w-full"
          href={link}
        >
          {name}
        </Link>
      </li>
    );
  };
  if (!meta) {
    return <p className="text-center font-bold text-lg">Loading...</p>;
  }
  return (
    <main className="bg-white min-h-svh">
      {/* container */}
      <div className="w-5/6 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <Link href="/">
            <Image src="/logo.jpg" alt="somiti logo" width={300} height={300} />
          </Link>
          <nav className="my-4 max-sm:w-full">
            <ul className="p-3 flex bg-gray-100 flex-col md:flex-row max-sm:w-full">
              {listOfMenu.map((item) => (
                <MenuItem link={item.link} name={item.name} key={item.key} />
              ))}
            </ul>
          </nav>
          <div className="my-5">
            {meta.pictureUrl && (
              <Image
                className="w-full"
                alt="group picture of somiti"
                src={meta.pictureUrl}
                width={300}
                height={300}
                layout="responsive"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
