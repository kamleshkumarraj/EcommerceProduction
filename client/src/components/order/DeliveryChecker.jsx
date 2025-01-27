
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddress,
  getSelectedAddress
} from "../../store/slices/addressHandler.slice";
import { getSelf } from "../../store/slices/selfHandler.slice";
import {
  fetchAllAddress,
  fetchUpdateSelectedAddress,
} from "../../utils/address.utils";
import AddressForm from "./AddressForm";
import NewAddressForm from "./NewAddressForm";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DeliveryChecker({
  checkDileveryClick,
  setCheckDileveryClick,
  selectedButton,
  setSelectedButton,
  setCheckSummaryClick,
  setCheckPaymentClick,
  setCheckLoginClicked
}) {
  //direct variable
  const user = useSelector(getSelf);
  const dispatch = useDispatch();
  const allAddress = useSelector(getAllAddress);
  const selectedAddress = useSelector(getSelectedAddress);
  const usStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  //state variable
  const [clickEdit, setClickEdit] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(selectedAddress);
  const [trackAddr, setTrackAddr] = useState({
    selected: selectedAddress,
  });
  const [newAddress, setNewAddress] = useState({
    firstname : "",
    lastname : "",
    address : "",
    city : "",
    subDistrict : "",
    district : "",
    state : "",
    country : "",
    mobileNumber : "",
    pinCode : ""
  })
  const [clickAddButton, setClickAddButton] = useState(false);
  console.log(newAddress)
  // code for fetching all address from server.
  useEffect(() => {
    fetchAllAddress(dispatch);
  }, [user]);
  useEffect(() => {
    setCustomerInfo(selectedAddress);
    setTrackAddr({ selected: selectedAddress });
  }, [allAddress]);

  //for handling input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setCustomerInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //handle new address change
  const handleNewInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setNewAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="bg-white">
      {/**First section where delivery shows*/}
      <div
        id="delivery-as"
        className={`w-full   shadow-2xl p-4  ${
          checkDileveryClick ? "py-[10px] bg-blue-600" : "py-[25px] bg-white"
        } flex justify-between`}
      >
        <div id="delivery-detail" className="flex items-start gap-[10px]">
          <div id="number">
            <p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">
              2
            </p>
          </div>
          <div id="info" className="flex flex-col gap-[7px]">
            <div id="delivery" className="flex items-center gap-[15px]">
              <h1
                className={`text-[17px] ${
                  checkDileveryClick ? "text-white" : "text-gray-400"
                } font-[500] text-gray-400`}
              >
                DELIVERY ADDRESS{" "}
              </h1>
              {!checkDileveryClick && <FaCheck size={20} color="blue" />}
            </div>
            {!checkDileveryClick && (
              <h2>
                {user && (
                  <b>
                    {selectedAddress?.firstname +
                      " " +
                      selectedAddress?.lastname}{" "}
                  </b>
                )}
                {Object.keys(selectedAddress).length > 0 &&
                  selectedAddress["address"] +
                    ", " +
                    selectedAddress["city"] +
                    ", " +
                    selectedAddress["subDistrict"] +
                    ", " +
                    selectedAddress["district"] +
                    ", " +
                    selectedAddress["state"] +
                    ", " +
                    selectedAddress["country"] +
                    " - " +
                    selectedAddress["pinCode"]}
              </h2>
            )}
          </div>
        </div>
        {!checkDileveryClick && (
          <div id="change-button">
            <p
              onClick={() => {
                setCheckDileveryClick(!checkDileveryClick);
                setSelectedButton(selectedAddress);
                setCheckLoginClicked(false)
                setCheckSummaryClick(false)
                setCheckPaymentClick(false)
              }}
              className="px-[30px] py-[10px] text-[16px] font-600 text-blue-600 cursor-pointer hover:text-blue-800 bg-gray-200 border-[1px] border-blue-600 rounded-[5px]"
            >
              CHANGE
            </p>
          </div>
        )}
      </div>

      {/** Here we list all save address */}
      {checkDileveryClick && (
        <div
          id="address-show-all"
          className="w-full px-4 py-[20px] bg-white shadow-2xl"
        >
          {allAddress &&
            allAddress.length > 0 &&
            allAddress.map((address) => (
              <>
                <div key={Math.random()}>
                  <div
                    className="flex gap-[20px] items-start py-[10px] px-[20px] w-full"
                    id="addr"
                  >
                    <div id="input">
                      <input
                        className="hover:cursor-pointer"
                        onChange={(e) => {
                          setSelectedButton(JSON.parse(e.target.value));
                          setClickEdit(null);
                          setCustomerInfo(address);
                          setClickAddButton(false)
                        }}
                        defaultChecked={address._id == customerInfo._id}
                        type="radio"
                        id="radio"
                        name="radio"
                        value={JSON.stringify(address)}
                      />
                    </div>
                    <div id="details" className="flex flex-col gap-[10px]">
                      <h1>
                        <b>
                          {address?.firstname + " " + address?.lastname}
                          <span className="mx-[10px]">
                            {address?.mobileNumber}
                          </span>
                        </b>
                      </h1>

                      <p className="text-gray-600 font-[400] text-[15px]">
                        {address["address"] +
                          ", " +
                          address["city"] +
                          ", " +
                          address["subDistrict"] +
                          ", " +
                          address["district"] +
                          ", " +
                          address["state"] +
                          ", " +
                          address["country"] +
                          " - " +
                          address["pinCode"]}
                      </p>
                    </div>
                    <div id="edit" className="ml-auto">
                      {selectedButton && selectedButton._id == address._id && (
                        <p
                          onClick={() => {
                            setClickEdit(address);
                          }}
                          className="text-blue-600 cursor-pointer text-[16px] font-[500]"
                        >
                          EDIT
                        </p>
                      )}
                    </div>
                  </div>
                  {clickEdit && clickEdit._id == address._id && (
                    <AddressForm
                      customerInfo={customerInfo}
                      handleInputChange={handleInputChange}
                      usStates={usStates}
                      addr={customerInfo}
                      trackAddress={trackAddr}
                      setTrackAddress={setTrackAddr}
                      _id={address._id}
                      setCheckSummaryClick = {setCheckSummaryClick}
                      setCheckDeliveryClick = {setCheckDileveryClick}
                      
                    />
                  )}
                </div>
                {selectedButton &&
                  selectedButton._id == address._id &&
                  !clickEdit && (
                    <div
                      onClick={() => {
                        fetchUpdateSelectedAddress({
                          dispatch,
                          prevAddr: trackAddr.selected,
                          currAddr: address,
                        });
                        setTrackAddr({ selected: address });
                        setCheckDileveryClick(false)
                        setCheckSummaryClick(true)
                      }}
                      id="button"
                      className=""
                    >
                      <p className="text-white cursor-pointer text-[16px] font-[500] px-[25px] w-[200px] mx-[55px] my-[5px] py-[12px] bg-[#FB641B]">
                        DELIVER HERE
                      </p>
                    </div>
                  )}
              </>
            ))}
        </div>
      )}

      {/**No we create options for adding the new address */}

      {checkDileveryClick && !clickAddButton && (
        <div
          onClick={() => {
            setClickAddButton(!clickAddButton)
            // dispatch(resetCurrentAddressStatus({_id : selectedAddress._id}))
            setSelectedButton(null)
          }}
          id="add-addr"
          className={`w-full bg-white  shadow-2xl px-4 py-3 flex mt-[10px] justify-between items-center hover:cursor-pointer`}
        >
          <div id="delivery-detail" className="flex items-center gap-[10px]">
            <div id="number">
              <p className="bg-gray-200 rounded-[5px] px-[10px] text-[20px] font-600 text-blue-600 mt-[2px]">
                +
              </p>
            </div>
            <div id="info" className="flex flex-col gap-[7px]">
              <div id="delivery" className="flex items-center gap-[15px]">
                <h1 className={`text-[17px]  font-[500] text-gray-400`}>
                  Add Address{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/**Add new Address Form */}
      {clickAddButton &&
        
        <div id="new-add-form" className="flex flex-col gap-[20px] py-[20px] px-[35px] bg-[#ffffff71]">
          <div id="heading" className="flex gap-[30px]">
            <input name="radio" defaultChecked= {true} type="radio" id="radio" />
            <p className="text-[18px] font-[500] text-gray-600">Add Addresses</p>
          </div>
          <NewAddressForm 
            handleInputChange={handleNewInputChange}
            usStates={usStates}
            addr={newAddress}
            setCheckSummaryClick = {setCheckSummaryClick}
            setCheckDeliveryClick = {setCheckDileveryClick}
            setClickAddButton = {setClickAddButton}
          />
        </div>
      }
    </div>
  );
}
DeliveryChecker.propTypes = {
  checkDileveryClick: PropTypes.bool,
  setCheckDileveryClick: PropTypes.func,
  setCheckSummaryClick: PropTypes.func,
  selectedButton: PropTypes.number,
  setSelectedButton: PropTypes.func,
};
export default DeliveryChecker;
