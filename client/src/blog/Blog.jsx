import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import FooterM from "../components/FooterM";
import { getAllBlogs } from "../store/slices/blog.slice";
import { fetchAllBlogs } from "../utils/blog.utils";
import Header from "./components/header/Header";
import { getSelf } from "../store/slices/selfHandler.slice";


function BlogApp() {
  const body = document.querySelector('#blog-root')
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllBlogs({dispatch})
  },[])

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
