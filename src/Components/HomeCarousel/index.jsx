"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const imageData = [
  { id: 1, src: "/images/carouselImages/7.jpg", alt: "Carousel Image 1" },
  { id: 2, src: "/images/carouselImages/8.jpg", alt: "Carousel Image 2" },
  { id: 3, src: "/images/carouselImages/9.jpg", alt: "Carousel Image 3" },
  { id: 4, src: "/images/carouselImages/10.jpg", alt: "Carousel Image 4" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) =>
          prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setIsPaused(true); // Pause autoslide when manually navigating
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsPaused(true); // Pause autoslide when manually navigating
    setCurrentIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setIsPaused(true); // Pause autoslide when an indicator is clicked
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full mx-auto overflow-hidden max-h-[220px] md:max-h-[510px]"
      onMouseEnter={() => setIsPaused(true)} // Pause on mouse hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageData.map((image) => (
          <div key={image.id} className="min-w-full flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              loading={currentIndex === image.id - 1 ? undefined : "lazy"} // Priority image without lazy loading
              priority={currentIndex === image.id - 1} // Set priority for the active image
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <IconButton
          onClick={handlePrev}
          aria-label="Previous image"
          className="bg-transparent text-white hover:bg-gray-600"
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          aria-label="Next image"
          className="bg-transparent text-white hover:bg-gray-600"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      {/* Indicators */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2"
      >
        {imageData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Go to image ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
