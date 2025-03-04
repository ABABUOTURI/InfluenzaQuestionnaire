import React from "react";
import { CheckCircle } from "lucide-react"; 

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <CheckCircle className="text-blue-500 mx-auto" size={50} />
        <h2 className="text-lg font-semibold text-blue-600 mt-3">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;
