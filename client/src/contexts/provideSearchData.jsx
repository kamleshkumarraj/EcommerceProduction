import { createContext } from "react"
import useSearch from "../hooks/useSearch"
import { news } from "../data"

export const SearchDataContext = createContext()


function SearchDataProvider({children}) {
    const [filteredData , setSearchQuery] = useSearch(news , (data) => data.title)
  
  return (
    <SearchDataContext.Provider value={{filteredData , setSearchQuery}} >
        {children}
    </SearchDataContext.Provider>
  )
}

export default SearchDataProvider
