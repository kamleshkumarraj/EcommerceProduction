// import React from 'react'
import PropTypes from "prop-types"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { GlobalContext } from "../../contexts/GlobalProvider"
import { useFilter } from "../../hooks/useFilter.hook"
import { getAllProducts } from "../../store/slices/productsHandler.slice"
import ProductCard from "../card/ProductCard"
import { useMultipleTargetFilter } from "../../hooks/MultipleTargetFilter"
import { useMultiplePriceFilter } from "../../hooks/MultiplePriceFilter"
import { useMultipleRatingFilter } from "../../hooks/MultipleRatingFilter"
function ShoppingProductsBody() {
    const products = useSelector(getAllProducts)
   
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
    },[searchQuery , searchCategoryList , filterPriceList , filterRatingList])

    console.log(searchCategoryList , filterPriceList , filterRatingList)

  return (
    <div id="shopping-body" className="w-full justify-between justify-items-center gap-[20px] bg-gray-200 grid grid-cols-3  px-[20px]" >
      {
        filteredProducts && filteredProducts?.length > 0 &&
        filteredProducts.map((item) => <ProductCard key={item._id} item={item} />)
      }
    </div>
  )
}

ShoppingProductsBody.propTypes = {
  products: PropTypes.array.isRequired
}

export default ShoppingProductsBody
