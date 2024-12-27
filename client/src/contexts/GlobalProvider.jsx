import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategoryList, setSearchCategoryList] = useState([]);
    const [filterPriceList , setFilterPriceList] = useState([])
    const [filterRatingList , setFilterRatingList] = useState([])
    const [category , setCategory] = useState("");
    const [eventLoading , setEventLoading] = useState(false)
  return (
    <GlobalContext.Provider value={{searchQuery, setSearchQuery , searchCategoryList , setSearchCategoryList , filterPriceList , setFilterPriceList , filterRatingList , setFilterRatingList , category , setCategory , eventLoading , setEventLoading}}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}