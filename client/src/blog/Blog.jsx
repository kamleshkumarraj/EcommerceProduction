import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import FooterM from "../components/FooterM";
import { useEffect } from "react";
import { fetchAllBlogs } from "../utils/blog.utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../store/slices/blog.slice";
import CategoryCard from "./components/card/CategoryCard";


function BlogApp() {
  const body = document.querySelector('#blog-root')
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllBlogs({dispatch})
  },[])

  const allBlogs = useSelector(getAllBlogs) || []
 
  
  return (
    <>
    <div className="relative wrapper bg-[#0f172a] text-white " id="blog-root" >
          <Header />
          
          <Outlet />
          <FooterM />
      </div>
    </>
  );
}

export default BlogApp;
