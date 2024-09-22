import React from "react";
import "./homepage.css"; // Import the updated CSS
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import products from "./../data/uturnitems.json"; // Import the JSON data
import CoverSlider from "../components/homepagecom/CoverSlider";
import Footer from "../components/footer";
import { WidthFull } from "@mui/icons-material";

const Homepage = () => {
  const navigate = useNavigate();


  const handleClick = (storeName) => {
    // Navigate to the route based on the store name
    navigate(`/${storeName.toLowerCase().replace(/\s+/g, '-')}`);
  };
  // Product item component
  const ProductItem = ({ product }) => (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price}</p>
        <button className="buy-button">Buy</button>
      </div>
    </div>
  );

  return (
    <>
      <DrawerAppBar />
      <div className="homepage-container">
        <div className="product-search">
          {/* Search Bar */}
          <input type="text" className="search-bar" placeholder="Search products..." />
        </div>

        <div className="services-box">
      <button onClick={() => handleClick('LiquorStore')} className="box-button">
        <img src="https://i.imgur.com/IV49hFF.png" alt="Liquor Store" />
        <h3>Liquor Store</h3>
      </button>
      <button onClick={() => handleClick('GroceryStore')} className="box-button">
        <img src="https://i.imgur.com/BFjzyuv.png" alt="Grocery Store" />
        <h3>Grocery Store</h3>
      </button>
      <button onClick={() => handleClick('FoodStore')} className="box-button">
        <img src="https://i.imgur.com/DMIVM3N.png" alt="Food Store" />
        <h3>Food Store</h3>
      </button>
      <button onClick={() => handleClick('VehicleRenting')} className="box-button">
        <img src="https://i.imgur.com/qkivuDn.png" alt="Vehicle Renting" />
        <h3>Vehicle Renting</h3>
      </button>
    </div>

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>


        <CoverSlider />
    
      </div>
      <Footer  />
    </>
  );
};

export default Homepage;
