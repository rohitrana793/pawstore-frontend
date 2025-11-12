import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdConnectWithoutContact } from "react-icons/md";
import toast from "react-hot-toast";
import {
  Squares2X2Icon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { logoutUser } from "../auth/authSlice";
import { useLogoutUserMutation } from "../auth/authApi";
import {
  FaDog,
  FaBox,
  FaBlog,
  FaClipboardList,
  FaEnvelope,
} from "react-icons/fa";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userLogout] = useLogoutUserMutation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await userLogout().unwrap();
    dispatch(logoutUser());
    toast.success("Logout successfully");
    nav("/");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <header className="lg:hidden flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold tracking-wide">Admin Dashboard</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-blue-700 transition"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </header>

      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:block lg:w-1/4 xl:w-1/5 bg-white border-r p-5 lg:p-6 shadow-sm transition-all duration-300 z-20`}
      >
        <h1 className="hidden lg:block mb-10 text-2xl font-bold text-blue-700 tracking-wide">
          Admin Dashboard
        </h1>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="information"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Squares2X2Icon className="h-6 w-6 text-indigo-600" />
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </NavLink>

          <NavLink
            to="breed"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaDog className="text-3xl text-blue-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Breed</span>
          </NavLink>

          <NavLink
            to="product"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaBox className="text-3xl text-green-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Product</span>
          </NavLink>

          <NavLink
            to="blog"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaBlog className="text-3xl text-purple-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Blog</span>
          </NavLink>

          <NavLink
            to="order"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaClipboardList className="text-3xl text-orange-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Order</span>
          </NavLink>

          <NavLink
            to="contact"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <MdConnectWithoutContact className="text-3xl text-red-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Contact</span>
          </NavLink>

          <NavLink
            to="subscriber"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FaEnvelope className="text-3xl text-red-600 h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Subscriber</span>
          </NavLink>

          <button
            onClick={(e) => {
              setMenuOpen(false);
              handleLogout(e);
            }}
            className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 shadow-md p-4 sm:p-6 rounded-t-lg lg:rounded-none ">
        <Outlet />
      </main>
    </div>
  );
}
