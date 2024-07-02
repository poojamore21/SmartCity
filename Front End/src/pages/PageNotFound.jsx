import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Oops! Page Not Found</h1>
      <img src="/404.png" alt="Page Not Found" className="w-80 h-80 mb-8" />
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default PageNotFound;
