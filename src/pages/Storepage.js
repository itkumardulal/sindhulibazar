import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import DrawerAppBar from "../components/Navbar";
import ImgMediaCard from "../components/productcardview/ImgMediaCard";
import { Box, Button, Tooltip } from "@mui/material";
import Datacarrier from "../data/Datacarrier";
import { useParams, useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import CartBtn from "../components/CartBtn";
import Search from "../components/search";
import LoadingOverlay from "../components/LoadingOverlay"; // 👈 Import the overlay

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
  const { cart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [items, setItems] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let selectedItems = [];
      let title = "";

      switch (producttypeStore) {
        case "FoodStore":
          selectedItems = Datacarrier.FoodStore;
          title =
            "24 hours delivery within 30 minutes inside Sindhuli for Food Items";
          break;
        case "VehicleStore":
          selectedItems = Datacarrier.VehicalStore;
          title = "Make inquiry on any Vehicles below";
          break;
        case "GroceryStore":
          selectedItems = Datacarrier.GroceryStore;
          title =
            "Delivery only from 8AM to 8PM inside Sindhuli for Grocery Items";
          break;
        case "LiquorStore":
          selectedItems = Datacarrier.LiqureStore;
          title =
            "24 hours delivery within 30 minutes inside Sindhuli for Liquor";
          break;
        case "HerbalStore":
          selectedItems = Datacarrier.HerbalStore;
          title =
            "Delivery only from 8AM to 8PM inside Sindhuli for Bee herbal products";
          break;
        case "BakeryStore":
          selectedItems = Datacarrier.bakeryItems;
          title =
            "Delivery only from 8AM to 8PM inside Sindhuli for Bakery Items";
          break;
        default:
          alert("Something went wrong");
          selectedItems = [];
          title = "";
      }

      setItems(selectedItems);
      setSearchData(selectedItems);
      setTitleText(title);
      setLoading(false);
    }); // simulate loading delay

    return () => clearTimeout(timeout);
  }, [producttypeStore]);


useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 20); // adjust threshold
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleCart = () => navigate("/Addtocart");

  const totalItemsCount = cart.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  return (
    <>
      {loading && <LoadingOverlay />}

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <DrawerAppBar>
        <CartBtn totalItems={totalItemsCount} handleCart={handleCart} />

        <br />
<div
  style={{
    width: "100%",
    position: isSticky ? "sticky" : "relative",
    top: isSticky ? 0 : "auto",
    zIndex: 1100,
    backgroundColor: "#fff", // always white to prevent flashing
    padding: "8px 0",
    boxShadow: isSticky ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
    transition: "box-shadow 0.3s ease",
    marginTop:"-10px",
  }}
>
  <Search data={searchData} />
</div>



        <div
          style={{
            // padding: "10px 20px",
            borderRadius: "15px",
            textAlign: "center",
            maxWidth: "1400px",
            margin: "auto",
            position: "relative",
            animation: "slideFadeIn 0.6s ease forwards",
          }}
        >
<span
  style={{
    fontSize: "clamp(14px, 2vw, 18px)", // responsive font size between 14px and 18px
    color: "#333",
    fontWeight: 600,
    paddingBottom: "6px",
    borderBottom: "3px solid #E63946",
    display: "inline-block",
    width: "80%", // set width to 80%
    textAlign: "center", // center the text within 80% width
    letterSpacing: "0.03em",
    animation: "underlineGrow 0.6s ease forwards",
  }}
>
  {titleText}
</span>


          <style>{`
            @keyframes slideFadeIn {
              0% { opacity: 0; transform: translateY(-15px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes underlineGrow {
              0% { border-bottom-width: 0; }
              100% { border-bottom-width: 3px; }
            }
          `}</style>
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
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2, md: 3 },
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              boxSizing: "border-box",
              justifyContent: "center",
            }}
          >
            {items.map((dt, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 1 auto", // allow card to size itself
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ImgMediaCard data={dt} index={index} />
              </Box>
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
   
      </DrawerAppBar>
    </>
  );
};

export default Storepage;
