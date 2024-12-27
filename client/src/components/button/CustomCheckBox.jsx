import React, { useContext, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { GlobalContext } from "../../contexts/GlobalProvider";

const CustomCheckbox = ({name  , setQueryList}) => {
  const {setCategory} = useContext(GlobalContext) 
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={name}
        className="hidden peer"
        value={name}
        onChange={() => {
          setCategory("")
          setQueryList((prev) => {
            if(prev.includes(name)){
              return prev.filter(item => item != name)
            }else{
              return [...prev, name]
            }
          })
        }}
      />
      <label
        htmlFor={name}
        className="flex items-center justify-center w-6 h-6 transition duration-300 border-2 border-gray-300 rounded-md cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-500"
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden w-4 h-4 text-white peer-checked:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <IoCheckmark size={20} color="#F3F4F6" className="" />
      </label>
      <span className="text-gray-700 transition duration-300 peer-checked:text-green-500">
        {name}
      </span>
    </div>
  );
};

export default CustomCheckbox;
