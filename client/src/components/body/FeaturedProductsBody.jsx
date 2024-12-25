import React from "react";
import ProductCard from "../card/ProductCard";

const FeaturedProductsBody = ({ title, products }) => {
  return (
    <div id="featured-product-body" className=" py-[10px] ">
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>{title}</h2>
        <div className="w-[200px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
        {products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((item) => <ProductCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default FeaturedProductsBody;
