import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <GlobalContext.Provider value={{searchQuery, setSearchQuery}}>{children}</GlobalContext.Provider>
  );
};