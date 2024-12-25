import React, { useState } from "react";
import "./Slider.css";

const Slider = () => {
  const images = [
    "http://192.168.1.99/tar/home/slider/slider1.jpg",
    "http://192.168.1.99/tar/home/slider/slider2.jpg",
    "http://192.168.1.99/tar/home/slider/slider3.jpg",
    "http://192.168.1.99/tar/home/slider/slider4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="slider-matn " style={{display:"none"}}>
          <p>متن مورد نظر متن مورد نظر متن مورد نظر</p>
          <button>بیشتر ...</button>
        </div>
      </div>

      <button className="arrow left-arrow" onClick={handlePrev}>
        &#11164;
      </button>
      <button className="arrow right-arrow" onClick={handleNext}>
        &#11166;
      </button>
    </div>
  );
};

export default Slider;
