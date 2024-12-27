import PropTypes from "prop-types"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { GlobalContext } from "../../contexts/GlobalProvider"
import { useMultiplePriceFilter } from "../../hooks/MultiplePriceFilter"
import { useMultipleRatingFilter } from "../../hooks/MultipleRatingFilter"
import { useMultipleTargetFilter } from "../../hooks/MultipleTargetFilter"
import { useFilter } from "../../hooks/useFilter.hook"
import { getAllProducts } from "../../store/slices/productsHandler.slice"
import CategoryCard from "../card/CategoryCard"
import TwoLayerCard from "../card/TwoLayerCard"
import MobileCard from "../card/LengthCard"

function FilteringItemsBody() {
    const categoryUrl = useLocation().state?.category || "";
    const products = useSelector(getAllProducts)
    const {searchCategoryList , filterPriceList , filterRatingList , searchQuery , setCategory , category } = useContext(GlobalContext)
    console.log(categoryUrl)
        const [categoryList , setCatQuery] = useFilter(products || [] , (data) => data.category)
        useEffect(() => {
            setCatQuery(categoryUrl)
            setCategory(categoryUrl)
        },[categoryUrl])

        
        
        const [data , setSearchingQuery] = useFilter(products || [] , (data) => data.title) 

        const [categoryFilteredProducts , setCategoryList] = useMultipleTargetFilter(data || products || [] , (item) => item.category)
    
        const [priceFilteredProducts , setPriceQueryList] = useMultiplePriceFilter(categoryFilteredProducts || data || products || [])


        const [filteredProducts , setRatingQueryFilter] = useMultipleRatingFilter(priceFilteredProducts || categoryFilteredProducts || data || products || [])

        useEffect(() => {
            setSearchingQuery(searchQuery || "")
            setCategoryList(searchCategoryList || [])
            setPriceQueryList(filterPriceList || [])
            setRatingQueryFilter(filterRatingList || [])
        },[searchQuery , searchCategoryList , filterPriceList , filterRatingList , category])

        console.log(filteredProducts)
    
  return (
    <div className={`grid-cols-1 ${category =='smartphones' ? '2xl:grid-cols-4' : '2xl:grid-cols-3'}  ${category =='smartphones'? 'xl:grid-cols-3': 'xl:grid-cols-2'} ${category =='smartphones'? 'sm:grid-cols-2': 'sm:grid-cols-1'} ${searchQuery ? 'pb-[200px] gap-y-[190px]' : ''} grid  gap-[20px] justify-items-center items-center`}>
        {category == ''
             ? 
            searchQuery && searchQuery.length > 0 ? 
                filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item) => <TwoLayerCard key={item._id} item={item} />)  :
                filteredProducts && filteredProducts.length > 0 &&  filteredProducts.map((item) => <CategoryCard key={item._id} item={item} /> ) 
            :
            category == 'smartphones' ?categoryList && categoryList.length > 0 && categoryList.map((item) => <MobileCard key={item._id} item={item} />) :
            searchQuery && searchQuery.length > 0 ? 
                filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item) => <TwoLayerCard key={item._id} item={item} />)  :
            categoryList && categoryList.length > 0 && categoryList.map((item) => <CategoryCard key={item._id} item={item} />)
        }
    </div>
  )
}
FilteringItemsBody.propTypes = {
    products: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
}
export default FilteringItemsBody
