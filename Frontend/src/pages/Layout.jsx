// Layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Sidebar />
          <div className="container mx-auto p-4 flex-1">
           {/* Outlet for the children */}
           <Outlet/>
          </div>
        </div>
      </div>
  );
};

export default Layout;
