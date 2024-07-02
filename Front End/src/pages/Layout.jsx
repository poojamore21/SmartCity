import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className=" bg-slate-100 min-h-screen">
      <div>
        <Navbar />
         <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
