import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen">
      <div className="h-[3rem]">
        <Header />
      </div>
      <div className="h-[calc(100%-3rem)]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
