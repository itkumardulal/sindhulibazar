import React, { useContext, useEffect, useState, useMemo } from "react";
import "./homepage.css";
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import Datacarrier from "../data/Datacarrier";
import Servicesbtn from "../components/homepagecom/Servicesbtn";
import CartBtn from "../components/CartBtn";
import Search from "../components/search";
import { CartContext } from "../context/CartContext";
import FeaturedProducts from "../components/homepagecom/FeaturedProducts";
import EvVehicleBooking from "../components/Services/EvVehicleBooking";
import FoodMenuCanva from "../components/homepagecom/FoodMenuCanva";

import RakshyaBandhan from "../components/offerwalls/RakshyaBAndhan";
import scrollToTop from "../tinyfunction/scrollToTop";
import StudyIt from "../components/offerwalls/StudyIt";
import FeaturedRooms from "../components/homepagecom/FeaturesRoom";

const Homepage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(cart.length);

  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const handlebuttonNav = (producttype) => {
    navigate(`/${producttype}Store`);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Memoize shuffled products so shuffle runs only once per page load
  const randomFeaturedproduct = useMemo(
    () => shuffleArray(Datacarrier.FeaturedStore).slice(0, 6),
    []
  );
  const randomFoodProducts = useMemo(
    () => shuffleArray(Datacarrier.FoodStore).slice(0, 4),
    []
  );
  const randomGroceryProducts = useMemo(
    () => shuffleArray(Datacarrier.GroceryStore).slice(0, 4),
    []
  );
  const randomHerbalProducts = useMemo(
    () => shuffleArray(Datacarrier.HerbalStore).slice(0, 4),
    []
  );
  const randomLiquorProducts = useMemo(
    () => shuffleArray(Datacarrier.LiqureStore).slice(0, 4),
    []
  );
  const randomVehicalProducts = useMemo(
    () => shuffleArray(Datacarrier.VehicalStore).slice(0, 4),
    []
  );

  const handleCart = () => {
    navigate("/Addtocart");
  };

  // Clean function to generate route slug for 'View More' buttons
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[:]/g, "") // Remove colons etc.
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

  return (
    <>
      <DrawerAppBar />

      <CartBtn handleCart={handleCart} cartCount={cartCount} />

      <div className="homepage-container">
        <Search data={Datacarrier} />

        {/* Service btn are the all the feature box parent */}
        <Servicesbtn />

        {/* <RakshyaBandhan/> */}
        <FoodMenuCanva />
        <StudyIt />
        <EvVehicleBooking />
        <FeaturedRooms />
        {/* //Addition code ectra ----------------------------- */}

        {/* Additohnal ends */}

        {[
          { title: "Featured Products", products: randomFeaturedproduct },
          { title: "Grab Food", products: randomFoodProducts },
          {
            title: "Find your favorite drinks",
            products: randomLiquorProducts,
          },
          { title: "Cook Something Fresh", products: randomGroceryProducts },
          { title: "Take a Ride", products: randomVehicalProducts },
          {
            title: "Bee Herbals: Your Health Ally",
            products: randomHerbalProducts,
          },
        ].map(({ title, products }, idx) => (
          <section
            key={title}
            className={`featured-section ${
              idx % 2 === 0 ? "bg-light" : "bg-white"
            }`}
            style={{ padding: "10px 0" }}
          >
            <FeaturedProducts
              title={title}
              products={products}
              onProductClick={handlebuttonNav}
            />
          </section>
        ))}
      </div>
    </>
  );
};

export default Homepage;
