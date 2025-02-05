import React, { useState, useEffect } from "react";
import "./CoverSlider.css";

const CoverSlider = () => {
  // Array of YouTube video IDs
  const slides = ["EggPbC987Kw", "COPxGpr0Tc8", "PNVvDo2HTpo"];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  // Timer function to automatically transition slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 10000); // 10000ms = 10 seconds
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="cover-slider-container">
      {/* YouTube video iframe */}
      <iframe
        src={`https://www.youtube.com/embed/${slides[currentIndex]}?autoplay=1&controls=0&mute=1&showinfo=0&modestbranding=1&rel=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="cover-video"
        title={`Cover ${currentIndex + 1}`}
      ></iframe>

      {/* Left and Right buttons */}
      <button className="left-button" onClick={prevSlide}>
        &#9664;
      </button>
      <button className="right-button" onClick={nextSlide}>
        &#9654;
      </button>
    </div>
  );
};

export default CoverSlider;
