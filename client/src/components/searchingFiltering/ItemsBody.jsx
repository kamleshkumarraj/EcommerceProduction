import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalProvider";
import { useMultiplePriceFilter } from "../../hooks/MultiplePriceFilter";
import { useMultipleRatingFilter } from "../../hooks/MultipleRatingFilter";
import { useMultipleTargetFilter } from "../../hooks/MultipleTargetFilter";
import { useFilter } from "../../hooks/useFilter.hook";
import { getAllProducts } from "../../store/slices/productsHandler.slice";
import CategoryCard from "../card/CategoryCard";
import TwoLayerCard from "../card/TwoLayerCard";
import MobileCard from "../card/LengthCard";
import { Pagination } from "swiper/modules";

function FilteringItemsBody() {
  const categoryUrl = useLocation().state?.category || "";
  const products = useSelector(getAllProducts);

  //pagination-related variables.
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(9);
  const [startPageIdx, setStartPageIdx] = useState(0);
  const [endPageIdx, setEndPageIdx] = useState(7);
  const [selectIdx, setSelectIdx] = useState(1);

  const {
    searchCategoryList,
    filterPriceList,
    filterRatingList,
    searchQuery,
    setCategory,
    category,
  } = useContext(GlobalContext);
  console.log(categoryUrl);
  const [categoryList, setCatQuery] = useFilter(
    products || [],
    (data) => data.category
  );
  useEffect(() => {
    setCatQuery(categoryUrl);
    setCategory(categoryUrl);
    setStartIdx(0);
    setEndIdx(9);
    setSelectIdx(1);
    setStartPageIdx(0);
    setEndPageIdx(7);
  }, [categoryUrl]);

  const [data, setSearchingQuery] = useFilter(
    products || [],
    (data) => data.title
  );

  const [categoryFilteredProducts, setCategoryList] = useMultipleTargetFilter(
    data || products || [],
    (item) => item.category
  );

  const [priceFilteredProducts, setPriceQueryList] = useMultiplePriceFilter(
    categoryFilteredProducts || data || products || []
  );

  const [filteredProducts, setRatingQueryFilter] = useMultipleRatingFilter(
    priceFilteredProducts || categoryFilteredProducts || data || products || []
  );

  useEffect(() => {
    setSearchingQuery(searchQuery || "");
    setCategoryList(searchCategoryList || []);
    setPriceQueryList(filterPriceList || []);
    setRatingQueryFilter(filterRatingList || []);
    setStartIdx(0);
    setEndIdx(9);
    setSelectIdx(1);
    setStartPageIdx(0);
    setEndPageIdx(7);
  }, [
    searchQuery,
    searchCategoryList,
    filterPriceList,
    filterRatingList,
    category,
  ]);

  const pageData = useMemo(() => {
    let totalPage;
    if(category == "")
    totalPage = Math.ceil(filteredProducts?.length / 9)
    else 
    totalPage = Math.ceil(categoryList?.length / 9)
    return {totalPage}
},[filteredProducts , categoryList])

  console.log(filteredProducts);

  return (
    <>
      <div
        className={`grid-cols-1 ${
          category == "smartphones" ? "2xl:grid-cols-4" : "2xl:grid-cols-3"
        }  ${category == "smartphones" ? "xl:grid-cols-3" : "xl:grid-cols-2"} ${
          category == "smartphones" ? "sm:grid-cols-2" : "sm:grid-cols-1"
        } ${
          searchQuery ? "pb-[200px] gap-y-[190px]" : ""
        } grid  gap-[20px] justify-items-center items-center`}
      >
        {category == ""
          ? searchQuery && searchQuery.length > 0
            ? filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.slice(startIdx , endIdx).map((item) => (
                <TwoLayerCard key={item._id} item={item} />
              ))
            : filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.slice(startIdx , endIdx).map((item) => (
                <CategoryCard key={item._id} item={item} />
              ))
          : category == "smartphones"
          ? categoryList &&
            categoryList.length > 0 &&
            categoryList.slice(startIdx , endIdx).map((item) => (
              <MobileCard key={item._id} item={item} />
            ))
          : searchQuery && searchQuery.length > 0
          ? filteredProducts &&
            filteredProducts.length > 0 &&
            filteredProducts.slice(startIdx , endIdx).map((item) => (
              <TwoLayerCard key={item._id} item={item} />
            ))
          : categoryList &&
            categoryList.length > 0 &&
            categoryList.slice(startIdx , endIdx).map((item) => (
              <CategoryCard key={item._id} item={item} />
            ))}
      </div>
     {pageData.totalPage > 1 &&  <div
        id="pagination"
        className="flex flex-wrap gap-[10px] justify-end mx-[4rem] my-[3rem]"
      >
        <div id="prev">
          <p
            onClick={() => {
              if (selectIdx > 1) {
                setStartIdx(startIdx - 9);
                setEndIdx(endIdx - 9);
                setSelectIdx(selectIdx - 1);
                if (pageData.totalPage > 7) {
                  if (selectIdx > 4 && selectIdx < pageData.totalPage - 2) {
                    setStartPageIdx(selectIdx - 5);
                    setEndPageIdx(selectIdx + 2);
                  }
                }
              }
            }}
            className={`px-[2rem] py-[1rem]  border-gray-400 border-[1px] mx-[.5rem] rounded-[6px] bg-black text-white font-[500] text-[1.6rem] ${
              selectIdx == 1
                ? "hover:cursor-not-allowed opacity-40"
                : "cursor-pointer opacity-100"
            }`}
          >
            Prev
          </p>
        </div>
        {pageData.totalPage > 1 &&
          [...Array(pageData.totalPage).keys()]
            .slice(startPageIdx, endPageIdx)
            .map((item) => (
              <span
                onClick={() => {
                  setStartIdx(item * 9);
                  setEndIdx((item + 1) * 9);
                  setSelectIdx(item + 1);
                  if (pageData.totalPage > 7) {
                    if (item + 1 > 3 && item + 1 < pageData.totalPage - 3) {
                      setStartPageIdx(item - 3);
                      setEndPageIdx(item + 4);
                    } else if (item + 1 < 3) {
                      setStartPageIdx(0);
                      setEndPageIdx(7);
                    } else if (item + 1 > pageData.totalPage - 4) {
                      setStartPageIdx(pageData.totalPage - 7);
                      setEndPageIdx(pageData.totalPage);
                    }
                  }
                }}
                key={item}
                className={`${
                  item * 9 == startIdx ? "bg-[#7fad39] text-white" : ""
                } px-[2rem] py-[1rem] cursor-pointer border-gray-400 border-[1px] mx-[.5rem] rounded-[4px] text-[1.6rem]`}
              >
                {item + 1}
              </span>
            ))}
        <div id="next">
          <p
            onClick={() => {
              if (selectIdx < pageData.totalPage) {
                setStartIdx(startIdx + 9);
                setEndIdx(endIdx + 9);
                setSelectIdx(selectIdx + 1);
                if (pageData.totalPage > 7) {
                  if (selectIdx > 3 && selectIdx < pageData.totalPage - 3) {
                    setStartPageIdx(selectIdx - 3);
                    setEndPageIdx(selectIdx + 4);
                  }
                }
              }
            }}
            className={`px-[2rem] py-[1rem] cursor-pointer border-gray-400 border-[1px] mx-[.5rem] rounded-[6px] text-[1.6rem] bg-black ${
              selectIdx == pageData.totalPage
                ? "hover:cursor-not-allowed opacity-40"
                : "cursor-pointer opacity-100"
            } text-white font-[500] text-center`}
          >
            Next
          </p>
        </div>
      </div>}
    </>
  );
}
FilteringItemsBody.propTypes = {
  products: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
export default FilteringItemsBody;
