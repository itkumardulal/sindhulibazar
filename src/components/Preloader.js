import React, { useEffect, useState } from "react";
import "./Preloader.css"; // You can style this with CSS

const Preloader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Set a timer for 3 seconds, after which the preloader will disappear
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Adjust the time in milliseconds as needed

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="preloader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;
