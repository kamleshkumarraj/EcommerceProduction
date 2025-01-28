import { useEffect, useMemo, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/cart/Loader";
import DeliveryChecker from "../components/order/DeliveryChecker";
import OrderSummary from "../components/order/OrderSummary";
import Payment from "../components/order/Payment";
import LoginChecker from '../components/order/LoginChecker'
import {
  getAllAddress,
  getSelectedAddress,
} from "../store/slices/addressHandler.slice";
import { getAllCartItems } from "../store/slices/cart.slice";
import {
  getAllOrderedProducts,
  resetOrderProductsStore,
  setOrderedProducts,
} from "../store/slices/orderItems";
const Checkout = () => {
  const cartItems = useSelector(getAllCartItems);
  
  // all state for related from open and close the all buttons.
  const [checkLoginClicked, setCheckLoginClicked] = useState(false);
  const [checkDileveryClick, setCheckDileveryClick] = useState(true);
  const [checkSummaryClick, setCheckSummaryClick] = useState(false);
  const [checkPaymentClick, setCheckPaymentClick] = useState(false);
  
  const [selectedButton, setSelectedButton] = useState(null);
  const dispatch = useDispatch();
  const address = useSelector(getAllAddress);
  const selectedAddress = useSelector(getSelectedAddress);
  const orderedProducts = useLocation().state?.orderedProducts || null;

  const orderedProduct = useSelector(getAllOrderedProducts);

  const cartTotal = useMemo(() => {
    const subTotal = orderedProduct?.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    const tax = subTotal * 0.03;
    const total = subTotal + tax;
    return {
      subTotal: subTotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  }, [orderedProduct]);

  useEffect(() => {
    setSelectedButton(selectedAddress);
  }, [address]);
  useEffect(() => {
    dispatch(setOrderedProducts(orderedProducts || cartItems.filter((product) => product.availabilityStatus == "available")));
    return () => dispatch(resetOrderProductsStore());
  }, [cartItems]);

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

  return (
    <div className="container p-4 mx-auto bg-[#e3e2e2] xl:px-10">
      <div className="flex items-center gap-3 2xl:gap-5 xl-gap-4 xl:p-[3.2rem] md:p-6">
        <span>Home</span>
        <MdArrowForwardIos size={10} />
        <span>My Account</span> <MdArrowForwardIos size={10} />
        <span className="font-semibold">Check Out</span>
      </div>
      <div className="flex flex-col-reverse items-start justify-between lg:flex-row gap-[10px]">
        <div className="w-full flex flex-col gap-[20px] px-2 py-8 lg:w-[75%] md:px-[8] md:py-1">
          <LoginChecker
            key={1}
            setCheckLoginClicked={setCheckLoginClicked}
            checkLoginClicked={checkLoginClicked}
            setCheckDileveryClick={setCheckDileveryClick}
            setCheckPayemntClick={setCheckPaymentClick}
            setCheckSummaryClick={setCheckSummaryClick}
            setSelectedButton={setSelectedButton}
          />

          <DeliveryChecker
            key={2}
            setCheckDileveryClick={setCheckDileveryClick}
            checkDileveryClick={checkDileveryClick}
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
            setCheckSummaryClick={setCheckSummaryClick}
            setCheckPaymentClick={setCheckPaymentClick}
            setCheckLoginClicked={setCheckLoginClicked}
          />

          <OrderSummary
            key={3}
            checkDileveryClick={checkDileveryClick}
            checkSummaryClick={checkSummaryClick}
            setCheckPayemntClick={setCheckPaymentClick}
            setCheckSummaryClick={setCheckSummaryClick}
          />

          <Payment
            key={4}
            checkPaymentClick={checkPaymentClick}
            cartTotal={cartTotal}
            orderItems={orderedProduct}
          />
        </div>
        {/** Price summary */}
        <div className="w-full p-6 mt-8 bg-white border-[.5px] rounded-[5px] border-[#39383831] lg:w-1/4 lg:mt-0">
          <h2 className="mb-4 text-[1.8rem] font-semibold">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800">${cartTotal?.subTotal}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">Free</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-800">${cartTotal?.tax}</p>
          </div>
          <div className="flex justify-between mb-6 text-[1.8rem] font-bold">
            <p>Total</p>
            <p>${cartTotal?.total}</p>
          </div>

          <Link to={"/checkout"} state={{ cartTotal }}>
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
            <h2 className="mb-2 text-[1.8rem] font-semibold xl:text-[2.4rem]">
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
