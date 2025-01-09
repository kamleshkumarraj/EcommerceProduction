import { useSelector } from "react-redux";
import Advertisement from "../components/Advertisment1";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import OfferBanner from "../components/OfferBanner";
import FeaturedProductsBody from "../components/body/FeaturedProductsBody";
import LaptopComputerBody from "../components/body/LaptopComputerBody";
import LatestProductsBody from "../components/body/LatestProductsBody";
import TopRatedProductsBody from "../components/body/TopRatedProductsBody";
import TradingProductsBody from "../components/body/TradingProductsBody";
import {
  getAllProducts,
  getDiscountedProducts,
  getLatestProducts,
  getTopRatedProducts,
} from "../store/slices/productsHandler.slice";
import TestimonialSection from "../components/body/TestomonialSection";
import WhyChooseUs from "../components/body/ChooseWhy";
import DiscountedProductsBody from "../components/body/DiscountedProductsBody";
import { GlobalContext } from "../contexts/GlobalProvider";
import { useContext, useEffect, useState } from "react";
import { getSocket } from "../contexts/Socket";
import { NEW_PRODUCT_ADDED } from "../events";


const Home = () => {
  const products = useSelector(getAllProducts);
  const topRated_product = useSelector(getTopRatedProducts);
  const discount_product = useSelector(getDiscountedProducts);
  const latest_products = useSelector(getLatestProducts) || []
  const {setEventLoading , eventLoading} = useContext(GlobalContext)
  const [newProductsData , setNewProductsData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setEventLoading(false)
    },1000)
  },[eventLoading])

  const socket = getSocket();
  const newProductsHandler = ({productsData}) => {
      setNewProductsData([...newProductsData , productsData])
  }
  const latestProducts = [...newProductsData , ...latest_products.slice(0,(latest_products.length - newProductsData.length))]

  console.log(latestProducts)
  
  useEffect(() => {
    socket.on(NEW_PRODUCT_ADDED , newProductsHandler)
    return () => socket.off(NEW_PRODUCT_ADDED , newProductsHandler)
  },[socket])
  
  return (
    <div className="w-full">
      
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div id="latest-products-body"  className="py-[45px] px-[20px] lg:px-[40px] w-[100%]">
        <LatestProductsBody title={"Latest Products"} products={latestProducts} />
      </div>
      <div id="offer-banner">
        <OfferBanner />
      </div>
      <div id="featured-products-body" className="overflow-hidden bg-gray-200 w-[100%] px-[20px] lg:px-[40px]">
        {topRated_product.length > 0 && (
          <FeaturedProductsBody title="Featured Products" products={discount_product} />
        )}
      </div>
      <div
        id="laptop-computer-body"
        className="bg-gray-200 width-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px]"
      >
        <LaptopComputerBody />
      </div>
      <div id="advertisement-banner" className="w-[100%]">
        <Advertisement />
      </div>
      <div
        id="top-rated-products-body"
        className="w-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200"
      >
        {topRated_product && topRated_product.length > 0 && (
          <TopRatedProductsBody title={"Top Rated Products"} products={topRated_product} />
        )}
      </div>
      <div
        id="latest-products"
        className="w-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200"
      >
        {products && products.length > 0 && (
          <TradingProductsBody title={"Trading Products"} products={products.slice(85,100)} />
        )}
      </div>
      <div id="why-we-choose" className="">
        <WhyChooseUs />
      </div>
      <div id="discountableProduct" className=" bg-gray-200 px-[20px] lg:px-[40px] py-[40px]" >
        {products && products.length > 0 && (
          <DiscountedProductsBody title={"Discountable Products"} products={products.slice(120,140)} />
        )}
      </div>
      <div id="testominial-section" className="w-[100%] bg-white mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200">
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
