import './App.css';
import { Route, Routes } from 'react-router-dom'

import About from './pages/About';
import Contact from './pages/Contact';
import Homepage from './pages/homepage';
import Liqureshop from './pages/Liqureshop';



function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path="/" element={<Homepage/>} />
          <Route path="/home" element={<Homepage/>} />
          <Route path="/Liquor" element={<Liqureshop/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
      </Routes>
     
    </div>
    //
  );
}

export default App;
