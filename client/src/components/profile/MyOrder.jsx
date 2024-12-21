import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllOrders, setActiveOrders, setCancelledOrders, setDeliveredOrders, setFailedOrders, setPendingOrders } from "../../store/slices/orderHandler.slice";
import { getSelf } from "../../store/slices/selfHandler.slice";
import OrderDetails from "./OrderDetails";

function MyOrder() {
  const navHandler = (status) => {
    return status
      ? " border-[.5px] border-[#E5E7EB] rounded-[5px]  px-5 py-2 rounded-t-lg shadow-sm transition-transform transform hover:scale-105 duration-300 ease-in-out"
      : "text-gray-600 hover:text-purple-600 px-5 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out";
  };
  const users = useSelector(getSelf)
  const dispatch = useDispatch()
  
  

  const allOrders = useSelector(getAllOrders)
  console.log(allOrders)
  const [orderStatus , setOrderStatus] = useState({
    title : "Pending Orders",
    orders : allOrders?.pending,
    
  });
  
  
  return (
    <div
      id="my-order"
      className="w-full p-8 rounded-lg shadow-xl md:col-start-2 md:col-end-4 bg-gradient-to-b from-white to-gray-50"
    >
      <h1 className="mb-8 text-2xl font-bold leading-tight tracking-tight text-left text-gray-900 font-poppins lg:text-3xl xl:text-4xl">
        My Orders
      </h1>

      <div
        id="order-header"
        className="flex items-center justify-around mb-10 border-b-2 border-gray-200"
      >
      <NavLink
      
      className={({ isActive }) => navHandler(isActive)}
      >
        <p onClick={() => {
          setOrderStatus({title : "Pending Orders" , orders : allOrders.pending})
        }} className="text-lg font-medium font-poppins lg:text-xl xl:text-2xl">
          Pending
        </p>
      </NavLink>
        <NavLink
          
          className={({ isActive }) => navHandler(isActive)}
        >
          <p onClick={() => {
            setOrderStatus({title : "Active Orders" , orders : allOrders.active})
          }}  className="text-lg font-medium font-poppins lg:text-xl xl:text-2xl">
            Active
          </p>
        </NavLink>
        <NavLink
          
          className={({ isActive }) => navHandler(isActive)}
        >
          <p onClick={() => {
            setOrderStatus({title : "Delivered Orders" , orders : allOrders.delivered})
          }}  className="text-lg font-medium font-poppins lg:text-xl xl:text-2xl">
            Delivered
          </p>
        </NavLink>
        <NavLink
          
          className={({ isActive }) => navHandler(isActive)}
        >
          <p onClick={() => {
            setOrderStatus({title : "Completed Orders" , orders : allOrders.complete})
          }}  className="text-lg font-medium font-poppins lg:text-xl xl:text-2xl">
            Completed
          </p>
        </NavLink>
        <NavLink
          
          className={({ isActive }) => navHandler(isActive)}
        >
          <p onClick={() => {
            setOrderStatus({title : "Cancelled Orders" , orders : allOrders.cancelled})
          }} className="text-lg font-medium font-poppins lg:text-xl xl:text-2xl">
            Canceled
          </p>
        </NavLink>
        
      </div>

      <div className="mt-10">
        <OrderDetails title={orderStatus.title} orders={orderStatus.orders}  />
      </div>
    </div>
  );
}

export default MyOrder;
