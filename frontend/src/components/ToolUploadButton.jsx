import React from "react";
import { Link } from "react-router-dom";

const ToolUploadButton = () => {
  return (
    <div className="flex ml-5 mt-6">
      <Link to="/rent_create">
        <button className="flex items-center bg-[#6A9C89] text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-[#5a8e74] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6A9C89] focus:ring-opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Upload Tools
        </button>
      </Link>
    </div>
  );
};

export default ToolUploadButton;
