import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAddress } from "../../store/slices/addressHandler.slice";
import { fetchCreateOrder } from "../../utils/order";

function Payment({ checkPaymentClick , orderItems , cartTotal }) {
  const [paymentMethod , setPaymentMethod] = useState('')
  const selectedAddress = useSelector(getSelectedAddress)
  const dispatch = useDispatch();
  
  const payload = useMemo(() => {
    const orderItem = orderItems?.map((item) => {
      return {
        name : item?.title,
        price : item?.price,
        image : item?.thumbnail,
        quantity : item?.quantity,
        productId : item?.productId
      }
    })
    return {orderItems : orderItem , shippingInfo : selectedAddress?._id , itemsPrice : cartTotal?.subTotal , taxPrice : cartTotal?.tax , totalPrice : cartTotal?.total , orderStatus : 'pending' , paymentMethod}
  },[paymentMethod , orderItems , cartTotal , selectedAddress])

  const deletableProducts =  orderItems?.map((order) => order?._id)
  
  console.log(deletableProducts)
  console.log(payload)
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
      {checkPaymentClick && 
        <div id="order-method" className="flex flex-col gap-[15px] px-8 py-4 bg-white">
          <div  id="meth-1" className="flex gap-[20px]">
                <input onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }} name="payment-method" value={'cash'} type="radio" />
                <h1  className="text-[16px] font-[500] text-gray-600" >Cash on Delivery</h1>
          </div>
          <div id="meth-1" className="flex gap-[20px]">
                <input onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }} type="radio" value={'online'} name="payment-method" />
                <h1 className="text-[16px] font-[500] text-gray-600" >Pay Online</h1>
          </div>
          
      </div>}

      {paymentMethod == 'cash' && <div id="place-rder-button" className="flex px-4 py-2 bg-white mt-[10px] justify-between items-center">
        <h1 className="text-[16px] font-[500] text-gray-600">After clicking the confirm order your order will be confirmed.</h1>
        <p onClick={() => {
          fetchCreateOrder({dispatch , payload})
        }}  className="px-[60px] py-[15px] bg-[#FB641B] text-center text-white font-700 text-[18px] cursor-pointer hover:bg-[#FB641B] hover:text-white" >CONFIRM ORDER</p>
  </div>}
    </div>
  );
}

export default Payment;
