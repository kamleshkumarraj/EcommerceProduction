import React from 'react'

function Payment({checkDileveryClick}) {
  return (
    <div>
    <div id="delivery-as" className={`w-full bg-white  shadow-2xl p-4  ${checkDileveryClick ? 'py-[10px] bg-blue-600' : 'py-[12px]'} flex justify-between`}>

                      
    <div id="delivery-detail" className="flex items-start gap-[10px]">
      <div id="number"><p className="bg-gray-200 rounded-[5px] px-[10px] text-[16px] font-600 text-blue-600 mt-[2px]">4</p></div>
      <div id="info" className='flex flex-col gap-[7px]'>
      <div id="delivery" className="flex items-center gap-[15px]">
      <h1 className={`text-[17px] ${checkDileveryClick ? 'text-white' : 'text-gray-400'} font-[500] text-gray-400`}>PAYMENT OPTIONS </h1>
      
      </div>
  </div>
  </div>
  </div>
    </div>
  )
}

export default Payment
