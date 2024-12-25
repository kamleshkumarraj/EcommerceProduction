// FilterSidebar.jsx

import { useState } from "react";


const FilterSidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    color: "",
    size: "",
  });

  const categories = {
    Electronics: ["Mobiles", "Laptops", "Cameras"],
    Fashion: ["Men", "Women", "Kids"],
    Home: ["Furniture", "Decor", "Kitchen"],
  };

  const colors = ["Red", "Blue", "Green", "Black", "White"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleCategoryClick = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleCheckboxChange = (category, subcategory) => {
    setSelectedFilters((prev) => {
      const categories = prev.categories.includes(subcategory)
        ? prev.categories.filter((item) => item !== subcategory)
        : [...prev.categories, subcategory];
      return { ...prev, categories };
    });
  };

  const handleSliderChange = (event) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: [0, event.target.value],
    }));
  };

  const handleRatingChange = (rating) => {
    setSelectedFilters((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="w-full px-[40px] bg-gray-100  py-[20px] shadow-lg">
      <h2 className="mb-4 text-lg font-bold">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Categories</h3>
        {Object.keys(categories).map((category) => (
          <div key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className="flex justify-between w-full font-medium text-left text-gray-700 hover:text-gray-900"
            >
              {category}
              <span>{expandedCategory === category ? "-" : "+"}</span>
            </button>
            {expandedCategory === category && (
              <div className="mt-2 ml-4">
                {categories[category].map((subcategory) => (
                  <div key={subcategory} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subcategory}
                      className="mr-2"
                      checked={selectedFilters.categories.includes(subcategory)}
                      onChange={() => handleCheckboxChange(category, subcategory)}
                    />
                    <label htmlFor={subcategory} className="text-gray-600">
                      {subcategory}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Price</h3>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">0</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={selectedFilters.priceRange[1]}
            onChange={handleSliderChange}
            className="w-full"
          />
          <span className="ml-2 text-gray-600">{selectedFilters.priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Rating</h3>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`text-xl ${
                selectedFilters.rating >= star ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Color</h3>
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
        <h3 className="mb-2 font-semibold">Size</h3>
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
