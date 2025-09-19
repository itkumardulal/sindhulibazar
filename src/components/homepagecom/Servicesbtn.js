import React from "react";
import "./servicebtn.css";
import { useNavigate } from "react-router-dom";

export default function Servicesbtn() {
  const navigate = useNavigate();

  const handlebuttonNav = (producttype) => {
    navigate(`/${producttype}Store`);
  };
  return (
    <div className="services-box">
      {/* passinging product category as text to handle multiple handler */}
      <button onClick={() => handlebuttonNav("Liquor")} className="box-button">
        <img src="https://i.imgur.com/IV49hFF.png" alt="Liquor Store" />
        <h3>Liquor Store</h3>
      </button>
      {/* <button onClick={() => handlebuttonNav("Grocery")} className="box-button">
        <img src="https://i.imgur.com/DMIVM3N.png" alt="Grocery Store" />
        <h3>Grocery Store</h3>
      </button> */}
      <button onClick={() => handlebuttonNav("Food")} className="box-button">
        <img src="https://i.imgur.com/BFjzyuv.png" alt="Food Store" />
        <h3>Food Store</h3>
      </button>
      {/* <button onClick={() => handlebuttonNav("Vehicle")} className="box-button">
        <img src="https://i.imgur.com/qkivuDn.png" alt="Vehicle Renting" />
        <h3>Vehicle Renting</h3>
      </button> */}
      {/* <button onClick={() => handlebuttonNav("Herbal")} className="box-button">
        <img src="https://i.imgur.com/3gbjRkO.png" alt="Herbal products" />
        <h3>UTURN Herbal</h3>
      </button> */}

      <button onClick={() => handlebuttonNav("Bakery")} className="box-button">
        <img
          src="https://i.imgur.com/pDDdWjJ.png"
          alt="bakery"
          style={{ height: 100 }}
        />
        <h3>Cake and Celebration</h3>
      </button>
      <button
        onClick={() => handlebuttonNav("roombooking")}
        className="box-button"
      >
        <img src="https://i.imgur.com/9saUQlP.png" alt="Herbal products" />
        <h3>Hotel Booking</h3>
      </button>
      {/* <button onClick={() => handlebuttonNav("Bakery")} className="box-button">
        <img
          src="https://i.imgur.com/pDDdWjJ.png"
          alt="bakery"
          style={{ height: 100 }}
        />
        <h3>Send parcel Abroad</h3>
      </button> */}
    </div>
  );
}
