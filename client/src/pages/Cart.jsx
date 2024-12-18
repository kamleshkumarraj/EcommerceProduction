import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getSelf } from "../store/slices/selfHandler.slice";
import { apiCalling } from "../api/apiCalling.api";
import { decreasedCartQty, getAllCartItems, increaseCartQty, removeCartItems, setAllCarts } from "../store/slices/cart.slice";
import Loader from "../components/cart/Loader";
import CartLoader from "../components/cart/CartLoader";
import FetchingLoading from "../components/cart/FetchingLoading";
import { FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(getSelf);
  const cartItems = useSelector(getAllCartItems);
  const [apiStatus, setApiStatus] = useState(false);
  
  async function getAllCart() {
    setApiStatus(true);
    const options = {
      url: `http://localhost:2000/api/v2/user/cart/get/${user._id}`,
      method: "GET",
    };
    const response = await dispatch(apiCalling(options));
    if (response?.success) {
      dispatch(setAllCarts(response?.data));
    } else {
      console.log("We get error during fetching carts item from database !");
    }
    setApiStatus(false);
  }
  const removeCartItem = async (_id) => {
    const options = {
      url : `http://localhost:2000/api/v2/user/cart/remove/${_id}`,
      method : "DELETE"
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
      toast.success("Product is removed from cart list successfully");
    }else{
      toast.error("We get error during removing product from cart list !");
      getAllCart();
    }
  }
 
  // now we write code for incrementing the cart quantity.
  const increamentCartQty = async (_id) => {
    dispatch(increaseCartQty({_id}));
    const options = {
      url : `http://localhost:2000/api/v2/user/cart/increase/${_id}`,
      method : "PATCH"
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
      toast.success("Quantity is increased by 1");
    }else{
      toast.error("Quantity is not increased !");
      getAllCart();
    }
  }

  const decreamentCartQty = async (_id , qty) => {
    dispatch(decreasedCartQty({_id}))
    
    const options = {
      url : `http://localhost:2000/api/v2/user/cart/decrease/${_id}`,
      method : "PATCH"
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
      if(qty == 1) toast.success("Product is removed from cart list successfully.");
      else toast.success(response?.message || "Quantity is decreased by 1")
    }else{
      
    toast.error(response?.message||"Quantity is not decreased !");
    getAllCart()
    }
  }
 
  //now we call the api for getting all cart from database.
  useEffect(() => {
    getAllCart();
  }, [user]);
  
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
  if (cartItems.length == 0) return <CartLoader />;
  return (
    <div className="bg-white">
      <div className="p-4 my-auto mb-4 bg-gray-200">
        <h1 className="mb-2 text-3xl font-bold text-center">Cart</h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Link to="#" className="hover:underline">
            Ecommerce
          </Link>
          <MdArrowForwardIos size={10} />
          <span className="font-semibold text-black">Cart</span>
        </nav>
      </div>

      <div className="flex flex-col items-start justify-between px-5 lg:flex-row md:px-10">
        {/* Cart Items Section */}
        <div className="flex flex-col w-full lg:w-3/5">
          <h2 className="mb-4 text-lg font-semibold">Your cart</h2>
          <div className="w-full border"></div>

          {apiStatus ? (
            <FetchingLoading />
          ) : (
            cartItems &&
            cartItems.length > 0 &&
            cartItems.map(({ _id, thumbnail, price, quantity, title }) => (
              <div
                key={_id}
                className="flex items-center justify-between py-4 border-b"
              >
                <div id="img" className="w-[150px]">
                  <img className="" src={thumbnail} alt="cart-image" />
                </div>
                <div className="flex-grow px-4">
                  <p className="font-semibold">{title}</p>
                  <p className="text-[14px] text-gray-600">Price : ${price}</p>
                </div>
                <p className="text-lg font-bold lg:pr-[100px]">${price*quantity}</p>
                <div
                  id="quantity"
                  className="flex gap-[1rem] justify-center pr-[1rem] items-center"
                >
                  <div
                    id="decreaseBtn"
                    className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2rem] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                    onClick={() => { decreamentCartQty(_id , quantity)}}
                  >
                    {" "}
                    <FiMinus size={"20px"} />{" "}
                  </div>
                  <p className="text-[18px] font-[600]">{quantity}</p>
                  <div
                    id="increaseBtn"
                    className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2px] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                    onClick={() => { increamentCartQty(_id)}}
                  >
                    <FiPlus size={"20px"} />
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(removeCartItems({_id}))
                    removeCartItem(_id)

                  }}
                  className=" w-[30px] h-[30px] mx-[20px] rounded-[50%] bg-red-500 text-white hover:underline"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full p-6 mt-8 border lg:w-1/4 lg:mt-0">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800">${1002}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">Free</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-800">${34}</p>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold">
            <p>Total</p>
            <p>$23</p>
          </div>

          <Link to={"/checkout"}>
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
