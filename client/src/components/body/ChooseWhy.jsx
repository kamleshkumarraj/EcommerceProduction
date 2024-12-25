// WhyChooseUs.jsx
import React from "react";
import { FaGift, FaShippingFast, FaUsers } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="bg-green-100 py-[80px]">
      <h2 className="mb-8 text-2xl font-bold text-center">Why choose us?</h2>
      <div className="grid max-w-[1300px] grid-cols-1 gap-[20px] lg:gap-[50px] mx-auto md:grid-cols-3">
        {/* Card 1 */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full">
            <FaGift className="text-3xl text-black" />
          </div>
          <h3 className="mb-2 text-lg font-bold">Physical or digital card?</h3>
          <p className="text-gray-600">
            Prefer a plastic card delivered by post? Or a digital one sent by
            email? Most of our gift cards offer both options.
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full">
            <FaShippingFast className="text-3xl text-black" />
          </div>
          <h3 className="mb-2 text-lg font-bold">Last minute shopping?</h3>
          <p className="text-gray-600">
            Most of our digital gift cards are delivered within 4 hours or can
            be scheduled to arrive on the day of your choice.
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full">
            <FaUsers className="text-3xl text-black" />
          </div>
          <h3 className="mb-2 text-lg font-bold">A large crowd to please?</h3>
          <p className="text-gray-600">
            For your convenience, you can send up to 10 addresses in a single
            order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
