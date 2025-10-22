import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, removeAuth } from "../utils/auth";
import { AiOutlineUserAdd, AiOutlineQrcode, AiOutlineTeam } from "react-icons/ai";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 Hide Navbar on login/signup pages
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  if (isAuthPage) return null;

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    removeAuth();
    setUser(null);
    setIsOpenMobile(false);
    navigate("/login");
  };

  const links = [
    { path: "/", label: "New Id", icon: <AiOutlineUserAdd size={24} /> },
    { path: "/scan", label: "Scan Id", icon: <AiOutlineQrcode size={24} /> },
    { path: "/savedusers", label: "Employee", icon: <AiOutlineTeam size={24} /> },
  ];

  const getLinkClass = (path) =>
    `flex items-center gap-2 transition-colors duration-300 rounded-md p-2 ${
      location.pathname === path
        ? "text-sky-400 font-semibold bg-indigo-700"
        : "text-white hover:text-sky-400 hover:bg-indigo-700/50"
    }`;

  return (
    <>
      {/* -------- Desktop Sidebar -------- */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen z-50">
        <div
          className={`h-full bg-indigo-800 shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-56" : "w-16"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center p-4 border-b border-indigo-600">
            <Link
              to="/"
              className={`text-2xl font-bold text-white transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              NexaEmpId
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-col px-1 py-8 text-lg  gap-2 flex-1">
            {links.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${getLinkClass(link.path)} hover:animate-bounce-link`}
              >
                <span>{link.icon}</span>
                <span
                  className={`transition-all  duration-300 overflow-hidden whitespace-nowrap ${
                    isSidebarOpen
                      ? `opacity-100 max-w-xs ml-2 delay-[${index * 75}ms]`
                      : "opacity-0 max-w-0 ml-0"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            {user && (
              <div
                className={`mt-auto flex flex-col gap-3 transition-all duration-500 overflow-hidden ${
                  isSidebarOpen ? "opacity-100 max-h-40 delay-[300ms]" : "opacity-0 max-h-0"
                }`}
              >
                <span className="text-sm font-semibold">Hello, {user.name || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#ffff]   hover:bg-red-500 px-3 py-1 rounded-lg transition-all duration-300 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Arrow Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-4 z-50 text-white text-lg font-bold p-1 rounded-md transition-all duration-500
            ${isSidebarOpen ? "left-[14rem] rotate-0" : "left-[3.5rem] rotate-180"} 
            hover:bg-indigo-700 transform animate-bounce-toggle`}
        >
          <span className="block transform transition-transform duration-500">&lt;</span>
        </button>
      </div>

      {/* -------- Mobile Navbar -------- */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50">
        <div className="w-full h-12 flex items-center justify-between px-4 bg-white/20 backdrop-blur-lg shadow-lg">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            NexaEmpId
          </Link>

          {/* Hamburger */}
          <div
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="h-full flex flex-col justify-center items-center cursor-pointer transform transition-transform duration-300"
          >
            <span
              className={`block w-6 h-1 bg-indigo-600 my-[2px] transition-transform duration-500 ${
                isOpenMobile ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-1 bg-indigo-600 my-[2px] transition-opacity duration-500 ${
                isOpenMobile ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-1 bg-indigo-600 my-[2px] transition-transform duration-500 ${
                isOpenMobile ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
            isOpenMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpenMobile(false)}
        ></div>

        {/* Dropdown */}
        <div
          className={`fixed left-0 w-full h-[55vh] bg-indigo-800 backdrop-blur-lg rounded-t-2xl shadow-lg transition-all duration-500 ease-in-out flex flex-col justify-between p-2 z-50 ${
            isOpenMobile ? "bottom-0" : "-bottom-[80vh]"
          }`}
        >
          <div className="flex flex-col  gap-3 py-2 text-lg text-white ">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpenMobile(false)}
                className={`flex items-center gap-3  transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-sky-400 font-semibold bg-indigo-700 px-2 py-1 rounded-md "
                    : "hover:text-sky-400 hover:bg-indigo-700/50 px-2 py-1 rounded-md"
                }`}
              >
                <span>{link.icon}</span>
                <span className="text-xl">{link.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="mt-4 absolute bottom-3 w-full p-4 left-0  flex flex-col gap-2">
                <span className="text-xl text- font-semibold"><span className="text-black">Hello,</span> {user.name || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="text-black  bg-white hover:bg-red-700  rounded-lg transition-all duration-300 "
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-sky-400 transition-colors duration-300 mt-4"
                onClick={() => setIsOpenMobile(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes bounce-toggle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .animate-bounce-toggle { animation: bounce-toggle 0.3s ease-in-out; }

          @keyframes bounce-link {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .hover\\:animate-bounce-link:hover { animation: bounce-link 0.3s ease-in-out; }
        `}
      </style>
    </>
  );
}
