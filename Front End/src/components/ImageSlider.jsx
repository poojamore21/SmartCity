import { useState } from "react";
// import "./slider.css"; // Ensure to create and import this CSS file for any custom styling.

function Slider({ images }) {
  console.log(images);

  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider w-full h-88 flex gap-5 sm:h-70">
      {imageIndex !== null && (
        <div className="fullSlider fixed top-0 left-0 w-screen h-screen bg-black flex justify-between items-center z-50">
          <div
            className="arrow flex-1 flex items-center justify-center"
            onClick={() => changeSlide("left")}
          >
            <img
              src="/arrow.png"
              alt="Left arrow"
              className="w-12 md:w-8 sm:w-5"
            />
          </div>
          <div className="imgContainer flex-10">
            <img
              src={images[imageIndex]}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="arrow flex-1 flex items-center justify-center"
            onClick={() => changeSlide("right")}
          >
            <img
              src="/arrow.png"
              alt="Right arrow"
              className="w-12 md:w-8 sm:w-5 transform rotate-180"
            />
          </div>
          <div
            className="close absolute top-0 right-0 text-white text-4xl font-bold p-12 cursor-pointer"
            onClick={() => setImageIndex(null)}
          >
            X
          </div>
        </div>
      )}
      <div className="bigImage flex-3 sm:flex-2">
        <img
          src={images[0]}
          alt="Main image"
          className="w-full h-full object-cover rounded cursor-pointer"
          onClick={() => setImageIndex(0)}
        />
      </div>
      <div className="smallImages flex-1 flex flex-col justify-between gap-5 sm:gap-2.5">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            className="h-25 sm:h-20 object-cover rounded cursor-pointer"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
