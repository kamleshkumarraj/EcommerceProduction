import React from 'react'
import { FaCheck } from 'react-icons/fa6'

function DeliveryChecker({checkDileveryClick , setCheckDileveryClick}) {
  return (
    <div>
      <div id="delivery-as" className={`w-full bg-white  shadow-2xl p-4  ${checkDileveryClick ? 'py-[10px] bg-[blue]' : 'py-[25px]'} flex justify-between`}>
                  
          <div id="delivery-detail" className="flex items-start gap-[10px]">
            <div id="number"><p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">2</p></div>
            <div id="info" className='flex flex-col gap-[7px]'>
            <div id="delivery" className="flex items-center gap-[15px]">
            <h1 className={`text-[17px] ${checkDileveryClick ? 'text-white' : 'text-gray-400'} font-[500] text-gray-400`}>DELIVERY ADDRESS </h1>
            {!checkDileveryClick && <FaCheck size={20} color="blue" />}
            </div>
            {!checkDileveryClick && <h2><b>Kamlesh Raj Kushwaha</b> Thengpur, Bahdinpur, Paroo, Muzaffarpur, Bihar - <b>843112</b></h2>}
            </div>
          </div>            
          {!checkDileveryClick && <div id="change-button">
            <p onClick={() => setCheckDileveryClick(!checkDileveryClick)}  className="px-[30px] py-[10px] text-[16px] font-600 text-blue-600 cursor-pointer hover:text-blue-800 bg-gray-200 border-[1px] border-blue-600 rounded-[5px]">CHANGE</p>
          </div>}
      
          
            
        </div>
    </div>
  )
}

export default DeliveryChecker
