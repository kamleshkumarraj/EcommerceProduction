import { useState } from "react"

export const useMultipleTargetFilter = (data, cb) => {
    const [queryList , setQueryList] = useState([]);
    if(queryList.length == 0) return [data , setQueryList]
    const filteredData = queryList.flatMap((query) => {
        return data.filter((item) => cb(item).toLowerCase().trim().includes(query.toLowerCase().trim()))
    })
   
    console.log(filteredData)
    return [filteredData , setQueryList];
}