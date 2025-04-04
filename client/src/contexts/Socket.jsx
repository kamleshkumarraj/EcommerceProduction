import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext)?.socket;

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const socket = io("https://ecommerceproduction.onrender.com", {
      withCredentials: true,
    });
    return socket;
  }, []);

  socket.on("welcome message", (message) => {
    console.log(message);
  });

  socket.on("error", (message) => {
    console.log(message);
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
