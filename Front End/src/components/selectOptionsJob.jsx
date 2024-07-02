import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { indiaStates } from "../lib/DummyData"; // Import the indiaStates data
import { useNavigate } from "react-router-dom";

export default function SelectOptionsJob({ categories }) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigatve = useNavigate();
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(""); // Reset city when state changes
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = () => {
    // Construct the URL with parameters
    const url = `/jobseeker/jviewplace/${selectedState}/${selectedCity}/${selectedCategory}`;

    // Navigate to the next page with parameters
    navigatve(url);
  };

  const handleReset = () => {
    // Reset selected state, city, and category
    setSelectedState("");
    setSelectedCity("");
    setSelectedCategory("");
  };

  return (
    <div className="flex-col hover:flex-row w-80 space-y-4">
      <div>
        <FormControl className="w-80">
          <InputLabel id="state-select-label">Select State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={selectedState}
            label="Select State"
            onChange={handleStateChange}
          >
            {Object.keys(indiaStates).map((state) => (
              <MenuItem key={state} value={state}>
                {state.replace(/_/g, " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>{" "}
      <div>
        {selectedState && (
          <FormControl className="w-80">
            <InputLabel id="city-select-label">Select City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={selectedCity}
              label="Select City"
              onChange={handleCityChange}
            >
              {indiaStates[selectedState].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div>
        <FormControl className="w-80">
          <InputLabel id="category-select-label">Find Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Find Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="space-x-4">
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>

        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
