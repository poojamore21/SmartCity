// ViewInfo.js
import React from "react";
import SelectOptions from "../../components/SelectOptions";

function BussinessView() {
  const categories = ["Hotels", "marketArea"]; // Your category menu items

  return (
    <div>
      <div className="flex-row text-center text-4xl mt-20">Find Places</div>
      <div className="flex flex-row justify-center mt-14">
        <SelectOptions categories={categories} />
      </div>
    </div>
  );
}

export default BussinessView;
