import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WhatsappInquiry from "../../messagecarrier/WhatsappInquiry";

// Data for the vehicle, assuming it's imported or defined here
const vehicleData = {
  vehicle: {
    vendor: "Siddhababa Trade And Concern, Sindhuli",
    type: "Electric Commercial ",
    name: "King Long EV Van",
    seater: 11,
    speed: " up to 100km/hour",
    motorPower: "80 kW PMSM",
    battery: "50.23 kWh LiFePO4 (CATL)",
    rangeKm: "300 km per charge (NEDC)",
    price: 3999000, // Estimated NPR based on market
    discount: 200000,
    currentPrice: 3799000,
    facility: "30% Downpayment 70% Finance",
    ac: "Dual AC ",
    airbag: "Dual Airbag ",
    warranty: {
      battery: "5 years or 200,000 km",
      motor: "5 years or 200,000 km",
    },
    groundClearance: "180 mm",
    colorOptions: ["White", "Silver"],
    images: [
      "https://raw.githubusercontent.com/itkumardulal/sindhulibazaritems/d7b326d7f2d7b010b3b9405eb16aa2cc5e0acc62/Vehicle/kyc11.png",
      "https://raw.githubusercontent.com/itkumardulal/sindhulibazaritems/d7b326d7f2d7b010b3b9405eb16aa2cc5e0acc62/Vehicle/kyc22.png",
      "https://raw.githubusercontent.com/itkumardulal/sindhulibazaritems/d7b326d7f2d7b010b3b9405eb16aa2cc5e0acc62/Vehicle/kyc33.png",
      "https://raw.githubusercontent.com/itkumardulal/sindhulibazaritems/d7b326d7f2d7b010b3b9405eb16aa2cc5e0acc62/Vehicle/kyc44.png",
    ],
  },
};

// Helper component for displaying specification icons
const SpecIcon = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {" "}
    {/* flex items-center space-x-3 */}
    <div
      style={{
        backgroundColor: "#f3f4f6",
        padding: "5px",
        borderRadius: "8px",
      }}
    >
      {" "}
      {/* bg-gray-100 p-2 rounded-lg */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "23px", width: "23px", color: "#4b5563" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icon}
      </svg>{" "}
      {/* h-6 w-6 text-gray-600 */}
    </div>
    <div>
      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{label}</p>{" "}
      {/* text-sm text-gray-500 */}
      <p style={{ fontWeight: "350", color: "#1f2937" }}>{value}</p>{" "}
      {/* font-semibold text-gray-800 */}
    </div>
  </div>
);

// Main component to display the vehicle details
export default function VehicleDisplay() {
  const { vehicle } = vehicleData;
  const [selectedImage, setSelectedImage] = useState(vehicle.images[0]);
  const [selectedColor, setSelectedColor] = useState(vehicle.colorOptions[0]);
  const [resizingImage, setResizingImage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgheight, setImgHeight] = useState(300);
  const [whatsAppMessage, setWhatsAppMessage] = useState("");

  const handleInquiry = () => {
    const message = `
🔍 Vehicle Inquiry
---------------------------
🚗 Name: ${vehicle.name}
💰 Price: ₹${vehicle.currentPrice.toLocaleString("ne-NP")}
🔧 Warranty: Motor - ${vehicle.warranty.motor}, Battery - ${
      vehicle.warranty.battery
    }
❄️ AC: ${vehicle.ac}
🛡️ Airbag: ${vehicle.airbag}
📍 Vendor: ${vehicle.vendor}
🖼️ Image: ${vehicle.images?.[0] || "No image available"}
`;

    setWhatsAppMessage(message);
  };

  // Update resizingImage when windowWidth changes
  useEffect(() => {
    if (windowWidth < 700) {
      setResizingImage("cover");
      setImgHeight(250);
    } else {
      setResizingImage("contain");
      setImgHeight(700);
    }
  }, [windowWidth]);
  //   console.log(windowWidth);

  //   return <div>Current window width: {windowWidth}px</div>;

  // Function to handle inquiry button click

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {" "}
      {/* bg-gray-50 min-h-screen font-sans */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "10px",
          marginBottom: "10px",
          marginTop: "-60px",
        }}
      >
        {" "}
        {/* container mx-auto p-4 lg:p-8 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {" "}
          {/* bg-white shadow-xl rounded-2xl overflow-hidden */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              "@media (min-width: 1024px)": { gridTemplateColumns: "1fr 1fr" },
            }}
          >
            {" "}
            {/* grid grid-cols-1 lg:grid-cols-2 */}
            {/* Image Gallery Section */}
            <div style={{ padding: "24px", backgroundColor: "#f3f4f6" }}>
              {" "}
              {/* p-6 md:p-8 bg-gray-100 */}
              {/* Image container with a flexible height to prevent layout breaking, max height set */}
              <div
                style={{
                  marginBottom: "16px",
                  height: `${imgheight}px`,
                  maxHeight: "350px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                {/* mb-4 h-80 md:max-h-96 rounded-xl overflow-hidden shadow-md bg-gray-200 flex items-center justify-center */}
                <img
                  src={selectedImage}
                  alt={`${vehicle.name} - ${selectedColor}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: `${resizingImage}`,
                    transition: "transform 0.3s ease-in-out",
                  }} // w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/e2e8f0/e2e8f0?text=Image+Not+Found";
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "8px",
                }}
              >
                {" "}
                {/* grid grid-cols-4 gap-2 md:gap-4 */}
                {vehicle.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "2px solid",
                      //   height: "100px",
                      borderColor:
                        selectedImage === image ? "#3b82f6" : "transparent",
                      transition: "all 0.2s ease-in-out",
                      boxShadow:
                        selectedImage === image
                          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                          : "none",
                    }} // cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === image ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-blue-300'}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: `${resizingImage}`,
                      }} // w-full h-full object-cover
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/100x75/e2e8f0/e2e8f0?text=Thumb";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Vehicle Details Section */}
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {vehicleData.vehicle.facility && (
                <div
                  style={{
                    backgroundColor: "#FEF9C3", // light yellow
                    border: "1px solid #FACC15", // yellow border
                    color: "#92400E", // dark amber text
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    display: "inline-block",
                  }}
                >
                  🎁 {vehicleData.vehicle.facility}
                </div>
              )}

              {/* p-6 md:p-8 flex flex-col justify-between */}
              <div>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: "600",
                    display: "inline-block",
                    padding: "4px 8px",
                    textTransform: "uppercase",
                    borderRadius: "9999px",
                    color: "#2563eb",
                    backgroundColor: "#bfdbfe",
                  }}
                >
                  {" "}
                  {/* text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 */}
                  {vehicle.type} Vehicle
                </span>
                <h1
                  style={{
                    fontSize: "1.9rem",
                    lineHeight: "1.9rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginTop: "1px",
                    marginBottom: "5px",
                  }}
                >
                  {vehicle.name}
                </h1>{" "}
                {/* text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 */}
                {/* Price Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    marginBottom: "24px",
                  }}
                >
                  {/* Current Price */}
                  <p
                    style={{
                      fontSize: "clamp(1.5rem, 2vw, 2.2rem)",
                      fontWeight: "700",
                      color: "#FF5714",
                      margin: 0,
                    }}
                  >
                    ₹{vehicle.currentPrice.toLocaleString("ne-NP")}
                  </p>

                  {/* Original Price and Discount */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "10px",
                      marginTop: "6px",
                    }}
                  >
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#9CA3AF",
                        fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                        margin: 0,
                      }}
                    >
                      ₹{vehicle.price.toLocaleString("ne-NP")}
                    </p>

                    <p
                      style={{
                        color: "#16A34A",
                        fontWeight: "600",
                        fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                        margin: 0,
                      }}
                    >
                      Save ₹{vehicle.discount.toLocaleString("ne-NP")}
                    </p>
                  </div>
                </motion.div>
                {/* inquiry btns  */}
                <div style={{ marginBottom: "10px" }}>
                  {" "}
                  {/* mb-8 */}
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "12px",
                    }}
                  >
                    Color
                  </h3>{" "}
                  {/* text-lg font-semibold text-gray-800 mb-3 */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    {/* flex space-x-3 */}
                    {vehicle.colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "9999px",
                          border: "2px solid",
                          borderColor:
                            selectedColor === color ? "#3b82f6" : "#d1d5db",
                          transition: "transform 0.2s ease-in-out",
                          backgroundColor: color.toLowerCase(),
                          outline:
                            selectedColor === color
                              ? "2px solid #19d4cbff"
                              : "none",
                          outlineOffset: selectedColor === color ? "1px" : "0",
                        }} // w-8 h-8 rounded-full border-2 transition-transform duration-200 transform hover:scale-110 ${selectedColor === color ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-1' : 'border-gray-300'}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "auto" }}>
                  {/* mt-auto */}
                  <button
                    onClick={handleInquiry}
                    style={{
                      width: "100%",
                      backgroundColor: "#FDB813",
                      color: "#ffffff",
                      fontWeight: "600",
                      padding: "10px 24px",
                      borderRadius: "12px",
                      fontSize: "1.125rem",
                      border: "none",
                      cursor: "pointer",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s ease-in-out",
                    }} // w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1
                  >
                    Make an Inquiry
                  </button>
                  {whatsAppMessage && (
                    <WhatsappInquiry
                      message={whatsAppMessage}
                      phone="9779741667448"
                    />
                  )}
                </div>
                {/* Specifications */}
                <p
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    marginTop: "20px",
                    backgroundColor: "#F3F4F6", // light gray background
                    color: "#374151", // dark text
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  📍 Supplied by: {vehicle.vendor}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    rowGap: "24px",
                    columnGap: "16px",
                    marginBlock: "32px",
                  }}
                >
                  {" "}
                  {/* grid grid-cols-2 gap-y-6 gap-x-4 my-8 */}
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    }
                    label="Motor Power"
                    value={vehicle.motorPower}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    }
                    label="Battery"
                    value={vehicle.battery}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    }
                    label="Range"
                    value={vehicle.rangeKm}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    }
                    label="Ground Clearance"
                    value={vehicle.groundClearance}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    }
                    label="Seater"
                    value={`${vehicle.seater} Persons`}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    }
                    label="Warranty"
                    value={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <span>Motor: {vehicle.warranty.motor}</span>
                        <span>Battery: {vehicle.warranty.battery}</span>
                      </div>
                    }
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 7h12M6 12h12M6 17h12" // simple AC-like icon (3 lines)
                      />
                    }
                    label="AC"
                    value={`${vehicle.ac} ✅️`}
                  />
                  <SpecIcon
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2L3 7v6c0 5 9 9 9 9s9-4 9-9V7l-9-5z M12 9v5" // shield-like airbag icon
                      />
                    }
                    label="Airbag"
                    value={`${vehicle.airbag} ✅️`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
