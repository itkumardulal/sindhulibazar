import React from "react";
import "./homepage.css"; // Import the updated CSS
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Featuredproducts from "./../data/featuredItems.json"; // Import the JSON data
// import CoverSlider from "../components/homepagecom/CoverSlider";
import Footer from "../components/footer";
import Datacarrier from "../data/Datacarrier";
import Servicesbtn from "../components/homepagecom/Servicesbtn";
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

  return (
    <>
      <DrawerAppBar />
      <div className="homepage-container">
        <div className="product-search">
          {/* Search Bar */}
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
            {/* <input type="text" class="search-bar" placeholder="Search products..." /> */}
          </div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
          />
        </div>
        <Servicesbtn />

        {/* <div className="services-box">
          passinging product category as text to handle multiple handler
          <button
            onClick={() => handlebuttonNav("Liquor")}
            className="box-button"
          >
            <img src="https://i.imgur.com/IV49hFF.png" alt="Liquor Store" />
            <h3>Liquor Store</h3>
          </button>
          <button
            onClick={() => handlebuttonNav("Grocery")}
            className="box-button"
          >
            <img src="https://i.imgur.com/BFjzyuv.png" alt="Grocery Store" />
            <h3>Grocery Store</h3>
          </button>
          <button
            onClick={() => handlebuttonNav("Food")}
            className="box-button"
          >
            <img src="https://i.imgur.com/DMIVM3N.png" alt="Food Store" />
            <h3>Food Store</h3>
          </button>
          <button
            onClick={() => handlebuttonNav("Vehicle")}
            className="box-button"
          >
            <img src="https://i.imgur.com/qkivuDn.png" alt="Vehicle Renting" />
            <h3>Vehicle Renting</h3>
          </button>
        </div> */}

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            {Featuredproducts.map((product) => (
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
