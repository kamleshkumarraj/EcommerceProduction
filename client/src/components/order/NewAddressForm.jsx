import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelf } from "../../store/slices/selfHandler.slice";
import {
  fetchUpdateAddress,
  fetchUpdateSelectedAddress,
} from "../../utils/address.utils";

function NewAddressForm({
  addr,
  handleInputChange,
  usStates,
  setCheckSummaryClick,
  setCheckDeliveryClick,
  trackAddress,
  setTrackAddress,
  setClickAddButton,
}) {
  const dispatch = useDispatch();
  return (
    <div className="px-[50px] py-[10px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="firstName">
            First Name*
          </label>
          <input
            type="text"
            id="firstname"
            value={addr?.firstname}
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
            id="lastname"
            value={addr?.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="address">
            Address*
          </label>
          <input
            type="text"
            id="address"
            value={addr?.address}
            onChange={handleInputChange}
            placeholder="Country / Region*"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="company">
            City*
          </label>
          <input
            type="text"
            id="city"
            value={addr?.city}
            onChange={handleInputChange}
            placeholder="Company (optional)"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="address">
            Sub District
          </label>
          <input
            type="text"
            id="subDistrict"
            value={addr?.subDistrict}
            onChange={handleInputChange}
            placeholder="House number and street name"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="apt">
            District*
          </label>
          <input
            type="text"
            id="district"
            value={addr?.district}
            onChange={handleInputChange}
            placeholder="apartment, suite, unit, etc. (optional)"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="state">
            State*
          </label>
          <select
            id="state"
            value={addr?.state}
            onChange={handleInputChange}
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          >
            <option value="">Select a State</option>
            {usStates.map((state, index) => (
              <option
                selected={state === addr?.state}
                key={index}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-[16px]" htmlFor="city">
            Country*
          </label>
          <input
            type="text"
            id="country"
            value={addr?.country}
            onChange={handleInputChange}
            placeholder="Town / City"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-[16px]" htmlFor="postalCode">
            Postal Code*
          </label>
          <input
            type="text"
            id="pinCode"
            value={addr?.pinCode}
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
            id="mobileNumber"
            value={addr?.mobileNumber}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
          />
        </div>
      </div>
      <div id="div" className="flex my-[20px] items-center">
        <div className="px-[16px] hover:cursor-pointer py-[12px] bg-[#FB641B] text-white ">
          <p
            onClick={() => {
              setCheckSummaryClick(true);
              setCheckDeliveryClick(false);
              setClickAddButton(false);
            }}
          >
            ADD AND DELIVER HERE
          </p>
        </div>
        <div>
          <p className="mx-[30px] font-[500] text-[17px] hover:cursor-pointer text-blue-600">
            CANCEL
          </p>
        </div>
      </div>
    </div>
  );
}
export default NewAddressForm;
