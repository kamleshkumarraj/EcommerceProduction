import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import CartLoader from "./CartLoader";


const Cart = () => {
    const [loading , setLoading] = useState(true)
  useEffect(() => {
    const loadContent = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (simulating data fetch or image loading)
    }, 1000);

    return () => clearTimeout(loadContent); // Cleanup timeout on component unmount
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
        <Loader />
      </div>
    ); // Render Loader component while loading
  }

  return (
    <div>
      <div className="p-10 mb-8 bg-gray-200">
        <h1 className="mb-2 text-3xl font-bold">Cart</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="#" className="hover:underline">
            Ecommerce
          </Link>
          <MdArrowForwardIos size={10} />
          <span className="font-semibold text-black">Cart</span>
        </nav>
      </div>

      <div className="flex flex-col justify-between px-5 lg:flex-row md:px-10">
        {/* Cart Items Section */}
        <div className="flex flex-col w-full lg:w-3/5">
          <h2 className="mb-4 text-lg font-semibold">Your cart</h2>
          <div className="w-full border"></div>

          { apiStatus ? <CartLoader /> :  cartItems && cartItems.length > 0 && cartItems.map(
            ({ _id ,  image , price , quantity}) => (
              <div
                key={_id}
                className="flex items-center justify-between py-4 border-b"
              >
                
                <div id="img" className="w-[150px]"> 
                  <img className="" src={image} alt="cart-image" />
                </div>
                <div className="flex-grow px-4">
                  <p className="font-semibold">{'Card'}</p>
                  <p className="text-sm text-gray-600">
                     Size: {'3x2.5'}
                  </p>
                </div>
                <p className="text-lg font-bold lg:pr-[100px]">
                  ${price}
                </p>
                <div className="flex items-center">
                
                  <input
                    type="text"
                    className="text-center text-black border "
                    value={quantity}
                  />
                 
                </div>
                <button
                  onClick={() => {
                    removeCart(_id);
                  }}
                  className="px-2 py-1 text-red-500 hover:underline"
                >
                  X
                </button>
              </div>
            )
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full p-6 mt-8 border lg:w-1/4 lg:mt-0">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">Free</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-800">${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

           <Link to={"/checkout"}  >
            <button className="w-full py-3 bg-black text-white font-semibold mb-4 rounded-[8px]">
              Checkout
            </button>
          </Link> 

          <Link
            to="/business-browse"
            className="flex justify-center text-center text-blue-500 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
