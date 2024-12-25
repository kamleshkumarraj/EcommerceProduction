
import orderSuccessImg from "../assets/Img/successful.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="w-full p-[20px] md:px-[52.62px] bg-[#D5E5D7] gap-[13.16px]">
        <h1 className="text-sm font-semibold lg:text-xl">Successful Order</h1>
        <nav
          className="flex items-center gap-[10px] md:gap-[13.16px]"
          aria-label="Breadcrumb"
        >
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 md:text-base"
          >
            Ecommerce
          </a>
          <svg
            className="w-3 h-3 text-gray-400 md:w-4 md:h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 md:text-base"
          >
            Successful order
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start px-4 mb-8">
        <img
          src={orderSuccessImg}
          alt="Failed Order Illustration"
          className="mt-[40px] w-3/4 md:w-auto"
        />
        <p className="font-inter text-[20px] md:text-[31.57px] font-bold leading-[28px] md:leading-[38.21px] text-center mt-4">
          Thank you for shopping
        </p>
        <span className="font-inter text-[14px] md:text-[18.42px] font-normal leading-[24px] md:leading-[32.23px] text-center mt-2">
          Your order has been successfully placed and is now
        </span>
        <span className="text-center text-[14px] md:text-base mt-2">
          being processed.
        </span>
        <button className=" mt-5 left-[860.38px] h-[57.89px] p-[15.79px_31.57px] flex items-center gap-[7.89px] bg-[#0E1422] rounded-[5.26px] text-white justify-center">
          <Link className="flex justify-center gap-3" to={"/my-account/my-orders"}>
            Go to my account
            <span className="flex items-center justify-center">
              <FaArrowRightLong />
            </span>
          </Link>
        </button>
      </div>
    </>
  );
};

export default OrderConfirmation;
