import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Preloader from "./components/Preloader"; // Import the preloader component
import About from "./pages/About";
import Contact from "./pages/Contact";
import Homepage from "./pages/homepage";
import Addtocart from "./pages/Addtocart";
import Storepage from "./pages/Storepage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false only after the entire page is fully loaded
    const handleLoad = () => setLoading(false);

    // Listen for the load event on window
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (loading) {
    // Render Preloader if loading is true
    return <Preloader />;
  }

  // Render main content if loading is false
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Addtocart" element={<Addtocart />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/:producttypeStore" element={<Storepage />} />
        <Route path="/SecondHandStore" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
