import React, { useState } from 'react';


const Shipping = () => {
    const [sameAsBilling, setSameAsBilling] = useState(true);

    return (
        <div className="container mx-auto">
            <div className="py-4">
                <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
                <p className="mb-4 text-gray-600">Select the address that matches your card or payment method.</p>
                <div className="space-y-4 bg-[#F6F6F6] p-8 rounded-xl">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="sameAsBilling"
                            name="shippingAddress"
                            checked={sameAsBilling}
                            onChange={() => setSameAsBilling(true)}
                            className="mr-2"
                        />
                        <label htmlFor="sameAsBilling" className="cursor-pointer font-bold text-[#3C4242]">Same as Billing address</label>
                    </div>
                    <div className="my-6 border-t border-gray-300"></div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="differentAddress"
                            name="shippingAddress"
                            checked={!sameAsBilling}
                            onChange={() => setSameAsBilling(false)}
                            className="mr-2"
                        />
                        <label htmlFor="differentAddress" className="cursor-pointer font-bold text-[#3C4242]">Use a different shipping address</label>
                    </div>
                </div>
            </div>
            <div className="my-2 border-t border-gray-300"></div>
            <div className='my-6'>
                <h1 className='mb-6 text-lg font-semibold'>Shipping Method</h1>
                <div className="p-6 rounded-xl bg-[#F6F6F6]">
                    <p className="font-bold mb-4 text-[#3C4242]">Arrives by Monday, June 7</p>
                    <div className="py-4 border-t border-gray-300">
                        <div className="flex justify-between">
                            <p className='text-[#3C4242] font-bold'>Delivery Charges</p>
                            <p className='text-[#3C4242] font-bold'>$5.00</p>
                        </div>
                        <p className="text-sm text-gray-500">Additional fees may apply</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
