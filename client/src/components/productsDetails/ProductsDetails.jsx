import { useContext } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalProvider";
import { getTargetIdUsingProductId } from "../../helper/helper";
import { getAllCartItems } from "../../store/slices/cart.slice";
import { getSelf } from "../../store/slices/selfHandler.slice";
import { getAllWishlistItems } from "../../store/slices/wishlist.slice";
import { addToCart } from "../../utils/addCartFunction";
import { checkAvailibility } from "../../utils/checkAvailibility";
import { addWishlistItem, removeWishlistItem } from "../../utils/wishlist";
import Button from "./Button";
import ImageZoom from "react-image-zoom";

function ProductsDetails({ img, product, setImg }) {
  const wishlistItem = useSelector(getAllWishlistItems);
  const cartItem = useSelector(getAllCartItems);
  const dispatch = useDispatch();
  const { setEventLoading } = useContext(GlobalContext);
  const user = useSelector(getSelf);
  const makeOrderableProducts = (products) => {
    return {
      productId : product?._id,
      rating : product?.rating,
      quantity : 1,
      price : product?.price,
      category : products?.category,
      thumbnail : product?.thumbnail?.url || products.thumbnail,
      title : product?.title
    }
  }
  const zoomProps = {
    width: product?.category == "smartphones" ? 250 : 500 , // Image width
    // height: 500, // Image height
    zoomWidth: 500, // Zoomed image width
    img: img, // Image URL
  };
  return (
    <>
      {wishlistItem && cartItem && (
        <div
          id="top-bar"
          className="grid md:grid-cols-2 grid-cols-1 px-[20px] max-w-[1380px] mx-auto min-h-[400px] pb-[20px] gap-[50px] py-[20px]"
        >
          <div
            id="img"
            className="w-[100%] flex flex-col border-[.5px] border-[#00000121] rounded-[20px] p-[20px] flex-wrap items-center justify-center gap-[20px] "
          >
            <div id="big-image" className="my-auto">
              <ImageZoom {...zoomProps}  />
            </div>
            <div
              id="img-box"
              className="flex  w-[100%] justify-center gap-[50px] my-[10px] flex-wrap mx-[20px] mt-auto "
            >
              <img
                className={` ${
                  product?.category == "smartphones" ? "w-[10%]" : "w-[15%]"
                } p-[5px] border-[.5px] rounded-[5px] border-[#00000021] `}
                src={product?.thumbnail?.url || product?.thumbnail}
                alt=""
                onClick={() => {
                  setImg(product?.thumbnail?.url || product?.thumbnail);
                }}
              />
              {product?.images?.map((image, idx) => {
                return (
                  <img
                    key={idx}
                    className={` ${
                      product.category == "smartphones" ? "w-[10%]" : "w-[15%]"
                    } p-[5px] border-[.5px] rounded-[5px] border-[#00000021] `}
                    src={image?.url || image}
                    onClick={() => {
                      setImg(image?.url || image);
                    }}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
          <div
            id="detials"
            className="py-[40px] md:px-[20px] flex flex-col gap-[10px] text-[16px] font-[500]"
          >
            <h1 className="text-[24px] font-[600]" id="title">
              {product?.title}
            </h1>
            <p className="text-[16px] font-[500] text-gray-600">
              {product?.description}
            </p>
            <div id="rating-box" className="my-[15px]">
              <h1 className="text-[18px]">Rating :</h1>
              <div id="rating" className="flex gap-[10px] items-center">
                <span className="text-[16px] flex gap-[5px] text-red-600">
                  {[[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3], [1, 2], [1],[0]][
                    5 - Math.floor(product?.rating) || 0
                  ].map(() => (
                    <IoStar key={Math.random()} size={20} color="#DC2626" />
                  ))}
                  {[[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3], [1, 2], [1],[0]][
                    Math.floor(product?.rating) || 4
                  ].map(() => (
                    <IoStarOutline
                      key={Math.random()}
                      size={20}
                      color="#DC2626"
                    />
                  ))}
                </span>
                <h2 className="text-[15px] text-gray-500 font-[400]">
                  {product?.rating} Reviews
                </h2>
              </div>
            </div>
            <hr />
            <p className="text-[20px] text-gray-700" id="price">
              ${product?.price}{" "}
              <i className="text-[16px] font-[400]">/pieces</i>{" "}
            </p>
            <div id="dub-details" className="flex flex-col ">
              <p className="text-gray-700">
                <b className="text-[18px]">Brand : &nbsp;</b>
                {product?.brand}
              </p>
              <p className="text-gray-700">
                <b className="text-[18px]">Category : &nbsp;</b>
                {product?.category}
              </p>
              <p className="text-gray-700">
                <b className="text-[18px]">Stock : &nbsp;</b>
                {product?.quantity}
              </p>
              <p className="text-gray-700">
                <b className="text-[18px]">Weight : &nbsp;</b>
                {product?.weight || "Not available"}
              </p>
            </div>
            <hr className="my-[5px]" />

            <div id="return-policy">
              <p className="text-[20px]" id="return">
                Return Policy :{" "}
                <span className="text-[18px] px-[40px]">
                  {product?.returnPolicy || "No return policy"}
                </span>
              </p>
            </div>

            <div id="last-qty">
              <p className="text-[18px]">
                Last Order within 10days : {product?.minimumOrderQuantity || 10}{" "}
                qty
              </p>
            </div>

            <div id="warranty">
              <p className="text-[18px] font-[500]">
                Warranty : {product?.warrantyInformation || "4 Dyas"}
              </p>
            </div>
            <hr />
            <div
              id="btn"
              className="flex gap-[20px] my-[20px] flex-col sm:flex-row"
            >
              <Link to={"/checkout"} state={{ orderedProducts: [makeOrderableProducts(product)] }}>
                <Button label={"Buy Now"} bgColor={"bg-[#E5A018]"} />
              </Link>
              <div id="cart-btn">
                {checkAvailibility(cartItem, product) ? (
                  <Button label={"Remove to Cart"} bgColor={"bg-[#3B71CA]"} />
                ) : (
                  <div
                    id="add-cart-btn"
                    onClick={() => {
                      addToCart(product?._id, dispatch, user, setEventLoading);
                    }}
                  >
                    <Button label={"Add to Cart"} bgColor={"bg-[#3B71CA]"} />
                  </div>
                )}
              </div>
              <div id="wishlist-btn">
                {checkAvailibility(wishlistItem, product) ? (
                  <div
                    onClick={() => {
                      removeWishlistItem(
                        dispatch,
                        {
                          _id: getTargetIdUsingProductId(
                            product?._id,
                            wishlistItem
                          ),
                        },
                        setEventLoading
                      );
                    }}
                    id="removeCart"
                  >
                    <Button
                      label={"Remove from wishlist "}
                      bgColor={"bg-[#6C59CA]"}
                    />
                  </div>
                ) : (
                  <div
                    id="addButton"
                    onClick={() => {
                      addWishlistItem(dispatch, product, setEventLoading);
                    }}
                  >
                    <Button
                      label={"Add to wishlist"}
                      bgColor={"bg-[#6C59CA]"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsDetails;
