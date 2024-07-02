import React from "react";
import { Outlet } from "react-router-dom";

function TouristPage() {
  return (
    <div>
      <h1 className="text-2xl text-center mt-10 font-bold">
        Tourist Dashboard
      </h1>
      <div style={{ margin: "50px", marginBottom: "100px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default TouristPage;
