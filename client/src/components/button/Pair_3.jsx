import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { addToCart } from "../../utils/addCartFunction";
import { VscHeart } from "react-icons/vsc";
import { addWishlistItem, removeWishlistItem } from "../../utils/wishlist";
import { getWishlistIdUsingProductId } from "../../helper/helper";
import { checkAvailibility } from "../../utils/checkAvailibility";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlistItems } from "../../store/slices/wishlist.slice";
import { getSelf } from "../../store/slices/selfHandler.slice";

function Pair_3({ item , bgColor }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(getAllWishlistItems);
  const user = useSelector(getSelf);
  return (
    <div id="button" className="flex gap-[20px]">
      <p className={`p-[10px] text-center rounded-full ${bgColor} border hover:cursor-pointer hover:bg-[#ff3f35fa] hover:text-white`}>
        {checkAvailibility(wishlist, item) ? (
          <p className="text-[red] hover:text-white"
            onClick={() => {
              removeWishlistItem(dispatch, {
                _id: getWishlistIdUsingProductId(item?._id, wishlist),
              });
            }}
          >
            <FaHeart size={20}  />
          </p>
        ) : (
          <p
            onClick={() => {
              addWishlistItem(dispatch, item);
            }}
          >
            <VscHeart size={20} />
          </p>
        )}{" "}
      </p>
      <p
        onClick={() => {
          addToCart(item?._id, dispatch, user);
        }}
        className={`p-[10px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
      >
        <BsCart3 size={20} />{" "}
      </p>
      <p
        onClick={() => {}}
        className={`p-[10px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
      >
        <FaRegEye size={20} />{" "}
      </p>
    </div>
  );
}

export default Pair_3;
