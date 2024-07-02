import React from "react";
import { Outlet } from "react-router-dom";

const JobseekerPage = () => {
  return (
    <div className="text-center text-2xl mt-4 font-bold">
      Jobseeker DashBoard
      <div style={{ margin: "50px", marginBottom: "100px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default JobseekerPage;
