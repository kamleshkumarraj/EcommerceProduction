import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAddress } from "../../store/slices/addressHandler.slice";
import { fetchCreateOrder } from "../../utils/order";
import { fetchRemoveMultipleCartItems } from "../../utils/cart.utils";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  useCheckoutOrderMutation,
  useLazyGetRazorAPIKeyQuery,
} from "../../store/slices/userApi";
import { getSelf } from "../../store/slices/selfHandler.slice";

function Payment({ checkPaymentClick, orderItems, cartTotal }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const selectedAddress = useSelector(getSelectedAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getSelf)
  const payload = useMemo(() => {
    const orderItem = orderItems?.map((item) => {
      return {
        name: item?.title,
        price: item?.price,
        image: item?.thumbnail,
        quantity: item?.quantity,
        productId: item?.productId,
      };
    });
    return {
      orderItems: orderItem,
      shippingInfo: selectedAddress?._id,
      itemsPrice: cartTotal?.subTotal,
      taxPrice: cartTotal?.tax,
      totalPrice: cartTotal?.total,
      orderStatus: "pending",
      paymentMethod,
    };
  }, [paymentMethod, orderItems, cartTotal, selectedAddress]);

  const deletableProducts = orderItems?.map((order) => order?._id);
  const [createOrderOnRazor] = useCheckoutOrderMutation();
  const [getRazorApiKey] = useLazyGetRazorAPIKeyQuery();

  const checkoutProducts = async () => {
    const {data : razor_key} = await getRazorApiKey();
    const response = await createOrderOnRazor({amount : 5000});
    console.log(response, razor_key);

    var options = {
      "key": razor_key, // Enter the Key ID generated from the Dashboard
      "amount": response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "My Ecomart Platform",
      "description": "Test Transaction",
      "image": user?.avatar?.url,
      "order_id": response.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:2000/api/v2/user/order/verify-order",
      "prefill": {
          "name": user?.firstname + " " + user?.lastname,
          "email": user?.email,
          "contact": "8603416388"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open()
  };
  return (
    <div>
      <div
        id="delivery-as"
        className={`w-full   shadow-2xl p-4  ${
          checkPaymentClick ? "py-[10px] bg-blue-600" : "py-[12px] bg-white"
        } flex justify-between`}
      >
        <div id="delivery-detail" className="flex items-start gap-[10px]">
          <div id="number">
            <p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">
              4
            </p>
          </div>
          <div id="info" className="flex flex-col gap-[7px]">
            <div id="delivery" className="flex items-center gap-[15px]">
              <h1
                className={`text-[17px] ${
                  checkPaymentClick ? "text-white" : "text-gray-400"
                } font-[500] text-gray-400`}
              >
                PAYMENT OPTIONS{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {checkPaymentClick && (
        <div
          id="order-method"
          className="flex flex-col gap-[15px] px-8 py-4 bg-white"
        >
          <div id="meth-1" className="flex gap-[20px]">
            <input
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              name="payment-method"
              value={"cash"}
              type="radio"
            />
            <h1 className="text-[16px] font-[500] text-gray-600">
              Cash on Delivery
            </h1>
          </div>
          <div id="meth-1" className="flex gap-[20px]">
            <input
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              type="radio"
              value={"online"}
              name="payment-method"
            />
            <h1 className="text-[16px] font-[500] text-gray-600">Pay Online</h1>
          </div>
        </div>
      )}

      {paymentMethod == "cash" ||
        (paymentMethod == "online" && (
          <div
            id="place-rder-button"
            className="flex px-4 py-2 bg-white mt-[10px] justify-between items-center"
          >
            <h1 className="text-[16px] font-[500] text-gray-600">
              After clicking the confirm order your order will be confirmed.
            </h1>
            <p
              onClick={() => {
                if (paymentMethod == "cash") {
                  fetchCreateOrder({ dispatch, payload });
                  fetchRemoveMultipleCartItems({
                    dispatch,
                    cartIdList: deletableProducts,
                  });
                  navigate("/order-confirmation");
                } else if (paymentMethod == "online") {
                  checkoutProducts();
                }
              }}
              className="px-[60px] py-[15px] bg-[#FB641B] text-center text-white font-700 text-[18px] cursor-pointer hover:bg-[#FB641B] hover:text-white"
            >
              CONFIRM ORDER
            </p>
          </div>
        ))}
    </div>
  );
}

Payment.propTypes = {
  checkPaymentClick: PropTypes.bool,
  orderItems: PropTypes.array,
  cartTotal: PropTypes.object,
};

export default Payment;
