import React from 'react';

const Advertisement = () => {
  return (
    <div className="relative flex items-center justify-center h-screen text-white bg-center bg-cover"
      style={{
        backgroundImage: `url("https://new-basel2.myshopify.com/cdn/shop/files/highcompress-main-big-baner-8_1296x.jpg?v=1613716582")`,
        position: 'relative',
        height : '60vh',
        width: '100%',
        backgroundAttachment : 'fixed'
        
      }}
    >
      <div className="p-8 text-center bg-opacity-50 rounded-lg md:p-16">
        <h4 className="font-serif text-lg italic md:text-xl">Connect to Basel & Co.</h4>
        <h1 className="mt-2 text-[42px] font-[500] md:text-6xl">Join Our Advertisement</h1>
        <p className="mt-4 text-sm md:text-base max-w-[350px] text-center mx-auto">
          Hey you, sign up! It only takes a second to be the first to 
          find out about our latest news and promotions!
        </p>
        <div className="flex items-center justify-center mt-6">
          <div className="relative w-full md:w-2/3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 text-black  bg-[#00000000] border-b-gray-300 border-b-[2px] outline-none hover:outline-none  rounded-l-md focus:outline-none"
            />
          </div>
          <button className="px-8 py-3 font-bold text-black bg-white rounded-r-md hover:bg-gray-100">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;

