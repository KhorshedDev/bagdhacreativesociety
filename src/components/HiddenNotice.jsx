import { useState } from "react";

export default function HiddenNotice({ func }) {
  const [password, setPassword] = useState("");
  const checkfunc = () => {
    if (password === "est@july2024") {
      func(true);
    } else {
      alert("Wrong password!");
    }
  };
  return (
    <div className="bg-gray-100 mt-5 rounded p-5 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold my-3 text-center">
        You need to provide password to see the details
      </h1>
      <input
        className="py-1 px-2"
        type="text"
        name=""
        id=""
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={checkfunc}
        className="block py-1 px-3 bg-blue-400 mt-2 text-white"
      >
        Submit
      </button>
    </div>
  );
}
