// FilterSidebar.jsx

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../store/slices/productsHandler.slice";
import { GlobalContext } from "../../contexts/GlobalProvider";
import CustomCheckbox from "../button/CustomCheckBox";

const FilterSidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState(true);
  const [expandedPrice, setExpandedPrice] = useState(true);
  const [expandedRating, setExpandedRating] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    color: "",
    size: "",
  });
  const {
    setSearchCategoryList,
    setFilterPriceList,
    setFilterRatingList,
    setCategory,
  } = useContext(GlobalContext);

  const categoriesList = useSelector(getAllCategories) || [];
  const priceList = [
    "Below 99",
    "100 to 199",
    "200 to 499",
    "500 to 999",
    "1000 to 1999",
    "2000 to 4999",
    "5000 to 9999",
    "10000 to 19999",
    "20000 to 49999",
    "Above 50000",
  ];
  const ratingList = [
    { name: "5 Rating", value: "★ ★ ★ ★ ★" },
    { name: "4 Rating", value: "★ ★ ★ ★ ☆" },
    { name: "3 Rating", value: "★ ★ ★ ☆ ☆" },
    { name: "2 Rating", value: "★ ★ ☆ ☆ ☆" },
    { name: "1 Rating", value: "★ ☆ ☆ ☆ ☆" },
  ];

  console.log(categoriesList);

  const colors = ["Red", "Blue", "Green", "Black", "White"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="w-full px-[40px] bg-gray-100  py-[20px] shadow-lg">
      <h2 className="mb-4 text-[1.8rem] font-bold">Filters</h2>

      {/* Categories */}
      <div className="mb-1">
        {
          <div>
            <button className="flex justify-between items-center w-full font-[500] text-left text-gray-700 text-[16px] hover:text-gray-900">
              {"Category".toUpperCase()}
              <span
                className="text-[24px]"
                onClick={() => setExpandedCategory(!expandedCategory)}
              >
                {" "}
                {expandedCategory ? "-" : "+"}{" "}
              </span>
            </button>

            <div className="flex flex-col gap-[10px] ml-4 ">
              {expandedCategory &&
                categoriesList &&
                categoriesList.length > 0 &&
                categoriesList.map(({ name, image }) => (
                  <div key={name} className="flex items-center">
                    <CustomCheckbox
                      name={name}
                      setQueryList={setSearchCategoryList}
                    />
                  </div>
                ))}
            </div>
          </div>
        }
      </div>

      {/* Price */}
      <div className="">
        {
          <div>
            <button className="flex justify-between items-center w-full font-[500] text-left text-gray-700 text-[16px] hover:text-gray-900">
              {"Price".toUpperCase()}
              <span
                className="text-[24px]"
                onClick={() => setExpandedPrice(!expandedPrice)}
              >
                {" "}
                {expandedPrice ? "-" : "+"}{" "}
              </span>
            </button>

            <div className="ml-4 flex flex-col gap-[10px]">
              {expandedPrice &&
                priceList &&
                priceList.length > 0 &&
                priceList.map((name) => (
                  <div key={name} className="flex items-center">
                    <CustomCheckbox
                      name={name}
                      setQueryList={setFilterPriceList}
                    />
                  </div>
                ))}
            </div>
          </div>
        }
      </div>

      {/* Rating */}
      <div className="mb-4">
        {
          <div>
            <button className="flex justify-between items-center w-full font-[500] text-left text-gray-700 text-[16px] hover:text-gray-900">
              {"Rating".toUpperCase()}
              <span
                className="text-[24px]"
                onClick={() => setExpandedRating(!expandedRating)}
              >
                {" "}
                {expandedRating ? "-" : "+"}{" "}
              </span>
            </button>

            <div className="ml-4 ">
              {expandedRating &&
                ratingList &&
                ratingList.length > 0 &&
                ratingList.map(({ name, value }) => (
                  <div key={name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={name}
                      className="mr-2"
                      value={name}
                      onChange={() => {
                        setCategory("");
                        setFilterRatingList((prev) => {
                          if (prev.includes(name)) {
                            return prev.filter((item) => item != name);
                          } else {
                            return [...prev, name];
                          }
                        });
                      }}
                    />
                    <label htmlFor={name} className="text-red-600 text-[22px]">
                      {value}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        }
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="mb-2 uppercase font-[500] text-gray-700 text-[16px]">
          Color
        </h3>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedFilters((prev) => ({ ...prev, color }))}
              className={`w-6 h-6 rounded-full border ${
                selectedFilters.color === color ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className=" uppercase font-[500] text-gray-700 text-[16px]">
          Size
        </h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedFilters((prev) => ({ ...prev, size }))}
              className={`px-3 py-1 border rounded-md ${
                selectedFilters.size === size
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
