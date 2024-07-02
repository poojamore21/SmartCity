// ViewInfo.js
import React from "react";
import SelectOptions from "../../components/SelectOptions";

function StudentViewInfo() {
  const categories = [
    "hostel",
    "college",
    "coachingCenter",
    "library",
    "studyHall",
  ];

  return (
    <div>
      <div className="flex-row text-center text-4xl mt-20">Find Places</div>
      <div className="flex flex-row justify-center mt-14">
        <SelectOptions categories={categories} />
      </div>
    </div>
  );
}

export default StudentViewInfo;
