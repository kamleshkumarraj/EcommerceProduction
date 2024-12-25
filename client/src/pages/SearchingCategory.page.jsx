import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/searchingFiltering/Sidebar";
import FilteringItemsBody from "../components/searchingFiltering/ItemsBody";

function SearchingCategoryPage() {
  const path = useLocation().state?.category || "Shop";
  return (
    <div className="w-full" id="category-filter-product-body">
      <div className="w-full">
        <div className="bg-gradient-to-r from-[#fff8f5] via-[#fff5f0] to-[#fff8f5] py-[50px] px-8">
          <div className="flex items-center justify-center text-[16px] text-gray-600">
            {/* Home Icon */}
            <AiOutlineHome className="mr-2" size={24} />
            {/* Breadcrumb Links */}
            <span className="text-gray-600">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">Category</span>
            <span className="mx-2">&gt;</span>
            <span className="text-red-500">{path?.substring(0,1).toUpperCase() + path?.substring(1)}</span>
          </div>
        </div>
      </div>
      <div id="main-body" className="flex items-start w-full ">
        <div id="side-bar" className="w-[20%]">
            <FilterSidebar />
        </div>
        <div id="products-body" className="w-[80%] bg-gray-200 px-[20px] py-[20px]">
            <FilteringItemsBody />
        </div>
      </div>
    </div>
  );
}

export default SearchingCategoryPage;
