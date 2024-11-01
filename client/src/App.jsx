import { useEffect } from "react"
import Headers from "./components/Headers"
import { useDispatch } from "react-redux"
import { apiCalling } from "./api/apiCalling.api";
import { setAllCategories, setAllProducts } from "./store/slices/productsHandler.slice";
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

  //! now we get all categories from server using api.
  useEffect(() => {
    (async function getAllCategories() {
      const options = {
        url : "http://localhost:2000//api/v2/products/get-categories",
        method : "GET"
      }
      const response = await dispatch(apiCalling(options))
      if(response?.success){
        console.log("We get all categories successfully")
        dispatch(setAllCategories(response.data))
      }else console.log("We get error during fetching all categories form server !")
    })
  },[])

  return (
    <>
      <div className="font-[roboto]" id="container">
        <Headers />
        <Outlet />
        <Footer />
      </div>
    </>
    
  )
}

export default App
