// components/Loading.js
import React from "react";

import Image from "next/image";
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Image
          src="/logo.jpg"
          width={300}
          height={300}
          alt="Logo"
          className="mx-auto animate-bounce"
        />
        <div className="mt-4">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10.667h2zm2 5.248l-1.408 1.408A10.066 10.066 0 0012 22v-2a8.014 8.014 0 01-6-2.752z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;
