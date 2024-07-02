import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Slider from "./ImageSlider";

const PlaceCard = ({ place }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const handleCloseSlider = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row gap-4 bg-white rounded-md shadow-lg p-6">
      <div className="hover:shadow-2xl transition-transform duration-200 hover:scale-105">
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {place.placeName}
            </Typography>
            <div className="border-t border-gray-200">
              <table className="w-full">
                <tbody className="font-bold">
                  <TableRow label="ID" value={place.id} />
                  <TableRow label="Category" value={place.category} />
                  <TableRow label="Place Name" value={place.placeName} />
                  <TableRow label="City" value={place.city} />
                  <TableRow label="State" value={place.state} />
                  <TableRow label="Address" value={place.address} />
                  <TableRow label="Description" value={place.description} />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {isOpen && (
        <Slider
          images={place.photos}
          isOpen={isOpen}
          initialIndex={selectedImageIndex}
          onClose={handleCloseSlider}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        {place.photos.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="object-cover w-full h-full rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-200 hover:scale-105"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b border-gray-200">
    <td className="px-4 py-2">{label}</td>
    <td className="px-4 py-2">{value}</td>
  </tr>
);

export default PlaceCard;
