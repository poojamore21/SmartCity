import React from "react";
import { Outlet } from "react-router-dom";
import PlaceCard from "../../components/PlaceCard";

function AdminHomepage() {
  return (
    <div>
      <div style={{ margin: "50px", marginBottom: "100px" }}>
        <Outlet />
        {/* <PlaceCard /> */}
      </div>
    </div>
  );
}

export default AdminHomepage;
