import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// Pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Homepage from "./pages/homepage";
import Addtocart from "./pages/Addtocart";
import Storepage from "./pages/Storepage";
import Rpmcheckup from "./pages/Rpmcheckup";

// Components
import SplashScreen from "./components/SplashScreen";
import VehiclePage from "./pages/VehiclePage";
import FoodGenerator from "./pages/FoodGenerator";
import GiftLandingPage from "./pages/GiftLandingPage";
import { Toaster } from "react-hot-toast";
import PromoCardGiftForFriend from "./components/orderforfriendcom/PromoCardGiftForFriend";
import AdmissionPage from "./pages/Admissionpage";
import KhyalGLanding from "./components/KhyalG";
import AdminControl from "./pages/AdminControl";
import AllOrders from "./pages/AllOrders";
import Footer from "./components/footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Main content grows to fill space */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Addtocart" element={<Addtocart />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/:producttypeStore" element={<Storepage />} />
          <Route path="/SecondHandStore" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rpmcheckup" element={<Rpmcheckup />} />
          <Route path="/vehicleinfo" element={<VehiclePage />} />
          <Route path="/FoodGenerator" element={<FoodGenerator />} />
          <Route path="/order_for_friend/:id" element={<GiftLandingPage />} />
          <Route path="/myorders" element={<AllOrders />} />
          <Route
            path="/order_for_friend/giftpromo"
            element={<PromoCardGiftForFriend />}
          />
          <Route path="/btech_sindhuli" element={<AdmissionPage />} />
          <Route path="/Khyalg" element={<KhyalGLanding />} />
          <Route path="/admin123" element={<AdminControl />} />
        </Routes>
      </div>

      {/* Footer visible on all pages */}
      <Footer />

      {/* Toaster notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
