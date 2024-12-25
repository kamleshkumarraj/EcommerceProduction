import React from "react";
import { FaStar } from "react-icons/fa";
import Pair_3 from "../button/Pair_3";

function MobileCard({ item }) {
  return (
    <div
      id="length-card"
      className="w-[280px] px-[20px] py-[10px] bg-white rounded-[10px] flex flex-col gap-[30px]"
    >
      <div id="image" className="w-[120px] h-[250px] flex justify-center items-center mx-auto">
        <img src={item?.images[0]} alt="products-image" />
      </div>
      <div id="details" className="flex flex-col items-center gap-[10px]">
        <h1 className="font-[500] text-center text-[24px] ">{item?.title}</h1>
        <div id="rating" className="flex gap-[10px] items-center">
          <span className="text-[16px] flex gap-[5px] text-[#FFA31A]">
            {[1, 2, 3, 4, 5].map(() => (
              <FaStar key={Math.random()} size={22} color="#FFA31A" />
            ))}
          </span>
          
        </div>
        <p className="text-[16px] font-[500] text-[#FF4035]">Sold Out</p>
        <div id="price" className="text-[18px] flex gap-[20px] font-[500]">
          <span className=" text-[#FF4035]">${item?.price}</span>
          <del className="text-gray-400">$500</del>
        </div>
        <div id="button">
          <Pair_3 bgColor={"bg-white"} item={item} key={item?._id} />
        </div>
      </div>
    </div>
  );
}

export default MobileCard;
