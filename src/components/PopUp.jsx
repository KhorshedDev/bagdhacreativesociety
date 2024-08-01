// components/FullScreenPopup.js
import React from "react";

const FullScreenPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto">
      <div className="relative bg-white w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default FullScreenPopup;
