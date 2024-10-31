import { useEffect } from "react"
import Headers from "./components/Headers"
import { useDispatch } from "react-redux"
import { apiCalling } from "./api/apiCalling.api";
import { setAllProducts } from "./store/slices/productsHandler.slice";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

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
      if(response?.success)
        dispatch(setAllProducts(response.data))
      else console.log("Error during geting all products")
      
    })()
  },[])

  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
    
  )
}

export default App
