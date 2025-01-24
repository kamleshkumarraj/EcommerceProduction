// import React from 'react'
import PropTypes from "prop-types"
import { useContext, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { GlobalContext } from "../../contexts/GlobalProvider"
import { useFilter } from "../../hooks/useFilter.hook"
import { getAllProducts } from "../../store/slices/productsHandler.slice"
import ProductCard from "../card/ProductCard"
import { useMultipleTargetFilter } from "../../hooks/MultipleTargetFilter"
import { useMultiplePriceFilter } from "../../hooks/MultiplePriceFilter"
import { useMultipleRatingFilter } from "../../hooks/MultipleRatingFilter"
import Pagination from "../common/Pagination"
function ShoppingProductsBody() {
    const products = useSelector(getAllProducts)

    //pagination-related variables.
    const [startIdx , setStartIdx] = useState(0);
    const [endIdx , setEndIdx] = useState(9);
    const [startPageIdx , setStartPageIdx] = useState(0);
    const [endPageIdx , setEndPageIdx] = useState(7);
    const [selectIdx , setSelectIdx] = useState(1);

    const {searchCategoryList , filterPriceList , filterRatingList , searchQuery} = useContext(GlobalContext)
    
    const [data , setSearchQuery] = useFilter(products || [] , (data) => data.title) 
    const [categoryFilteredProducts , setCategoryList] = useMultipleTargetFilter(data || products || [] , (item) => item.category)
    const [priceFilteredProducts , setPriceQueryList] = useMultiplePriceFilter(categoryFilteredProducts || data || products || [])
    const [filteredProducts , setRatingQueryFilter] = useMultipleRatingFilter(priceFilteredProducts || categoryFilteredProducts || data || products || [])

    useEffect(() => {
        setSearchQuery(searchQuery || "")
        setCategoryList(searchCategoryList || [])
        setPriceQueryList(filterPriceList || [])
        setRatingQueryFilter(filterRatingList || [])
        setStartIdx(0)
        setEndIdx(9)
        setSelectIdx(1)
        setStartPageIdx(0)
        setEndPageIdx(7)
    },[searchQuery , searchCategoryList , filterPriceList , filterRatingList])

    const pageData = useMemo(() => {
        const totalPage = Math.ceil(filteredProducts?.length / 9)
        return {totalPage}
    },[filteredProducts])

  return (
    <>
    <div id="shopping-body" className="w-full justify-between justify-items-center gap-[20px] bg-gray-200 grid grid-cols-3  px-[20px]" >
      {
        filteredProducts && filteredProducts?.length > 0 &&
        filteredProducts.slice(startIdx,endIdx).map((item) => <ProductCard key={item._id} item={item} />)
      }
    </div>
    <Pagination 
       endIdx={endIdx}
       endPageIdx={endPageIdx}
       pageData={pageData}
       selectIdx={selectIdx}
       setEndIdx={setEndIdx}
       setEndPageIdx={setEndPageIdx}
       setSelectIdx={setSelectIdx} 
       setStartIdx={setStartIdx}
       setStartPageIdx={setStartPageIdx}
       startIdx={startIdx}
       startPageIdx={startPageIdx}
       perPageData={9}
    />
    </>
  )
}

ShoppingProductsBody.propTypes = {
  products: PropTypes.array.isRequired
}

export default ShoppingProductsBody
