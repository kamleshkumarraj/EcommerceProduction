import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Advertisement from "../components/Advertisment1";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import OfferBanner from "../components/OfferBanner";
import WhyChooseUs from "../components/body/ChooseWhy";
import DiscountedProductsBody from "../components/body/DiscountedProductsBody";
import FeaturedProductsBody from "../components/body/FeaturedProductsBody";
import LaptopComputerBody from "../components/body/LaptopComputerBody";
import LatestProductsBody from "../components/body/LatestProductsBody";
import TestimonialSection from "../components/body/TestomonialSection";
import TopRatedProductsBody from "../components/body/TopRatedProductsBody";
import TradingProductsBody from "../components/body/TradingProductsBody";
import { GlobalContext } from "../contexts/GlobalProvider";
import { DELETE_PRODUCT, NEW_PRODUCT_ADDED } from "../events";
import { useHandleSocket } from "../hooks/useHandleSocket";
import { deleteSingleProductsInStore } from "../store/reducers";
import {
  getDiscountedProducts,
  getLatestProducts,
  getTopRatedProducts,
  setAllProducts,
  setDiscountedProducts,
  setLatestProducts,
  setSingleLatestProducts,
  setTopRatedProducts
} from "../store/slices/productsHandler.slice";
import { useGetUserTotalProductsQuery } from "../store/slices/userApi";

const Home = () => {
  const topRated_product = useSelector(getTopRatedProducts);
  const discount_product = useSelector(getDiscountedProducts);
  const latestProducts = useSelector(getLatestProducts) || []
  const {setEventLoading , eventLoading} = useContext(GlobalContext)

  const {data : productsData  , error : productsError , isLoading : isPRoductsLoading } = useGetUserTotalProductsQuery();
  
  useEffect(() => {
    dispatch(setAllProducts(productsData?.data?.products || []));
    dispatch(setTopRatedProducts(productsData?.data?.products?.slice(0, 40) || []));
    dispatch(setLatestProducts(productsData?.data?.products?.slice(productsData?.data?.products?.length - 24 , productsData?.data?.products?.length) || []));
    dispatch(setDiscountedProducts(productsData?.data?.products?.slice(70, 90) || []));
  } , [productsData])
  
  const products = productsData?.data?.products || [];
  
  useEffect(() => {
    setTimeout(() => {
      setEventLoading(false)
    },1000)
  },[eventLoading])
  
  const dispatch = useDispatch();

  // that functions handle the socket callback.
  const newProductsHandler = useCallback(({productsData}) => {
      dispatch(setSingleLatestProducts(productsData))      
  },[dispatch])
  
  // that functions handle the socket callback.
  const deleteProductsSocketHandler = useCallback((productsId) => {
    deleteSingleProductsInStore({dispatch , productsId})
  },[dispatch])
  
  // that hooks is used for handling the event from server.
  useHandleSocket({[NEW_PRODUCT_ADDED] : newProductsHandler , [DELETE_PRODUCT] : deleteProductsSocketHandler})
 
  
  return (
    <div className="w-full">
      <div  id="hero-section">
        <Banner />
        <div className="my-4">
          <Categorys />
        </div>
      </div>
      <div  id="latest-products-body"  className="py-[45px] px-[20px] lg:px-[40px] w-[100%]">
        <LatestProductsBody title={"Latest Products"} products={latestProducts} />
      </div>
      <div  id="offer-banner">
        <OfferBanner />
      </div>
      <div  id="featured-products-body" className="overflow-hidden bg-gray-200 w-[100%] px-[20px] lg:px-[40px]">
        {topRated_product.length > 0 && (
          <FeaturedProductsBody title="Featured Products" products={discount_product} />
        )}
      </div>
      <div  id="laptop-computer-body" className="bg-gray-200 width-[100%] mx-auto px-[20px] lg:px-[40px] py-[20px]"
        
      >
        <LaptopComputerBody />
      </div>
      <div  id="advertisement-banner" className="w-[100%]">
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
      <div  id="why-we-choose" className="">
        <WhyChooseUs />
      </div>
      <div  id="discountableProduct" className=" bg-gray-200 px-[20px] lg:px-[40px] py-[40px]" >
        {products && products.length > 0 && (
          <DiscountedProductsBody title={"Discountable Products"} products={products.slice(120,140)} />
        )}
      </div>
      <div  id="testominial-section" className="w-[100%] bg-white mx-auto px-[20px] lg:px-[40px] py-[20px] bg-gray-200">
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
