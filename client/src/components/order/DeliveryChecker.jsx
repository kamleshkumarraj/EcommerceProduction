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
  
  
  const allAddress = useSelector(getAllAddress);
  const [selectedButton , setSelectedButton] = useState(null)
  const [clickEdit  , setClickEdit] = useState(null);
  
  const [customerInfo, setCustomerInfo] = useState(selectedAddress);

  const [trackAddr , setTrackAddr] = useState({
      prev : null,
      curr : selectedAddress
    })

    console.log(trackAddr)
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      console.log(id , value)
      setCustomerInfo((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    const usStates = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];
  
  // code for fetching all address from server.
  useEffect(() => {
    fetchAllAddress(dispatch)
  },[user])
  useEffect(() => {
    setSelectedAddress(getSelectedAddress(allAddress) || {})
    setCustomerInfo(getSelectedAddress(allAddress))
    setTrackAddr({curr : getSelectedAddress(allAddress) , prev : null })
  },[allAddress])

  return (
    <div className='bg-white'>
      <div id="delivery-as" className={`w-full   shadow-2xl p-4  ${checkDileveryClick ? 'py-[10px] bg-blue-600' : 'py-[25px] bg-white'} flex justify-between`}>
                  
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

       { checkDileveryClick && <div id="address-show-all" className='w-full px-4 py-[20px] bg-white shadow-2xl'>
            
            {
              allAddress && allAddress.length > 0 && allAddress.map((address) => (<>
                  <div key={address._id}>
                <div className='flex gap-[20px] items-start py-[10px] px-[20px] w-full'  id="addr">
                <div id="input">
                <input className='hover:cursor-pointer'  onChange={(e) => {
                  setSelectedButton(JSON.parse(e.target.value))
                  setClickEdit(null)
                  setCustomerInfo(address)
                }} type="radio" id='radio' name = 'radio' value={JSON.stringify(address)} />
              </div>
                <div id="details" className='flex flex-col gap-[10px]'>
                <h1>
                <b>
                {address?.firstname + " " + address?.lastname } 
                <span className='mx-[10px]' >{address?.mobileNumber}</span></b>
                </h1>
  
                <p className='text-gray-600 font-[400] text-[15px]'>{address['address'] + ", " + address['city'] + ", " + address['subDistrict'] + ", " + address['district'] + ", " + address['state'] + ", " + address['country'] + " - " + address['pinCode']}</p>
                </div>
                <div id="edit" className='ml-auto'>
                  {selectedButton && selectedButton._id == address._id && <p onClick={() => {
                    setClickEdit(address)
                    
                  }} className='text-blue-600 cursor-pointer text-[16px] font-[500]'>EDIT</p>}
                </div>
                
                </div>
               {clickEdit && clickEdit._id == address._id && <AddressForm 
                  customerInfo={customerInfo}
                  handleInputChange={handleInputChange}
                  usStates={usStates}
                  addr={customerInfo}
                  trackAddress={trackAddr}
                  setTrackAddress={setTrackAddr}
                  _id={address._id}
                />}
              </div>
              {selectedButton && selectedButton._id == address._id && !clickEdit &&  <div onClick={() => {
                setTrackAddr({prev : trackAddr.curr , curr : address})
              }} id="button" className=''>
                  <p  className='text-white cursor-pointer text-[16px] font-[500] px-[25px] w-[200px] mx-[55px] my-[5px] py-[12px] bg-[#FB641B]'>DELIVER HERE</p>
                </div>}
                </>
            ))
            }
        
        </div>}
    </div>
  )
}

export default DeliveryChecker
