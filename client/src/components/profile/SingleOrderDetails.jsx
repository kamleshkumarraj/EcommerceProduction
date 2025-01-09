import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Sidebar from "./SideBar";
import { FaTruckArrowRight } from "react-icons/fa6";
import Loader from "../cart/Loader";
import ProductOrderCard from "./ProductOrderCard";
function SingleOrder() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (simulating data fetch or image loading)
    }, 1000);

    return () => clearTimeout(loadContent); // Cleanup timeout on component unmount
  }, []);
  const { orders } = useLocation().state;

  const totalPrice = useMemo(() => {
    return orders?.orderItems.reduce((acc, item) => acc + item.price, 0);
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
        <Loader />
      </div>
    ); // Render Loader component while loading
  }

  return (
    <div className="p-4 md:p-10 xl:p-20">
      <div className="flex items-center gap-2 py-4 lg:px-8">
        <span>Home</span>
        <MdArrowForwardIos size={10} />
        <span>My Account</span> <MdArrowForwardIos size={10} />
        <span className="font-semibold">Check Out</span>
      </div>
      <div className="flex flex-col gap-10 md:flex-row lg:px-8">
        <Sidebar />
        <div
          id="my-order"
          className="w-full p-6 bg-white rounded-lg shadow-lg md:col-start-2 md:col-end-4"
        >
          {/* Header */}
          <div id="heading" className="flex items-center gap-4 mb-6">
            <FaChevronLeft
              size="18px"
              color="#3C4242"
              className="transition-transform transform cursor-pointer hover:scale-110"
            />
            <h1 className="font-dm-sans font-bold text-[2.4rem] text-[#3C4242] leading-tight tracking-tighter">
              Order Details
            </h1>
          </div>

          {/* Order Details Body */}
          <div id="order-details-body" className="space-y-8">
            {/* Order Information */}
            <div className="flex justify-between p-5 border border-gray-200 rounded-lg shadow-md bg-gradient-to-r from-gray-50 via-white to-gray-100">
              <div className="flex flex-col gap-2">
                <h1 className="font-dm-sans font-bold text-[1.8rem] text-[#3C4242]">
                  Order no: {orders?._id}
                </h1>
                <p className="text-[1.4rem] text-gray-600 font-dm-sans">
                  Placed On 2 June 2023 2:40 PM
                </p>
              </div>
              <div className="text-right">
                <p className="font-dm-sans font-bold text-[1.8rem] text-[#3C4242]">
                  Total: <span className="text-blue-600">${totalPrice}</span>
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div id="order-progress-bar" className="relative">
              <div className="relative w-full h-3 overflow-hidden bg-gray-300 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full bg-gradient-to-r from-green-400 to-blue-600"
                  style={
                    orders?.orderStatus == "pending"
                      ? { width: "7%" }
                      : orders?.orderStatus == "confirmed"
                      ? { width: "28%" }
                      : orders?.orderStatus == "Shipped"
                      ? { width: "53%" }
                      : orders?.orderStatus == "out for delivery"
                      ? { width: "78%" }
                      : orders.orderStatus == "delivered"
                      ? { width: "100%" }
                      : { width: "0%" }
                  }
                ></div>
                {/* Progress Steps */}
                <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 -top-2">
                  <FaCheckCircle className="text-white" />
                </div>
                {orders.orderStatus != "Delivered" && (
                  <div
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full   left-[22.5%] -top-2 ${
                      orders.orderStatus != "pending"
                        ? "bg-gradient-to-br from-green-500 to-teal-500"
                        : "bg-gray-400"
                    }`}
                  >
                    <FaCheckCircle className="text-white" />
                  </div>
                )}
                {orders.orderStatus != "Delivered" && (
                  <div
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full  left-[45%] -top-2 ${
                      orders.orderStatus != "pending" &&
                      orders.orderStatus != "Confirmed"
                        ? "bg-gradient-to-br from-green-500 to-teal-500"
                        : "bg-gray-400"
                    }`}
                  >
                    <FaCheckCircle className="text-white" />
                  </div>
                )}
                {orders.orderStatus != "Delivered" && (
                  <div
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full  left-[70%] -top-2 ${
                      orders.orderStatus != "pending" &&
                      orders.orderStatus != "Confirmed" &&
                      orders.orderStatus != "Shipped"
                        ? "bg-gradient-to-br from-green-500 to-teal-500"
                        : "bg-gray-400"
                    }`}
                  >
                    <FaTruckArrowRight />
                  </div>
                )}
                <div
                  className={`absolute flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full left-[95%] -top-2 ${
                    orders.orderStatus == "Delivered"
                      ? "bg-gradient-to-br from-green-500 to-teal-500"
                      : "bg-gray-400"
                  }`}
                >
                  <FaCheckCircle className="text-white" />
                </div>
              </div>
              <div
                id="order-orderStatus"
                className="flex justify-between mt-3 text-[1.4rem] text-gray-700"
              >
                {[
                  "pending",
                  "Confirmed",
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].map((orderStatus, index) => (
                  <p
                    key={index}
                    className={`font-semibold text-center font-dm-sans ${
                      index > 0 ? "pl-[50px] " : ""
                    } `}
                  >
                    {index > 0 && index < 4
                      ? orders.orderStatus != "Delivered" && orderStatus
                      : orderStatus}
                  </p>
                ))}
              </div>
            </div>

            {/* Notification */}
            <div className="relative flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="absolute top-[-10px] left-4 w-4 h-4 bg-white border-t border-l border-gray-300 clip-polygon"></div>
              <p className="mr-4 text-[1.4rem] text-gray-600 font-dm-sans">
                2 June 2023 2:40 PM
              </p>
              <h1 className="font-dm-sans font-bold text-[1.4rem] text-[#3C4242]">
                Your order has been successfully verified.
              </h1>
            </div>

            {/* Order Cards */}
            <div className="space-y-6">
              {orders?.orderItems.map((item, idx) => {
                return <ProductOrderCard key={idx} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
