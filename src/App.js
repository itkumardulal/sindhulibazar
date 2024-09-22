import './App.css';
import { Route, Routes } from 'react-router-dom'

import About from './pages/About';
import Contact from './pages/Contact';
import Homepage from './pages/homepage';
import Liqureshop from './pages/Liqureshop';
import Foodstore from './pages/Foodstore';
import Grocerystore from './pages/Grocerystore';
import Vechicalrenting from './pages/Vechicalrenting';
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>




function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path="/" element={<Homepage/>} />
          <Route path="/home" element={<Homepage/>} />
          <Route path="/LiquorStore" element={<Liqureshop/>} />
          <Route path="/FoodStore" element={<Foodstore/>} />
          <Route path="/GroceryStore" element={<Grocerystore/>} />
          <Route path="/VehicleRenting" element={<Vechicalrenting/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
      </Routes>
     
    </div>
    //
  );
}

export default App;
