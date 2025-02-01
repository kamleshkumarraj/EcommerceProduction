import { AiOutlineHome } from "react-icons/ai";
import ProductsDetails from "../components/productsDetails/ProductsDetails";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddReviewForm from "../components/productsDetails/AddReviewForm";
import ReviewSection from "../components/productsDetails/Reviews";
import TopRelatedProductsBody from "../components/body/TopRelatedProductsBody";
import { useFilter } from "../hooks/useFilter.hook";
import { useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productsHandler.slice";
import ProductsSliderBody from "../components/slider/ProductsSliderBody";

function ProductsDetailsPage() {
  const product = useLocation()?.state?.products;
    const [img , setImg] = useState(product?.images[0]?.url || product?.images[0]);
    const products = useSelector(getAllProducts)
    const [changed , setChanged] = useState(true)
    const [filteredProducts , setFilterQuery] = useFilter(products || [], (item) => item?.category)
    useEffect(() => {
      setFilterQuery(product?.category || "")
    },[product])
    useEffect(() => {
      setImg(product?.images[0]?.url || product?.images[0])
    },[product])
  return (
    <div className="w-full bg-gray-200">
      <div className="bg-gradient-to-r from-[#fff8f5] via-[#fff5f0] to-[#fff8f5] py-[50px] px-8">
        <div className="flex items-center justify-center text-[16px] text-gray-600">
          {/* Home Icon */}
          <AiOutlineHome className="mr-2" size={24} />
          {/* Breadcrumb Links */}
          <span className="text-gray-600">Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">Category</span>
          <span className="mx-2">&gt;</span>
          <span className="text-red-500">{"Products Details"}</span>
        </div>
      </div>
      <div id="detilas-body" className="bg-white" >
            <ProductsDetails
                img = {img}
                product = {product}
                setImg = {setImg}
            />
      </div>
      <div id="review-section" className="bg-white" >
        <ReviewSection changed={changed}  products={product} />
      </div>
      <div id="ratingForm" className="bg-white" >
        <AddReviewForm products={product} changed={changed} setChanged={setChanged} />
      </div>
      <div id="top-related-products-body" className="bg-white mb-[20px]" >
        <TopRelatedProductsBody productsList={filteredProducts} />
      </div>
       <div id="latest-products-slider"  >
        {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(0,12)} title={"Latest Products"} /> }
      </div>
      s
      <div id="top-rated-products-slider"  >
        {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(12,24)} title={"Top Rated Products"} /> }
      </div>

      <div id="featured-products-slider" >
        {products && products.length > 0 &&<ProductsSliderBody productsList={products.slice(24,36)} title={"Featured Products"} /> }
      </div> 
    </div>
  );
}

export default ProductsDetailsPage;
