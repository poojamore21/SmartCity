import React, { useEffect, useState } from "react";
import SelectOptions from "../../components/SelectOptions";
import apiRequest from "../../lib/apiRequest";
import SelectOptionsJob from "../../components/selectOptionsJob";

function JobSeekerViews() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiRequest.get("job/categories");
        if (response.status === 200) {
          console.log(response.data);
          setCategories(response.data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex-row text-center text-4xl mt-20">Find Jobs</div>
      <div className="flex flex-row justify-center mt-14">
        {categories.length > 0 ? (
          <SelectOptionsJob categories={categories} />
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
}

export default JobSeekerViews;
