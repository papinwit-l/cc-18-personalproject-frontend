import React, { createContext } from "react";
import socketIO from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = socketIO("http://localhost:8000");
  //   const socket = "";

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
