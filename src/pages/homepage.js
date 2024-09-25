import React from "react";
import "./homepage.css"; // Import the updated CSS
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import Featuredproducts from "./../data/featuredItems.json"; // Import the JSON data
// import CoverSlider from "../components/homepagecom/CoverSlider";
import Footer from "../components/footer";
import Datacarrier from "../data/Datacarrier";
// import { WidthFull } from "@mui/icons-material";

const Homepage = () => {
  const navigate = useNavigate();

  const handlebuttonNav=(producttype)=>{
    navigate(`/${producttype}Store`);
    // if (producttype ==="Food"){
    //   navigate(`/StorePage/${producttype}Store`);
    // }
    
    // else if(producttype ==="Vehicle"){
    //   navigate("/VehicleRenting")
    // }
    // else if(producttype ==="Grocery"){
    //   navigate("/GroceryStore")
    // }
    // else if(producttype ==="Liquor"){
    //   navigate("/LiquorStore")
    // }
    // else if(producttype ==="Herbal"){
    //   navigate("/MedicalStore")
    // }
    
  }

  // const handleClick = (storeName) => {
  //   // Navigate to the route based on the store name
  //   navigate(`/${storeName}`);
  // };
  // FeaturesProduct item component
  const ProductItem = ({ product }) => (
    <div className="product-item" onClick={()=> handlebuttonNav(product.category)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description"> {product.description}</p>
        <p className="product-price"> {product.price}</p>
        <button className="buy-button"  onClick={() => handlebuttonNav(product.category)}>View more</button>
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
        {/* passinging product category as text to handle multiple handler */}
      <button onClick={() => handlebuttonNav('Liquor')} className="box-button">
        <img src="https://i.imgur.com/IV49hFF.png" alt="Liquor Store" />
        <h3>Liquor Store</h3>
      </button>
      <button onClick={() => handlebuttonNav('Grocery')} className="box-button">
        <img src="https://i.imgur.com/BFjzyuv.png" alt="Grocery Store" />
        <h3>Grocery Store</h3>
      </button>
      <button onClick={() => handlebuttonNav('Food')} className="box-button">
        <img src="https://i.imgur.com/DMIVM3N.png" alt="Food Store" />
        <h3>Food Store</h3>
      </button>
      <button onClick={() => handlebuttonNav('Vehicle')} className="box-button">
        <img src="https://i.imgur.com/qkivuDn.png" alt="Vehicle Renting" />
        <h3>Vehicle Renting</h3>
      </button>
    </div>

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            {Featuredproducts.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>


        {/* <CoverSlider /> */}
    
      </div>
      <Footer  />
    </>
  );
  
};

export default Homepage;
