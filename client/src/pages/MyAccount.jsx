// import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/SideBar";

  
const MyAccount = () => {
  

  return (
    <div className="py-[40px]">
      <div className="flex ">
        <Sidebar />
        <div className="w-full px-[30px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
