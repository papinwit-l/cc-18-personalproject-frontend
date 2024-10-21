import React, { createContext } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = socketIO(import.meta.env.VITE_HOST_IP + "");
  //   const socket = "";

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
