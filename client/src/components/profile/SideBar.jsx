// import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getSelf } from "../../store/slices/selfHandler.slice";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const Sidebar = () => {
  const userData = useSelector(getSelf);
  const name = userData?.firstname + " " + userData?.lastname;

  return (
    <div className="sticky w-full mb-8 ">
      <div className="p-6 ml-5 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl"></div>
          <h1 className="text-[2.4rem] font-bold text-gray-800">{name}</h1>
        </div>
        <div className="mb-6 text-[1.4rem] text-gray-500">
          Welcome to your Account
        </div>
        <ul className="gap-1 space-y-3">
          <Link to={"/my-account/my-orders"}>
            <li className="flex items-center gap-3 p-3 transition duration-300 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100">
              <img
                src={
                  "https://media.istockphoto.com/id/835148968/photo/red-headphones-isolated.jpg?s=612x612&w=0&k=20&c=JAEd1MYVaJjC0Iu1cZ4LPHRigRGZ-NJNjIXXs87me1E="
                }
                alt="myorder"
                width={20}
                className="opacity-80"
              />
              <span className="font-semibold text-gray-700">My orders</span>
            </li>
          </Link>
          <Link to={"/my-account/wishlist"}>
            <li className="flex items-center gap-3 p-3 transition duration-300 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100">
              <CiHeart size={22} className="text-gray-700 opacity-80" />
              <span className="font-semibold text-gray-700">Wishlist</span>
            </li>
          </Link>
          <Link to={"/my-account/my-info"}>
            <li className="flex items-center gap-3 p-3 transition duration-300 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100">
              <AiOutlineUser size={22} className="text-gray-700 opacity-80" />
              <span className="font-semibold text-gray-700">My info</span>
            </li>
          </Link>
          <Link to={"/my-account/address"}>
            <li className="flex items-center gap-3 p-3 transition duration-300 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100">
              <MdOutlineAddLocationAlt
                size={22}
                className="text-gray-700 opacity-80"
              />
              <span className="font-semibold text-gray-700">
                Manage address
              </span>
            </li>
          </Link>
          <Link to={"/signin"}>
            <li className="flex items-center gap-3 p-3 transition duration-300 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100">
              <FiLogOut size={22} className="text-gray-700 opacity-80" />
              <span className="font-semibold text-gray-700">Sign out</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
