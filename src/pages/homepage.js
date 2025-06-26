import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";

import DrawerAppBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Datacarrier from "../data/Datacarrier";
import Servicesbtn from "../components/homepagecom/Servicesbtn";
import CartBtn from "../components/CartBtn";
import Search from "../components/search";
import { CartContext } from "../context/CartContext";

const Homepage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(cart.length);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const handlebuttonNav = (producttype) => {
    navigate(`/${producttype}Store`);
  };

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

  const randomFeaturedproduct = shuffleArray([...Datacarrier.FeaturedStore]).slice(0, 6);
  const randomFoodProducts = shuffleArray([...Datacarrier.FoodStore]).slice(0, 4);
  const randomGroceryProducts = shuffleArray([...Datacarrier.GroceryStore]).slice(0, 4);
  const randomHerbalProducts = shuffleArray([...Datacarrier.HerbalStore]).slice(0, 4);
  const randomLiquorProducts = shuffleArray([...Datacarrier.LiqureStore]).slice(0, 4);
  const randomVehicalProducts = shuffleArray([...Datacarrier.VehicalStore]).slice(0, 4);

  const handleCart = () => {
    navigate("/Addtocart");
  };

  return (
    <>
      <DrawerAppBar />
      <CartBtn handleCart={handleCart} cartCount={cartCount} />

      <div className="homepage-container">
        <Search data={Datacarrier} />

        <Servicesbtn />

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
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
