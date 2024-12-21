import React, { useEffect } from 'react'
import { FaCheck, FaTruckArrowRight } from 'react-icons/fa6'
import { IoMdNotifications } from 'react-icons/io'
import { MdOutlineStarPurple500 } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { getAllAddress, getSelectedAddress } from '../../store/slices/addressHandler.slice'

function LoginChecker({checkLoginClicked , setCheckLoginClicked , setCheckDileveryClick , setSelectedButton}) {
  
  const selectedAddress = useSelector(getSelectedAddress)
  console.log(checkLoginClicked)
  return (
    <div>
    <div id="login-as" className={`w-full   shadow-2xl p-4  ${checkLoginClicked ? 'py-[10px] bg-[blue]' : 'py-[25px] bg-white'} flex justify-between`}>
            
    <div id="login-detail" className="flex items-start gap-[15px]">
      <div id="number"><p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">1</p></div>
      <div id="info" className='flex flex-col gap-[7px]'>
      <div id="login" className="flex gap-[15px]">
      <h1 className={`text-[17px] ${checkLoginClicked ? 'text-white' : 'text-gray-400'} font-[500] text-gray-400`}>LOGIN </h1>
      {!checkLoginClicked && <FaCheck size={20} color="blue" />}
      </div>
      {!checkLoginClicked && <h2><b>Kamlesh Raj Kushwaha</b> kamlesh.22jics061@jietjodhpur.ac.in</h2>}
      </div>
    </div>            
    {!checkLoginClicked && <div id="change-button">
      <p onClick={() => 
        {setCheckLoginClicked(!checkLoginClicked)
          setSelectedButton(selectedAddress)
          setCheckDileveryClick(false)
        }}  className="px-[30px] py-[10px] text-[16px] font-600 text-blue-600 cursor-pointer hover:text-blue-800 bg-gray-200 border-[1px] border-blue-600 rounded-[5px]">CHANGE</p>
    </div>}

    
      
  </div>
  {checkLoginClicked && <div id="login-details-change" className="grid grid-cols-2 p-8 px-12 bg-white shadow-2xl gap-x-[100px]">
      <div id="user">
        <div id="name" className="flex gap-[20px]">
        <h1 className="text-[16px] text-gray-400 font-[500]">Name</h1>
        <p className="text-[15px] font-600">Kamlesh Kumar</p>
        </div>
        <div id="email" className="flex gap-[20px] mt-[10px]">
          <h1 className="text-[16px] text-gray-400 font-[500]" >Email</h1>
          <p className="text-[15px] font-600" >Kamlesh.22jics061@jietjodhpur.ac.in</p>
        </div>
        <div id="logout">
          <p className="my-[20px] text-[18px] font-600 text-blue-600 cursor-pointer hover:text-blue-800">Logout & Sign in to another account</p>
        </div>
        <div id="checkout-btn" onClick={() => {
          setCheckLoginClicked(!checkLoginClicked)
          setCheckDileveryClick(true)
          
        }
          } >
          <p className="px-[40px] py-[15px] bg-[#FB641B] text-center text-white font-700 text-[18px] cursor-pointer hover:bg-[#FB641B] hover:text-white">{"Continue to Checkout".toUpperCase()}</p>
        </div>
      </div>

      <div id="detail" className="flex flex-col gap-[20px]">
        <h1 className="text-[15px] font-[500] text-gray-500">Advantages of our secure login</h1>
        <div id="ad-1" className="flex gap-[15px]">
          <FaTruckArrowRight size={20} color="blue"/>
          <h1>Easily track orders, Hassle free returns</h1>
        </div>
        <div id="ad-1" className="flex gap-[15px]">
          <IoMdNotifications size={20} color="blue"/>
          <h1>Get relevant Alerts and Recommendation</h1>
        </div>
        <div id="ad-1" className="flex gap-[15px]">
          <MdOutlineStarPurple500 size={20} color="blue"/>
          <h1>Wishlist, Reviews, Rating snd more.</h1>
        </div>
      </div>

      <h1 className="col-span-2 mt-[30px] text-gray-500">Please note that upon clicking "Logout" you will loose all items in carts and redirect to our Shopify Home page.</h1>
    
    </div>}
    </div>
  )
}

export default LoginChecker
