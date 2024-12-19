import React, { useState } from "react";
import frame1 from "../../assets/oscar_image/frame1.png";
import frame2 from "../../assets/oscar_image/frame2.png";
import frame3 from "../../assets/oscar_image/frame3.png";
import frame4 from "../../assets/oscar_image/frame4.png";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentLoader from "../PaymentLoader";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/slices/userHandler.slice";
import axios from "axios";
import { resetAllCards } from "../../store/slices/cardHandler.slice";
import { resetBussinessCart } from "../../store/slices/BussinessCartChangesHandler.slice";

const Payment = ({ cartItems, total, customerInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [showPayNowLoader, setShowPayNowLoader] = useState(false);
  const navigate = useNavigate();
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  console.log(total)
  const emptyCheckout = async () => {
    const options = {
      url: `https://oscar-backend.onrender.com/api/empty-cart/${users._id}`,
      method: "DELETE",
    };
    const response = await axios(options);
    if (response.data?.success) {
      dispatch(resetBussinessCart());
      console.log("We remove all cards successfully");
    } else {
      console.log("We get error while removing all cards !");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    setShowPayNowLoader(true);
    if (!stripe || !elements) {
      setShowPayNowLoader(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setShowPayNowLoader(false);
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: Math.ceil(item.price),
        cartDetails: item.cartDetails,
        image : item.image
      })),
      title : cartItems[0].title,
      totalAmount: Math.ceil(total),
      customer: {
        ...customerInfo,
      },
      paymentMethod: {
        id: paymentMethod.id,
        type: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
      },
    };
   

    try {
      const response = await fetch(
        `https://oscar-backend.onrender.com/create-payment-intent/${users._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    
      if (!response.ok) {
        console.error("Server responded with:", response.statusText);

        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.clientSecret) {
        setShowPayNowLoader(false);
        setClientSecret(data.clientSecret);
        console.log("Payment intent created:", data);
       
        
        // Confirm the payment with Stripe
        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: customerInfo.firstName + " " + customerInfo.lastName,
                email: customerInfo.email,
                address: {
                  line1: customerInfo.address,
                  line2: customerInfo.address,
                  city: customerInfo.city,
                  state: customerInfo.state,
                  postal_code: customerInfo.address.postalCode,
                  country: "IN",
                },
              },
            },
          });

        if (confirmError) {
          setShowPayNowLoader(false);
          console.error("Error confirming payment:", confirmError);
        } else {
          setShowPayNowLoader(false);
          toast.success("Order created successfully !");
          navigate("/successfull-order");
          emptyCheckout();

          // Redirect or handle success (e.g., show success page)
        }
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setShowPayNowLoader(false);
    }
  };

  return (
    <div id="payment-sheet" className="container mx-auto">
      <div>
        <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
        <p className="mb-4 text-gray-600">
          All transactions are secure and encrypted.
        </p>
        <div className="bg-[#F6F6F6] rounded-lg p-8">
          <div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                checked={paymentMethod === "creditCard"}
                onChange={() => setPaymentMethod("creditCard")}
              />
              <div>
                <label
                  htmlFor="creditCard"
                  className="font-semibold cursor-pointer"
                >
                  Credit Card
                </label>
                <p className="text-gray-600">
                  We accept all major credit cards.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 ml-6">
              <img src={frame1} className="2xl:w-[80px] w-[60px]" alt="GPay" />
              <img src={frame2} className="2xl:w-[80px] w-[60px]" alt="Visa" />
              <img
                src={frame3}
                className="2xl:w-[80px] w-[60px]"
                alt="PayPal"
              />
              <img
                src={frame4}
                className="2xl:w-[80px] w-[60px]"
                alt="PayPass"
              />
            </div>
            {/* {paymentMethod === "creditCard" && (
              <div className="grid grid-cols-1 gap-4 mt-4 ml-6 md:grid-cols-2 md:mx-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="p-4 bg-transparent border border-black rounded"
                />
                <input
                  type="text"
                  placeholder="Name of card"
                  className="p-4 bg-transparent border border-black rounded"
                />
                <input
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  className="p-4 bg-transparent border border-black rounded"
                />
                <div className="flex items-center w-full p-2 bg-transparent border border-black rounded">
                  <input
                    type="password"
                    placeholder="Security Code"
                    className="w-full px-2 bg-transparent outline-none"
                  />
                  <span>
                    <MdOutlineRemoveRedEye size={20} />
                  </span>
                </div>
              </div>
            )} */}
            {paymentMethod === "creditCard" && (
              <form onSubmit={handleSubmit} className="mt-4">
                <CardElement className="py-3 my-4 border rounded" />
                <button
                  type="submit"
                  className=" px-4 py-3 bg-[#8A33FD] text-white rounded-lg"
                  disabled={!stripe}
                >
                  {showPayNowLoader ? <PaymentLoader /> : <div>Pay Now</div>}
                </button>
              </form>
            )}
            <div className="w-full my-6 border-t border-gray-300"></div>
          </div>
          <div>
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={() => setPaymentMethod("cashOnDelivery")}
              className="mr-2"
            />
            <label
              htmlFor="cashOnDelivery"
              className="font-semibold cursor-pointer"
            >
              Cash on delivery
            </label>
            <p className="ml-6 text-gray-600">Pay with cash upon delivery.</p>
          </div>
          <div className="w-full my-6 border-t border-gray-300"></div>
          <div>
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
              className="mr-2"
            />
            <label htmlFor="paypal" className="font-semibold cursor-pointer">
              PayPal
            </label>
          </div>
        </div>
      </div>
      <div>
        {/*   <button className="px-4 py-3 mt-8 text-white bg-purple-600 rounded">
          <Link to={"/successfull-order"}>Pay Now</Link>
        </button> */}
      </div>
    </div>
  );
};
Payment.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  customerInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,

    // Add other fields you have in customerInfo
  }).isRequired,
};

export default Payment;

/* import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // You can now send paymentMethod.id to your backend for processing
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="py-3 my-4 border rounded" />
        <button
          type="submit"
          className="px-4 py-3 bg-[#8A33FD] text-white rounded-lg"
          disabled={!stripe}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
 */
