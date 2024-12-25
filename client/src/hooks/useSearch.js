import { useState } from "react"

function useSearch(dataList , getFilter) {
  const [searchQuery , setSearchQuery] = useState("");
  console.log("search",searchQuery)
  const data = dataList.filter((item) => getFilter(item).toLowerCase().includes(searchQuery.toLowerCase().trim()))
  return [data , setSearchQuery];
}

export default useSearch
