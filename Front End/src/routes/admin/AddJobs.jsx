import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import apiRequest from "../../lib/apiRequest";
import { indiaStates } from "../../lib/DummyData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJobPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobCategory: "",
    companyName: "",
    jobDescription: "",
    vacancies: "",
    contactNumber: "",
    state: "",
    city: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest.post("/job", formData);
      if (response.status === 201) {
        toast.success("Job added successfully!");
        setFormData({
          title: "",
          jobCategory: "",
          companyName: "",
          jobDescription: "",
          vacancies: "",
          contactNumber: "",
          state: "",
          city: "",
          address: "",
          description: "",
        });
      } else {
        console.error("Failed to add job:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add job:", error.message);
    }
  };

  return (
    <div className="mb-40">
      <h1 className="text-center text-2xl mb-2">Add Job</h1>
      <form onSubmit={handleSubmit} className="mx-96">
        {/* Form fields */}
        {/* TextField for title */}
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* TextField for company name */}
        <TextField
          name="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* TextField for job category */}
        <TextField
          name="jobCategory"
          label="Job Category"
          value={formData.jobCategory}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* TextField for job description */}
        <TextField
          name="jobDescription"
          label="Job Description"
          value={formData.jobDescription}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        {/* TextField for vacancies */}
        <TextField
          name="vacancies"
          label="Vacancies"
          value={formData.vacancies}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          margin="normal"
        />
        {/* TextField for contact number */}
        <TextField
          name="contactNumber"
          label="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* Select dropdown for state */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            name="state"
            id="state"
            variant="outlined"
            fullWidth
            value={formData.state}
            onChange={(e) => {
              handleChange(e);
              setFormData((prevData) => ({
                ...prevData,
                city: "",
              }));
            }}
          >
            {Object.keys(indiaStates).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Select dropdown for city */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="city">City</InputLabel>
          <Select
            name="city"
            id="city"
            variant="outlined"
            fullWidth
            value={formData.city}
            onChange={handleChange}
          >
            {formData.state &&
              indiaStates[formData.state]?.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* TextField for address */}
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* TextField for description */}
        <TextField
          name="description"
          label="Company Email"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        {/* Submit button */}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddJobPage;
