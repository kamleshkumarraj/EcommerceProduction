import React from "react";
import FeaturedCard from "../card/FeaturedCard";

function TopRelatedProductsBody({ productsList }) {
  return (
    <div id="products-body" className="py-[20px]">
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{"Top Related Products"}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div
        id="top-related-products-body"
        className="px-[80px] grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px] pb-[20px]"
      >
        {productsList &&
          productsList?.length > 0 &&
          productsList.map((item) => (
            <FeaturedCard key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default TopRelatedProductsBody;
