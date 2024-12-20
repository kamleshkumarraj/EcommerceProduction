import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllAddress } from '../../utils/address.utils'
import { getAllAddress } from '../../store/slices/addressHandler.slice'
import { getSelf } from '../../store/slices/selfHandler.slice'
import { getSelectedAddress } from '../../helper/helper'
import AddressForm from './AddressForm'

function DeliveryChecker({checkDileveryClick , setCheckDileveryClick}) {
  const user = useSelector(getSelf)
  const dispatch = useDispatch()
  const [selectedAddress , setSelectedAddress] = useState({});
  
  const [selectedButton , setSelectedButton] = useState(null)
  const allAddress = useSelector(getAllAddress);
  const [clickEdit  , setClickEdit] = useState(null);
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
  
  // code for fetching all address from server.
  useEffect(() => {
    fetchAllAddress(dispatch)
  },[user])
  useEffect(() => {
    setSelectedAddress(getSelectedAddress(allAddress) || {})
  },[allAddress])

  return (
    <div className='bg-white'>
      <div id="delivery-as" className={`w-full bg-white  shadow-2xl p-4  ${checkDileveryClick ? 'py-[10px] bg-[#2874F0]' : 'py-[25px]'} flex justify-between`}>
                  
          <div id="delivery-detail" className="flex items-start gap-[10px]">
            <div id="number"><p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">2</p></div>
            <div id="info" className='flex flex-col gap-[7px]'>
            <div id="delivery" className="flex items-center gap-[15px]">
            <h1 className={`text-[17px] ${checkDileveryClick ? 'text-white' : 'text-gray-400'} font-[500] text-gray-400`}>DELIVERY ADDRESS </h1>
            {!checkDileveryClick && <FaCheck size={20} color="blue" />}
            </div>
            {!checkDileveryClick && <h2>
                
                  {user && <b>{user?.firstname + " " + user?.lastname} </b>}
                  {Object.keys(selectedAddress).length > 0 && selectedAddress['address'] + ", " + selectedAddress['city'] + ", " + selectedAddress['subDistrict'] + ", " + selectedAddress['district'] + ", " + selectedAddress['state'] + ", " + selectedAddress['country'] + " - " + selectedAddress['pinCode']}
                
              </h2>}
            </div>
          </div>            
          {!checkDileveryClick && <div id="change-button">
            <p onClick={() => setCheckDileveryClick(!checkDileveryClick)}  className="px-[30px] py-[10px] text-[16px] font-600 text-blue-600 cursor-pointer hover:text-blue-800 bg-gray-200 border-[1px] border-blue-600 rounded-[5px]">CHANGE</p>
          </div>}
      
          
            
        </div>

        <div id="address-show-all" className='w-full px-4 py-[20px] bg-white shadow-2xl'>
            
            {
              allAddress && allAddress.length > 0 && allAddress.map((address) => (<>
                  <div key={address._id}>
                <div className='flex gap-[20px] items-start py-[10px] px-[20px] w-full'  id="addr">
                <div id="input">
                <input   onChange={(e) => setSelectedButton(JSON.parse(e.target.value))} type="radio" id='radio' name = 'radio' value={JSON.stringify(address)} />
              </div>
                <div id="details" className='flex flex-col gap-[10px]'>
                <h1>
                <b>
                {user?.firstname + " " + user?.lastname } 
                <span className='mx-[10px]' >{address?.mobileNumber}</span></b>
                </h1>
  
                <p className='text-gray-600 font-[400] text-[15px]'>{address['address'] + ", " + address['city'] + ", " + address['subDistrict'] + ", " + address['district'] + ", " + address['state'] + ", " + address['country'] + " - " + address['pinCode']}</p>
                </div>
                <div id="edit" className='ml-auto'>
                  {selectedButton && selectedButton._id == address._id && <p onClick={() => setClickEdit(address)} className='text-blue-600 cursor-pointer text-[16px] font-[500]'>EDIT</p>}
                </div>
                
                </div>
               {clickEdit && clickEdit._id == address._id && <AddressForm 
                  customerInfo={customerInfo}
                  handleInputChange={handleInputChange}
                  usStates={usStates}
                />}
              </div>
              {!clickEdit && selectedButton && selectedButton._id == address._id &&  <div id="button" className=''>
                  <p className='text-white cursor-pointer text-[16px] font-[500] px-[25px] w-[200px] mx-[55px] my-[5px] py-[12px] bg-[#FB641B]'>DELIVER HERE</p>
                </div>}
                </>
            ))
            }
        
        </div>
    </div>
  )
}

export default DeliveryChecker
