import "./App.css";
import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Homepage from "./pages/homepage";

import Addtocart from "./pages/Addtocart";
import Storepage from "./pages/Storepage";

{
  /* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script> */
}

function App() {
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
    //
  );
}

export default App;
