import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { addToCart, removeToCart } from "../../utils/addCartFunction";
import { VscHeart } from "react-icons/vsc";
import { addWishlistItem, removeWishlistItem } from "../../utils/wishlist";
import { checkAvailibility } from "../../utils/checkAvailibility";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlistItems } from "../../store/slices/wishlist.slice";
import { getSelf } from "../../store/slices/selfHandler.slice";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalProvider";
import { TbGardenCartOff } from "react-icons/tb";
import { getAllCartItems } from "../../store/slices/cart.slice";
import { getTargetIdUsingProductId } from "../../helper/helper";

function Pair_3({ item, bgColor }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(getAllWishlistItems);
  const cartlist = useSelector(getAllCartItems);
  const user = useSelector(getSelf);
  const { setEventLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div id="button" className="flex text-black gap-[20px]">
      <div
        className={`p-[10px] text-center rounded-full ${bgColor} border hover:cursor-pointer text-black hover:bg-[#ff3f35fa] hover:text-white`}
      >
        {checkAvailibility(wishlist, item) ? (
          <p
            className="text-[red] hover:text-white"
            onClick={() => {
              removeWishlistItem(
                dispatch,
                {
                  _id: getTargetIdUsingProductId(item?._id, wishlist),
                },
                setEventLoading
              );
            }}
          >
            <FaHeart size={20} />
          </p>
        ) : (
          <p
            onClick={() => {
              addWishlistItem(dispatch, item, setEventLoading);
            }}
          >
            <VscHeart size={20} />
          </p>
        )}{" "}
      </div>

      <div id="cart-button">
        {checkAvailibility(cartlist, item) ? (
          <p
            onClick={() => {
              removeToCart(
                {
                  _id: getTargetIdUsingProductId(item?._id, cartlist),
                },
                dispatch,
                user,
                setEventLoading
              );
            }}
            className={`p-[10px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
          >
            <TbGardenCartOff size={20} />{" "}
          </p>
        ) : (
          <p
            onClick={() => {
              addToCart(item?._id, dispatch, user, setEventLoading);
            }}
            className={`p-[10px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
          >
            <BsCart3 size={20} />{" "}
          </p>
        )}
      </div>

      <Link
        onClick={() => {
          setEventLoading(true);
          setTimeout(() => {
            navigate(`/products-details/id=${item._id}`, {
              state: { products: item },
            });
            setEventLoading(false);
          }, 500);
        }}
        className={`p-[10px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
      >
        <FaRegEye size={20} />{" "}
      </Link>
    </div>
  );
}
Pair_3.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  bgColor: PropTypes.string.isRequired,
};
export default Pair_3;
