import React, { useState, useEffect, useContext } from "react";  // add useContext
import { CartContext } from "../context/CartContext";            // import your CartContext
import DrawerAppBar from "../components/Navbar";
import ImgMediaCard from "../components/ItemCard";
import { Box, Button, Tooltip } from "@mui/material";
import Datacarrier from "../data/Datacarrier";
import { useParams, useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import CartBtn from "../components/CartBtn";
import Search from "../components/search";

const hoverAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
  50% { transform: scale(1.05); box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); }
  100% { transform: scale(1); box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
`;

const fadeInButton = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Storepage = () => {
  const navigate = useNavigate();
  const { producttypeStore } = useParams();

  const { cart } = useContext(CartContext);  // <-- access cart context here

  const [showButton, setShowButton] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    let selectedItems = [];
    let title = "";

    switch (producttypeStore) {
      case "FoodStore":
        selectedItems = Datacarrier.FoodStore;
        title = "24 hours delivery within 30 minutes inside Sindhuli for Food Items";
        break;
      case "VehicleStore":
        selectedItems = Datacarrier.VehicalStore;
        title = "Make inquiry on any Vehicles below";
        break;
      case "GroceryStore":
        selectedItems = Datacarrier.GroceryStore;
        title = "Delivery only from 8AM to 8PM inside Sindhuli for Grocery Items";
        break;
      case "LiquorStore":
        selectedItems = Datacarrier.LiqureStore;
        title = "24 hours delivery within 30 minutes inside Sindhuli for Liquor";
        break;
      case "HerbalStore":
        selectedItems = Datacarrier.HerbalStore;
        title = "Delivery only from 8AM to 8PM inside Sindhuli for Bee herbal products";
        break;
      case "BakeryStore":
        selectedItems = Datacarrier.bakeryItems;
        title = "Delivery only from 8AM to 8PM inside Sindhuli for Bakery Items";
        break;
      default:
        alert("Something went wrong");
        selectedItems = [];
        title = "";
    }

    setItems(selectedItems);
    setSearchData(selectedItems);
    setTitleText(title);
  }, [producttypeStore]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCart = () => {
    navigate("/Addtocart");
  };

  // Calculate total items from cart context here
  const totalItemsCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <DrawerAppBar>
        {/* Pass totalItemsCount to CartBtn */}
        <CartBtn totalItems={totalItemsCount} handleCart={handleCart} />

        <br />
        <div className="container mx-auto px-4 overflow-x-hidden">
          <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
            <Search data={searchData} />
          </div>
        </div>

        <div
          style={{
            border: "2px solid #FFCC00",
            backgroundColor: "#FFF7CC",
            padding: "5px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "1400px",
            margin: "auto",
          }}
        >
          <span style={{ fontSize: 20, color: "#333" }}>{titleText}</span>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 2, sm: 3, md: 4 },
            maxWidth: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2, md: 3 },
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {items.map((dt, index) => (
              <ImgMediaCard
                key={index}
                data={dt}
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    animation: `${hoverAnimation} 1s ease-in-out`,
                  },
                }}
              />
            ))}
          </Box>

          {showButton && (
            <Tooltip title="Back to Top" arrow>
              <Button
                onClick={scrollToTop}
                sx={{
                  position: "fixed",
                  bottom: "30%",
                  right: 16,
                  fontSize: { xs: "20px", sm: "25px" },
                  padding: 2,
                  color: "white",
                  backgroundColor: "#007bff",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: showButton ? 1 : 0,
                  transform: showButton ? "translateY(0)" : "translateY(100px)",
                  animation: `${fadeInButton} 0.5s ease-out`,
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                ↑
              </Button>
            </Tooltip>
          )}
        </Box>
        <footer />
      </DrawerAppBar>
    </>
  );
};

export default Storepage;
