import React, { useState } from "react";
import {
  TextField,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { indiaStates } from "../../lib/DummyData";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget";
import { toast } from "react-toastify";

const initialValues = {
  category: "",
  placeName: "",
  state: "",
  city: "",
  address: "",
  description: "",
  photos: [],
};

const categories = ["ATM", "Hospital", "Hotels", "TouristPlace", "hotel"];

const CreatePlace = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: event.currentTarget.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (Object.values(formData).some((value) => value === "")) {
        toast.error("Please fill in all fields");
        return;
      }

      const data = await apiRequest.post("/place", {
        photos: images,
        category: formData.category,
        placeName: formData.placeName,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        description: formData.description,
      });
      console.log("Place created successfully!", data);
      toast.success("Place created successfully!");
      setFormData(initialValues);
      setImages([]);
      console.log("all cleears created successfully");
    } catch (error) {
      console.error("Error creating place:", error);
    } finally {
      setIsSubmitting(false);
    }
    console.log(images);
  };

  return (
    <div>
      <h1 className="text-center text-2xl text-black mt-4 h-full">Create Places</h1>
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <form onSubmit={handleSubmit} style={{ width: "500px" }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              name="category"
              id="category"
              variant="outlined"
              fullWidth
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="placeName"
            label="Place Name"
            variant="outlined"
            fullWidth
            value={formData.placeName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
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
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <div>
            <div className="grid grid-cols-4  gap-4 ">
              {images.map((image, index) => (
                <img src={image} key={index} alt="" className="h-28 w-24" />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <p>Upload Photos</p>
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "dj6qf1phv",
                uploadPreset: "yogesh-real-state",
                folder: "avatars",
              }}
              setState={setImages}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreatePlace;
