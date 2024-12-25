import { useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/productsHandler.slice";
import OfferedProductCard from "../card/OffredProductCard";
import MobileCard from "../card/LengthCard";
import FeaturedCard from "../card/FeaturedCard";

function LaptopComputerBody() {
  const allProducts = useSelector(getAllProducts) || [];
  const laptops = allProducts?.filter(
    (product) => product.category === "laptops"
  );
  console.log(laptops);
  const mobile = allProducts?.filter(
    (product) => product.category == "smartphones"
  );
  return (
    <div
      id="laptop-computer-body"
      className="grid w-full grid-cols-1 gap-[20px]"
    >
      <div className="text-center flex justify-center items-center flex-col text-4xl mt-[20px] text-slate-600 font-bold relative pb-[45px]">
        <h2>Laptops & Smartphones Category</h2>
        <div className="w-[250px] h-[4px] bg-[#7fad39] mt-4"></div>
      </div>
      <div
        id="row-1"
        className="grid justify-center w-full grid-cols-5 justify-items-center gap-x-[20px]"
      >
        <div
          id="col-1/2"
          className="flex col-span-2 flex-col gap-[20px] mx-auto"
        >
          {laptops &&
            laptops.length > 0 &&
            laptops
              .slice(0, 2)
              .map((item) => <OfferedProductCard key={item._id} item={item} />)}
        </div>
        {mobile &&
          mobile.length > 0 &&
          mobile
            .slice(0, 3)
            .map((item) => <MobileCard key={item._id} item={item} />)}
      </div>
      <div id="row-2" className="grid grid-cols-5 gap-[20px] ">
        <div
          id="col-1"
          className="flex justify-evenly col-span-2 flex-col gap-[20px]"
        >
          {laptops &&
            laptops.length > 0 &&
            laptops
              .slice(2, 4)
              .map((item) => <FeaturedCard key={item._id} item={item} />)}
        </div>
        {mobile &&
          mobile.length > 0 &&
          mobile
            .slice(3, 6)
            .map((item) => <MobileCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}


export default LaptopComputerBody;
