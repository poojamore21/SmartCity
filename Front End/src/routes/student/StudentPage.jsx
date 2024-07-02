import React from "react";
import { Outlet } from "react-router-dom";

const StudentPage = () => {
  return (
    <div className="text-center text-2xl mt-4 font-bold">
      Student DashBoard
      <div style={{ margin: "50px", marginBottom: "100px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentPage;
