import React, { useState, useEffect } from "react";
import UploadWidget from "../../components/UploadWidget";
import apiRequest from "../../lib/apiRequest";
import { CircularProgress } from "@mui/material";

const CreateCaurosel = () => {
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/carousel");
        setPhotos(response.data);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to fetch photos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const createCaurosel = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.post("/carousel", {
          photos: images.toString(),
        });
        console.log({ response });
        setImages("");
        setSuccess(true);
        // Refresh photos after creating carousel
        const updatedResponse = await apiRequest.get("/carousel");
        setPhotos(updatedResponse.data);
      } catch (err) {
        console.error("Error creating carousel:", err);
        setError("Failed to update carousel. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (images && images !== "") {
      createCaurosel();
    }
  }, [images]);

  const deleteImage = async (id) => {
    try {
      setLoading(true);
      await apiRequest.delete(`/carousel/${id}`);
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
      setSuccess(true);
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold mt-10 mb-6">
        Update Carousel
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo.photos}
              alt={`Uploaded Image ${index + 1}`}
              className="h-40 w-full object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={() => deleteImage(photo.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <UploadWidget
          uwConfig={{
            multiple: false,
            cloudName: "dj6qf1phv",
            uploadPreset: "yogesh-real-state",
            folder: "avatars",
          }}
          setState={setImages}
        />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress size={24} />
        </div>
      ) : (
        <div className="text-center">
          {error && <div className="text-red-600 mt-4">{error}</div>}
          {success && (
            <div className="text-green-600 mt-4">
              Carousel updated successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateCaurosel;
