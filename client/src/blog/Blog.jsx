import { Outlet } from "react-router-dom";
import FooterM from "../components/FooterM";
import Header from "./components/header/Header";


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
