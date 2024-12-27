import { useState } from "react";

export const useMultipleRatingFilter = (data) => {
  const [filterRatingList, setFilterRatingList] = useState([]);
  if (filterRatingList.length === 0) return [data, setFilterRatingList];

  const filteredData = filterRatingList.flatMap((rating) => {
    switch (rating) {
      case "1 Rating":
        return data.filter((item) => Math.floor(item.rating) === 1);
      case "2 Rating":
        return data.filter((item) => Math.floor(item.rating) === 2);
      case "3 Rating":
        return data.filter((item) => Math.floor(item.rating) === 3);
      case "4 Rating":
        return data.filter((item) => Math.floor(item.rating) === 4);
      case "5 Rating":
        return data.filter((item) => Math.floor(item.rating) === 5);
      default:
        return data;
    }
  });

  return [filteredData, setFilterRatingList];
};
