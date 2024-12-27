// import React from 'react'

import { AiOutlineHome } from "react-icons/ai";
import FilterSidebar from "../components/searchingFiltering/Sidebar";
import ShoppingProductsBody from "../components/body/ShoppingBody";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalProvider";
import ProductsSliderBody from "../components/slider/ProductsSliderBody";
import { useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productsHandler.slice";

function ShoppingPage() {
    const { setSearchQuery , setSearchCategoryList , setFilterPriceList , setFilterRatingList  } = useContext(GlobalContext);
    const products = useSelector(getAllProducts)
    useEffect(() => {
        return () => {
            setSearchQuery("")
            setSearchCategoryList([])
            setFilterPriceList([])
            setFilterRatingList([])
            
        }
    },[])
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
                <span className="text-red-500">{"Shopping"}</span>
              </div>
            </div>
          </div>
          <div id="main-body" className="flex items-start w-full bg-gray-200">
            <div id="side-bar" className="w-[20%] bg-gray-200">
                <FilterSidebar />
            </div>
            <div id="shopping-products-body" className="w-[80%] bg-gray-200 px-[20px] py-[20px]">
                <ShoppingProductsBody />
            </div>
            
          </div>
          <div id="products-slider" className="bg-gray-200 pt-[10px] pb-[20px]">
          <div id="latest-products-slider"  >
                    {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(0,12)} title={"Latest Products"} /> }
                  </div>
                  
                  <div id="top-rated-products-slider"  >
                    {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(12,24)} title={"Top Rated Products"} /> }
                  </div>
            
                  <div id="featured-products-slider" >
                    {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(24,36)} title={"Featured Products"} /> }
                  </div>
        </div>
        </div>
      );
}

export default ShoppingPage
