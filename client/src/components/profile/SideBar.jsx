// import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSelf, setUser } from "../../store/slices/selfHandler.slice";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { toastUpdate } from "../../helper/helper";
import { apiCalling } from "../../api/apiCalling.api";
import { setAllCarts } from "../../store/slices/cart.slice";
import { setAllWishlists } from "../../store/slices/wishlist.slice";
import { useSocket } from "../../contexts/Socket";
import { LOGOUT_EVENT } from "../../events";

const Sidebar = () => {
  const userData = useSelector(getSelf);
  const name = userData?.firstname + " " + userData?.lastname;
  const dispatch = useDispatch();
  const socket = useSocket();
  const logoutHandler = async () => {
    const options = {
      method: "GET",
      url: "http://internal-backend-internal-alb-1173943540.ap-south-1.elb.amazonaws.com/api/v2/auth/logout",
    };
    const toastId = toast.loading("Signing out...");
    try {
      const response = await dispatch(apiCalling(options));
      console.log(response);
      if (response?.success) {
        socket.emit(LOGOUT_EVENT, userData);
        toastUpdate({
          toastId,
          message: response?.message || "User logged out successfully",
          type: "success",
        });
        dispatch(setUser(null));
        dispatch(setAllCarts([]));
        dispatch(setAllWishlists([]));
      } else {
        toastUpdate({
          toastId,
          message: response?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      toastUpdate({
        toastId,
        message: error || "Something went wrong",
        type: "error",
      });
    }
  };
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
                alt="my-order"
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
          <Link onClick={logoutHandler} to={"/"}>
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
