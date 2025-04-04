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
import { setAllCategories } from "./store/slices/productsHandler.slice";
import { getSelf } from "./store/slices/selfHandler.slice";
import getAllCart from "./utils/getAllCartApiCall";
import { fetchOrder } from "./utils/order";
import { fetchAllWishlistItem } from "./utils/wishlist";

function App() {
  const { eventLoading, setEventLoading } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const user = useSelector(getSelf);
  const [initialLoading, setInitialLoading] = useState(true);
  // const { data: totalProductsImages } = useGetImagesForTotalProductsQuery();
  // search similar products from images.
  // useEffect(() => {
  //   if(totalProductsImages && totalProductsImages?.length > 0){
      
  //     (async () => {
  //       await run({userImages : "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png", productsImages : totalProductsImages});
  //     })()
  //   }else return
  // }, [totalProductsImages]);
  console.log("hello ", import.meta.env.VITE_API_URL)
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);

  //! now we get all categories from server using api.
  useEffect(() => {
    (async function getAllCategories() {
      const options = {
        url: `${import.meta.env.VITE_API_URL}/api/v2/common/products/get-categories`,
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
