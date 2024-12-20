import React from 'react'

function AddressForm({customerInfo , handleInputChange , usStates}) {
  return (
    <div className='px-[50px] py-[10px]'>
   
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="firstName">
          First Name*
        </label>
        <input
          type="text"
          id="firstName"
          value={customerInfo.firstName}
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
          id="lastName"
          value={customerInfo.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="country">
          Country / Region*
        </label>
        <input
          type="text"
          id="country"
          value={customerInfo.country}
          onChange={handleInputChange}
          placeholder="Country / Region*"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="company">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          value={customerInfo.company}
          onChange={handleInputChange}
          placeholder="Company (optional)"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-8">
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="address">
          Street Address*
        </label>
        <input
          type="text"
          id="address"
          value={customerInfo.address}
          onChange={handleInputChange}
          placeholder="House number and street name"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="apt">
          Apt, suite, unit
        </label>
        <input
          type="text"
          id="appartment"
          value={customerInfo.appartment}
          onChange={handleInputChange}
          placeholder="apartment, suite, unit, etc. (optional)"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="city">
          City*
        </label>
        <input
          type="text"
          id="city"
          value={customerInfo.city}
          onChange={handleInputChange}
          placeholder="Town / City"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="state">
          State*
        </label>
        <select
          id="state"
          value={customerInfo.state}
          onChange={handleInputChange}
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        >
          <option value="">Select a State</option>
          {usStates.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-[16px]" htmlFor="postalCode">
          Postal Code*
        </label>
        <input
          type="text"
          id="postalCode"
          value={customerInfo.postalCode}
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
          id="phone"
          value={customerInfo.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="w-full py-[12px] bg-[#F6F6F6] text-[16px] rounded px-[16px] border-[1px] border-gray-600 focus:border-blue-600 focus:border-[2px] focus:outline-none"
        />
      </div>
    </div>
    <div id="div" className='flex my-[20px] items-center'>
        <div
        className="px-[16px] py-[12px] bg-[#FB641B] text-white "
        >
        <p>SAVE AND DELIVER HERE</p>
        </div>
        <div>
        <p className='mx-[30px] font-[500] text-[17px] text-blue-600'>CANCEL</p>
        </div>
    </div>

    </div>
  )
}

export default AddressForm
