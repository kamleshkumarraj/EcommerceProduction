import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <GlobalContext.Provider value={{searchQuery, setSearchQuery}}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}