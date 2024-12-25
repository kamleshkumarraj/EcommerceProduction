import React from "react";
import CategoryCard from "../card/CategoryCard";

function TradingProductsBody({ title , products }) {
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div
        id="product-body"
        className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-[20px]"
      >
        {products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((item) => <CategoryCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}

export default TradingProductsBody;
