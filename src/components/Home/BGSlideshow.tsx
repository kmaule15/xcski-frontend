import React, { useState, useEffect } from 'react';
import './BGSlideshow.css';

const BackgroundSlideshow = () => {
  const images = [
    'BigMount.jpg',
    'Crosscountry.jpg',
    'Whistler.jpg',
    // Add more image filenames as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate the index of the next image
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 8000); // Change the image every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, images.length]);



  return (
    <div className="background-slideshow">
    {images.map((image, index) => (
      <div
        key={index}
        className={`background-image ${index === currentIndex  ? 'active' : ''}`}
        style={{
          backgroundImage: `url('/Static/${image}')`,
        }}
      ></div>
    ))}
  </div>
  );
};

export default BackgroundSlideshow;
