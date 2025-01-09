import { Link } from "react-router-dom";
import { useCountDown } from "../hooks/useCountDown";

const OfferBanner = () => {
  const { days, hours, minutes, seconds } = useCountDown();

  return (
    <div className="flex flex-col items-center px-8 pt-8 bg-[#FEDFDC] lg:flex-row">
      {/* Image Section */}
      <div className="flex self-end flex-1 mt-auto">
        <img
          src="https://ecomarts.aipdfquery.com/assets/images/offer/offerThumb2_1.png" // Replace with the actual image URL
          alt="Clearance Sale"
          className="self-end rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 mt-6 text-center lg:text-left lg:mt-0 lg:ml-8">
        <h4 className="mb-8 text-[1.4rem] font-medium text-gray-600 uppercase">
          Clearing Sale
        </h4>
        <h2 className="mb-4 text-[3.6rem] font-bold text-gray-900">
          {`"60% Sale On Selected Products"`}
        </h2>
        <p className="mb-6 text-gray-600 text-[15px] font-[500]">
          Consectetur adipiscing elit. Integer nunc viverra laoreet est, a
          pretium metus aliquam eget. Maecenas porta is nunc.
        </p>

        {/* Timer */}
        <div className="flex justify-center gap-4 mb-6 lg:justify-start">
          {[
            `${days > 9 ? days : "0" + days} Day`,
            `${hours > 9 ? hours : "0" + hours} Hour`,
            `${minutes > 9 ? minutes : "0" + minutes} Min`,
            `${seconds > 9 ? seconds : "0" + seconds} Sec`,
          ].map((time, index) => (
            <div
              key={index}
              className="p-4 text-center w-[80px] h-[80px] bg-white rounded-full shadow-md"
            >
              <p className="text-[2.4rem] font-bold text-red-500">
                {time.split(" ")[0]}
              </p>
              <p className="text-[1.4rem] text-gray-500">
                {time.split(" ")[1]}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mb-6">
          <Link
            to={"/shopping"}
            className="px-6 py-3 font-medium text-white bg-red-500 rounded-[30px] hover:bg-red-600 text-[16px]"
          >
            Shop Now
          </Link>
        </div>

        {/* Limited Time Offer */}
        <div className="text-gray-600 text-[15px] font-[500]">
          <span>Limited Time Offer. The Deal Will Expire On </span>
          <span className="px-2 py-1 font-medium text-white bg-red-500 rounded-md">
            December 11, 2024
          </span>
          <span> HURRY UP!</span>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
