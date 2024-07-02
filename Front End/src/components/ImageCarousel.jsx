import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import apiRequest from "../lib/apiRequest";

const ImageCarousel = () => {
  const [images, setimages] = useState([]);
  const GetImages = async () => {
    const res = await apiRequest.get("/carousel");
    setimages(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    GetImages();
  }, []);

  console.log( images[0] );

  return (
    <div className="bg-black">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        className="max-h-64"
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.photos} alt={`Slide ${index}`} className="max-h-[640px]" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
