import { useEffect } from "react"
import Headers from "./components/Headers"
import { useDispatch } from "react-redux"
import { apiCalling } from "./api/apiCalling.api";
import { setAllCategories, setAllProducts, setDiscountedProducts, setLatestProducts, setTopRatedProducts } from "./store/slices/productsHandler.slice";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  //! first we get all products calling the api and store our data in store.
  useEffect(() => {
    (async function getAllProducts() {
      const options = {
        method : "GET",
        url : "http://localhost:2000/api/v2/admin/products"
      }
      const response = await dispatch(apiCalling(options))
      if(response?.success){
        dispatch(setAllProducts(response.data))
        dispatch(setTopRatedProducts(response?.data?.slice(0, 40)));
        dispatch(setLatestProducts(response?.data?.slice(55, 70)));
        dispatch(setDiscountedProducts(response?.data?.slice(70, 90)));}
      else console.log("Error during geting all products")
      
    })()
  },[])

  //! now we get all categories from server using api.
  useEffect(() => {
    (async function getAllCategories() {
      const options = {
        url : "http://localhost:2000/api/v2/products/get-categories",
        method : "GET"
      }
      const response = await dispatch(apiCalling(options))
      if(response?.success){
        console.log("We get all categories successfully")
        dispatch(setAllCategories(response.data))
        

      }else console.log("We get error during fetching all categories form server !")
    })()
  },[])

  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} 
      
      />
    {/* Same as */}
    
      <div className="font-[roboto]" id="container">
        <Headers />
        <Outlet />
        <Footer />
      </div>
      <ToastContainer />
    </>
    
  )
}

export default App
