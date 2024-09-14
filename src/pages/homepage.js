import React from "react";
import "./homepage.css"; // Import the updated CSS
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import products from "./../data/featuredItems.json"; // Import the JSON data
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import CoverSlider from "../components/homepagecom/CoverSlider";
import Footer from "../components/footer";


const Homepage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/Liquor');
  }

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
      <div className="product-search">
        {/* Search Bar */}
        <input type="text" className="search-bar" placeholder="Search products..." />
       
        <div className="button-boxes">
       
  
          <button onClick={handleClick} className="box-button" style={{flex:-1,flexWrap:'wrap'}}>   
               {/* <span style={{fontSize:50}} class="material-symbols-outlined">
               wine_bar </span> */}
                   <img 
        src="https://i.imgur.com/IV49hFF.png" 
        alt="Custom Icon" 
        style={{ width: '100px', height: '100px',}} // Adjust the size as needed
      />
              
               <h3> Liquor Store</h3>
           
               
               </button>

             <button onClick={handleClick} className="box-button" style={{flex:-1,flexWrap:'wrap'}}>          
                   <img 
        src="https://i.imgur.com/BFjzyuv.png" 
        alt="Custom Icon" 
        style={{ width: '100px', height: '100px',}} // Adjust the size as needed
      />    <h3> Grocery Store</h3>
           </button>
           
           <button onClick={handleClick} className="box-button" style={{flex:-1,flexWrap:'wrap'}}>          
                   <img 
        src="https://i.imgur.com/DMIVM3N.png" 
        alt="Custom Icon" 
        style={{ width: '100px', height: '100px',}} // Adjust the size as needed
      />    <h3> Food Store </h3>
         </button>
          




         <button onClick={handleClick} className="box-button" style={{flex:-1,flexWrap:'wrap'}}>          
                   <img 
        src="https://i.imgur.com/qkivuDn.png" 
        alt="Custom Icon" 
        style={{ width: '100px', height: '100px',}} // Adjust the size as needed
      />    <h3> Vechical Renting </h3>
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
        <CoverSlider/>
        <Footer/>

      </div>
    </>
  );
};

export default Homepage;
