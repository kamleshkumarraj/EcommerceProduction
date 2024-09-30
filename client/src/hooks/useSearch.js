import { useState } from "react"

function useSearch(dataList , getFilter) {
  const [searchQuery , setSearchQuery] = useState("");
  console.log("search",searchQuery)
  const filteredData = Object.keys(dataList).map((category) => {
    return dataList[category].filter((item) => getFilter(item).toLowerCase().includes(searchQuery.toLowerCase()))
  }) 
  const data = filteredData.flat(2)
  return [data , setSearchQuery];
}

export default useSearch
