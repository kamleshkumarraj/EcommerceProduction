import { useState } from "react";


export const useMultiplePriceFilter = (data) => {
    const [priceQueryList , setPriceQueryList] = useState([])
    if(priceQueryList.length == 0) return [data , setPriceQueryList]

    const filteredData = priceQueryList.flatMap((price) => {
        switch(price){
            case 'Below 99' : return data.filter((item) => item.price < 99);
            case '100 to 199' : return data.filter((item) => item.price >= 99 && item.price <= 199);
            case '200 to 499' : return data.filter((item) => item.price >= 200 && item.price <= 499);
            case '500 to 999' : return data.filter((item) => item.price >= 500 && item.price <= 999);
            case '1000 to 1999' : return data.filter((item) => item.price >= 1000 && item.price <= 1999);
            case '2000 to 4999' : return data.filter((item) => item.price >= 2000 && item.price <= 4999);
            case '5000 to 9999' : return data.filter((item) => item.price >= 5000 && item.price <= 9999);
            case '10000 to 19999' : return data.filter((item) => item.price >= 10000 && item.price <= 19999);
            case '20000 to 49999' : return data.filter((item) => item.price >= 20000 && item.price <= 49999);
            case 'Above 50000' : return data.filter((item) => item.price >= 50000);
            default: return data;
        }
            
    })

    console.log(filteredData)
    return [filteredData , setPriceQueryList]
}