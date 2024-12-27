// import React from "react";

import { FaPenAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
const AddReviewForm = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="w-[100%] px-[100px] p-6 mx-auto bg-white rounded shadow-md">
        <h1 className="mb-4 text-[28px] font-[500] text-black">Add A Review</h1>
        <p className="mb-4 text-[16px] text-gray-600">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>
        <div className="mb-4">
          <label className="text-[16px] font-medium text-black">
            Rate this product? <span className="text-red-500">*</span>
          </label>
          <div className="flex mt-2 space-x-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
            <span className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2">
              <IoPersonOutline size={20} />
            </span>
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
            />
            <span className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2">
              <TfiEmail size={20} />
            </span>
          </div>
        </div>
        <div className="relative mb-4">
          <textarea
            placeholder="Write a Message"
            className="w-full p-3 border border-gray-300 rounded resize-none focus:ring focus:ring-blue-300 focus:outline-none h-28"
          ></textarea>
          <span className="absolute text-gray-400 right-3 top-3">
            <FaPenAlt size={20} />
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <label className="ml-2 text-[1.4rem] text-gray-600">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button className="px-6 py-3 text-white bg-red-500 rounded hover:bg-red-600 focus:ring focus:ring-red-300">
          Post A Comment →
        </button>
      </div>
    </div>
  );
};

export default AddReviewForm;
