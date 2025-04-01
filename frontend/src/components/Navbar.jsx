import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DahamNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-[#16423C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/tools_home" className="text-[#E9EFEC] font-bold text-2xl">
              Rentify
            </a>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#C4DAD2] hover:text-white hover:bg-[#6A9C89] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white sm:hidden"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex space-x-4 items-center">
            <a
              href="/booking"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              My rentals
            </a>
            <button
              onClick={handleLogout}
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="#home"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#tools"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Tools
          </a>
          <a
            href="#about"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
          <button
            onClick={handleLogout}
            className="text-[#C4DAD2] hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DahamNavBar;
