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
      <div className="flex">
        <Sidebar />
        <div className="w-full px-[10px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
