import React from "react";
import "./homepage.css"; // Import the updated CSS
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import CoverSlider from "../components/homepagecom/CoverSlider";
import Footer from "../components/footer";
import Datacarrier from "../data/Datacarrier";
import Servicesbtn from "../components/homepagecom/Servicesbtn";
// import { Button } from "@mui/material";
import CartBtn from "../components/CartBtn";
import Search from "../components/search";

// import { WidthFull } from "@mui/icons-material";

const Homepage = () => {
  const navigate = useNavigate();

  const handlebuttonNav = (producttype) => {
    navigate(`/${producttype}Store`);
    // navigate("/MedicalStore");
    // }
  };
  //refactoring
  // FeaturesProduct item component
  const ProductItem = ({ product }) => (
    <div
      className="product-item"
      onClick={() => handlebuttonNav(product.category)}
    >
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description"> {product.description}</p>
        <p className="product-price"> {product.price}</p>
        <button
          className="buy-button"
          onClick={() => handlebuttonNav(product.category)}
        >
          View more
        </button>
      </div>
    </div>
  );
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Get random products
  const randomFeaturedproduct = shuffleArray([
    ...Datacarrier.FeaturedStore,
  ]).slice(0, 6);
  const randomFoodProducts = shuffleArray([...Datacarrier.FoodStore]).slice(
    0,
    4
  );
  const randomGroceryProducts = shuffleArray([
    ...Datacarrier.GroceryStore,
  ]).slice(0, 4);
  const randomHerbalProducts = shuffleArray([...Datacarrier.HerbalStore]).slice(
    0,
    4
  );
  const randomLiquorProducts = shuffleArray([...Datacarrier.LiqureStore]).slice(
    0,
    4
  );
  const randomVehicalProducts = shuffleArray([
    ...Datacarrier.VehicalStore,
  ]).slice(0, 4);
  const handleCart = () => {
    navigate("/Addtocart");
  };

  return (
    <>
      <DrawerAppBar />

      {/* <Button
        onClick={handleCart}
        className="material-symbols-outlined"
        sx={{
          fontSize: { xs: "24px", sm: "32px" },
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: 2,
          color: "white",
          backgroundColor: "#1a66ad",
          borderRadius: "50%",
          textDecoration: "none",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: "#155a8a",
            transform: "scale(1.1)",
          },
        }}
      >
        shopping_cart
      </Button> */}
      <CartBtn handleCart={handleCart} />

      <div className="homepage-container">
        <Search />
        {/* <div className="product-search">
       
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
          />
          <div class="search-bar-container">
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -15 30 40"
              width="41"
              height="30"
            >
              <path d="M10 2a8 8 0 016.32 12.906l5.387 5.387a1 1 0 01-1.415 1.415l-5.387-5.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
           
          </div>
        </div> */}
        <Servicesbtn />

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            {randomFeaturedproduct.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="featured-products">
          <h2>Grab Food</h2>
          <div className="product-list">
            {randomFoodProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="featured-products">
          <h2>Find your favorite drinks</h2>
          <div className="product-list">
            {randomLiquorProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="featured-products">
          <h2>Cook Something Fresh</h2>
          <div className="product-list">
            {randomGroceryProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="featured-products">
          <h2>Take a Ride </h2>
          <div className="product-list">
            {randomVehicalProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="featured-products">
          <h2>Bee Herbals: Your Health Ally</h2>
          <div className="product-list">
            {randomHerbalProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* <CoverSlider /> */}
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
