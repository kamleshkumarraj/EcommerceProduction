// NewsletterModal.jsx
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const NewsletterModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    setTimeout(() => {
        setIsVisible(true)
      },1000)
  },[])

  if (!isVisible) return null;

  return (
    <div className="fixed top-[23%] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-[20px]">
      <div className="relative flex items-center w-full max-w-[800px] p-6 bg-white rounded-lg">
        {/* Image Section */}
        <div className="w-[45%]">
          <img
            src="https://ecomarts.aipdfquery.com/assets/images/modal/common-modal.jpg"
            alt="Newsletter"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="w-[55%] px-[20px] ">
          {/* Header Section */}
          <div onClick={closeModal} id="cut" className="absolute top-[3%] right-[3%] w-full ml-auto">
            <RxCross1 className="ml-auto cursor-pointer" size={28} />
          </div>
          <div className="flex flex-col justify-center gap-[10px] pl-6 full ">
            <div>
              <h2 className="mb-2 text-center text-[40px] font-[500]">
                Subscribe To Our EcoMart
              </h2>
              <p className="mb-6 text-center text-gray-600">
                Subscribe to our newsletter and save your{" "}
                <span className="font-semibold text-red-500">20% money</span>{" "}
                with a discount code today.
              </p>

              {/* Input Section */}
              <div className="flex items-center mb-4  border-gray-500 r border-[.5px]  focus:border-[1.5px] hover:border-red-500 rounded-[30px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full py-[10px] mx-[11px] px-4 border-none focus:outline-none overflow-hidden"
                />
                <button className="px-6 py-[14px] rounded-[30px] ml-4 text-white bg-red-500 hover:bg-red-600">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center">
              <input type="checkbox" id="do-not-show" className="mr-2" />
              <label htmlFor="do-not-show" className="text-gray-600">
                Do not show this window
              </label>
            </div>
          </div>

          {/* Close Button */}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
