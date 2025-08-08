import React, { useEffect } from "react";
import vehicleData from "../data/vehicleData.json";
import DrawerAppBar from "../components/Navbar";
import VehicleDisplay from "../components/Vehiclepagecom/VehicleDisplay";
import scrollToTop from "../tinyfunction/scrollToTop";

const VehiclePage = () => {
    useEffect(() => {
      scrollToTop();  }, [1]);
  return (
    <>
      <DrawerAppBar />
      <div className="w-full h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
        <div className="w-full h-full px-4 md:px-10 py-6 overflow-y-auto">
          <VehicleDisplay vehicle={vehicleData.vehicle} />
        </div>
      </div>
    </>
  );
};

export default VehiclePage;
