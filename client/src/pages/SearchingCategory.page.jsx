// import React from "react";
import { useContext, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import FilteringItemsBody from "../components/searchingFiltering/ItemsBody";
import FilterSidebar from "../components/searchingFiltering/Sidebar";
import ProductsSliderBody from "../components/slider/ProductsSliderBody";
import { GlobalContext } from "../contexts/GlobalProvider";
import { useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productsHandler.slice";

function SearchingCategoryPage() {
  const path = useLocation().state?.category || "Shop";
  
  const {
    setSearchQuery,
    setSearchCategoryList,
    setFilterPriceList,
    setFilterRatingList,
  } = useContext(GlobalContext);
  const products = useSelector(getAllProducts);
  useEffect(() => {
    return () => {
      setSearchQuery("");
      setSearchCategoryList([]);
      setFilterPriceList([]);
      setFilterRatingList([]);
      setSearchQuery("");
    };
  }, []);

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
            <span className="text-red-500">
              {path?.substring(0, 1).toUpperCase() + path?.substring(1)}
            </span>
          </div>
        </div>
      </div>
      <div id="main-body" className="flex items-start w-full bg-gray-200">
        <div id="side-bar" className="w-[20%]">
          <FilterSidebar />
        </div>
        <div
          id="products-body"
          className="w-[80%] bg-gray-200 px-[20px] py-[20px]"
        >
          <FilteringItemsBody />
        </div>
      </div>
      <div id="products-slider" className="bg-gray-200 pt-[10px] pb-[20px]">
        <div id="latest-products-slider">
          {products && products.length > 0 && (
            <ProductsSliderBody
              productsList={products.slice(0, 12)}
              title={"Latest Products"}
            />
          )}
        </div>

        <div id="top-rated-products-slider">
          {products && products.length > 0 && (
            <ProductsSliderBody
              productsList={products.slice(12, 24)}
              title={"Top Rated Products"}
            />
          )}
        </div>

        <div id="featured-products-slider">
          {products && products.length > 0 && (
            <ProductsSliderBody
              productsList={products.slice(24, 36)}
              title={"Featured Products"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchingCategoryPage;
