import { RxCross2 } from "react-icons/rx";

function ProductOrderCard({item}) {
  return (
    <div
      id="order-card"
      className="flex justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      {/* Image and Product Details */}
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt="order-image"
          className="object-cover w-24 rounded-lg shadow-md"
        />
        <div className="flex flex-col justify-between">
          <h1 className="font-dm-sans font-bold text-[14px] sm:text-base text-[#3C4242]">
            {item.name || "Visiting Card"}
          </h1>
         
          
        </div>
      </div>

      {/* Quantity, Price, and Remove Icon */}
      <div className="flex flex-col items-end justify-center space-y-2">
        <p className="font-dm-sans font-bold text-sm sm:text-base text-[#3C4242]">
          Qty: <span className="font-medium">{item?.quantity}</span>
        </p>
        <p className="text-xs text-gray-500 font-dm-sans sm:text-sm">${item?.price}</p>
      </div>
    </div>
  );
}

export default ProductOrderCard;