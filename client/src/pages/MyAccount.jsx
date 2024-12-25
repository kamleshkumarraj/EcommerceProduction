// import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/profile/SideBar";
import { useSelector } from "react-redux";
import { getSelf } from "../store/slices/selfHandler.slice";
import { useEffect } from "react";

  
const MyAccount = () => {
    const user = useSelector(getSelf);
    
    

  return (
    <div className="py-[40px]">
      <div className="relative flex h-[85vh] ">
        <div id="side-bar" className="w-full md:w-[40%] mb-8 sticky top-0 ml-[50px]">
          <Sidebar />
        </div>
        <div style={{
          scrollbarWidth : 'none'
        }} className="w-full px-[10px] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
