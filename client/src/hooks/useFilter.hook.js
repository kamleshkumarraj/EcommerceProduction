import { useState } from "react"

export const useFilter = (dataList = [] , getTarget) => {
    const [query , setQuery] = useState("");
    const filteredData = dataList.filter((data) => getTarget(data).toLowerCase().includes(query.toLowerCase()));
    return [filteredData , setQuery];
}