import { useSelector } from "react-redux"
import { getAllProducts } from "../../store/slices/productsHandler.slice"
import CategoryCard from "../card/CategoryCard"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import MobileCard from "../card/LengthCard"
import { useFilter } from "../../hooks/useFilter.hook"
import { GlobalContext } from "../../contexts/GlobalProvider"
import useSearch from "../../hooks/useSearch"
import FeaturedCard from "../card/FeaturedCard"
import TwoLayerCard from "../card/TwoLayerCard"

function FilteringItemsBody() {
    const products = useSelector(getAllProducts)
    const category = useLocation()?.state?.category || ""
    const [renderedProducts, setRenderedProducts] = useState([])
    const { searchQuery } = useContext(GlobalContext)

    const [filteredProducts , setQuery] = useFilter(products || [] , (data) => data.category)
    useEffect(() => {
        setQuery(category)
    },[category])

    const [data , setSearchQuery] = useSearch(filteredProducts || [], (data) => data.title)
    useEffect(() => {
        setSearchQuery(searchQuery || "") 
    },[searchQuery])
  return (
    <div className={`grid-cols-1 ${category =='smartphones' ? '2xl:grid-cols-4' : '2xl:grid-cols-3'}  ${category =='smartphones'? 'xl:grid-cols-3': 'xl:grid-cols-2'} ${category =='smartphones'? 'sm:grid-cols-2': 'sm:grid-cols-1'} ${searchQuery ? 'pb-[200px] gap-y-[190px]' : ''} grid  gap-[20px] justify-items-center items-center`}>
        {
            category == 'smartphones' ? data && data.length > 0 && data.map((item) => <MobileCard key={item._id} item={item} />) :
            searchQuery && searchQuery.length > 0 ? data && data.length > 0 && data.filter(item => item.category != 'smartphones').map((item) => <TwoLayerCard key={item._id} item={item} />) :
            data && data.length > 0 &&  data.filter(item => item.category != 'smartphones').map((item) => <CategoryCard key={item._id} item={item} />) 
        }
    </div>
  )
}

export default FilteringItemsBody
