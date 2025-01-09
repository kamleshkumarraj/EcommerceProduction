import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { apiCalling } from "./api/apiCalling.api";
import Loader from "./components/cart/Loader";
import FooterM from "./components/FooterM";
import Headers from "./components/Headers";
import { InitialLoader } from "./components/InitialLoader";
import NewsletterModal from "./components/Model";
import { GlobalContext } from "./contexts/GlobalProvider";
import {
  setAllCategories,
  setAllProducts,
  setDiscountedProducts,
  setLatestProducts,
  setTopRatedProducts,
} from "./store/slices/productsHandler.slice";
import { getSelf } from "./store/slices/selfHandler.slice";
import getAllCart from "./utils/getAllCartApiCall";
import { fetchOrder } from "./utils/order";
import { fetchAllWishlistItem } from "./utils/wishlist";

function App() {
  const { eventLoading, setEventLoading } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const user = useSelector(getSelf);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);

  //! first we get all products calling the api and store our data in store.
  useEffect(() => {
    (async function getAllProducts() {
      const options = {
        method: "GET",
        url: "http://localhost:2000/api/v2/admin/products",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        dispatch(setAllProducts(response.data?.products));
        dispatch(setTopRatedProducts(response?.data?.products?.slice(0, 40)));
        dispatch(setLatestProducts(response?.data?.products?.slice(response?.data?.products?.length - 24 , response?.data?.products?.length).reverse()));
        dispatch(setDiscountedProducts(response?.data?.products?.slice(70, 90)));
      } else console.log("Error during geting all products");
    })();
  }, []);

  //! now we get all categories from server using api.
  useEffect(() => {
    (async function getAllCategories() {
      const options = {
        url: "http://localhost:2000/api/v2/products/get-categories",
        method: "GET",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        console.log("We get all categories successfully");
        dispatch(setAllCategories(response.data));
      } else
        console.log(
          "We get error during fetching all categories form server !"
        );
    })();
  }, []);

  

  useEffect(() => {
    getAllCart(dispatch, user);
    fetchAllWishlistItem(dispatch, user);
    fetchOrder({ dispatch });
  }, [user]);

  if (initialLoading) return <InitialLoader />;
  return (
    <>
      
      <div className="font-[roboto]  " id="container">
        <div id="advertisement-modals" className="relative w-full">
          <NewsletterModal />
        </div>
        
          <Headers />
          {eventLoading && <Loader />}
          <Outlet />
          <FooterM />
      </div>
    </>
  );
}

export default App;
