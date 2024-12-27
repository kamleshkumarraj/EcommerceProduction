import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import FooterM from "../components/FooterM";


function BlogApp() {
  const body = document.querySelector('#blog-root')

 
  
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
