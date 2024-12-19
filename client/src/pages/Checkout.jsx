import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/cart/Loader";
import LoginChecker from "../components/order/loginChecker";
import Shipping from "../components/order/Shipping";
import { getAllCartItems } from "../store/slices/cart.slice";
import DeliveryChecker from "../components/order/DeliveryChecker";
import OrderSummary from "../components/order/OrderSummary";
import Payment from "../components/order/Payment";
const Checkout = () => {
  
  const cartItems = useSelector(getAllCartItems)
  const {cartTotal} = useLocation().state;
  const [checkLoginClicked, setCheckLoginClicked] = useState(false);
  const [checkDileveryClick , setCheckDileveryClick] = useState(false);
  

  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    appartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const subtotal = cartTotal.subtotal.toFixed(2);
  const total = cartTotal.total.toFixed(2);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(customerInfo);
    // Create data payload for Stripe API
   

    
  };

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div className="container p-4 mx-auto bg-[#e3e2e2] xl:px-10">
      <div className="flex items-center gap-3 2xl:gap-5 xl-gap-4 xl:p-8 md:p-6">
        <span>Home</span>
        <MdArrowForwardIos size={10} />
        <span>My Account</span> <MdArrowForwardIos size={10} />
        <span className="font-semibold">Check Out</span>
      </div>
      <div className="flex flex-col-reverse items-start justify-between lg:flex-row gap-[10px]">
        <div className="w-full flex flex-col gap-[20px] px-2 py-8 lg:w-[75%] md:px-[8] md:py-1">
         
            <LoginChecker 
              setCheckLoginClicked={setCheckLoginClicked} 
              checkLoginClicked={checkLoginClicked}
              />

            <DeliveryChecker 
                setCheckDileveryClick={setCheckDileveryClick}
                checkDileveryClick={checkDileveryClick}
              />

            <OrderSummary
              checkDileveryClick={checkDileveryClick}
            />

            <Payment 
              checkDileveryClick={checkDileveryClick}
            />
          <div className="mb-4 space-y-8">
            <h1 className="text-[18px] font-semibold">Billing Details</h1>
            <form className="space-y-4" onSubmit={() => {}} >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="firstName">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="lastName">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="country">
                    Country / Region*
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    placeholder="Country / Region*"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="company">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={customerInfo.company}
                    onChange={handleInputChange}
                    placeholder="Company (optional)"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="address">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="apt">
                    Apt, suite, unit
                  </label>
                  <input
                    type="text"
                    id="appartment"
                    value={customerInfo.appartment}
                    onChange={handleInputChange}
                    placeholder="apartment, suite, unit, etc. (optional)"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="city">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    placeholder="Town / City"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="state">
                    State*
                  </label>
                  <select
                    id="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  >
                    <option value="">Select a State</option>
                    {usStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="postalCode">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={customerInfo.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <label className="block mb-1 text-[16px]" htmlFor="phone">
                    Phone*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                
                className="px-[16px] py-[12px] bg-[#8A33FD] text-white rounded-lg"
              >
                <a href="#payment-sheet"> Continue to payment</a>
              </button>
            </form>
          </div>
          <Shipping />
           {/* <Payment
              cartItems={cartItems}
              total={total}
              customerInfo={customerInfo}
            /> */}
          
        </div>
        {/** Price summary */}
        <div className="w-full p-6 mt-8 bg-white border-[.5px] rounded-[5px] border-[#39383831] lg:w-1/4 lg:mt-0">
                  <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-800">${cartTotal.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-gray-800">Free</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p className="text-gray-600">Tax</p>
                    <p className="text-gray-800">${cartTotal.tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-6 text-lg font-bold">
                    <p>Total</p>
                    <p>${cartTotal.total.toFixed(2)}</p>
                  </div>
        
                  <Link to={"/checkout"} state={{cartTotal}} >
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
        {/** Order Summary */}
        {/*<div className="w-full lg:w-1/3 md:p-4 lg:mt-0">
          <div className="px-5 py-5 mt-8 border rounded-lg md:py-10">
            <h2 className="mb-2 text-lg font-semibold xl:text-2xl">
              Order Summary
            </h2>
            <div className="my-4 border-t border-gray-300"></div>
            <div className="flex flex-col gap-2 md:gap-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-4">
                  <img src={item.thumbnail} alt={item.title} className="size-12" />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-semibold">{item.title}</span>
                      <p className="font-semibold">
                        {item.colorTag}{""}
                        <span className="font-normal">{item.color || "Green"}</span>
                      </p>
                    </div>
                    <div>
                      <span>
                        {item.price} x {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-300"></div>
              <div className="flex justify-between font-semibold">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">${total}</p>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default Checkout;

