import React, { useState, useContext } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import WhatsAppMessageLink from "../messagecarrier/Whatsappme";
import { distance } from "fastest-levenshtein";
import toast from 'react-hot-toast';
import { CartContext } from "../context/CartContext";

export default function Search({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateMatchScore = (text, query, isNameField = false) => {
    const normalizedText = text?.toLowerCase() || "";
    const normalizedQuery = query?.toLowerCase() || "";
    let score = 0;
    const queryWords = normalizedQuery.split(/\s+/);
    const textWords = normalizedText.split(/\s+/);

    queryWords.forEach((qWord) => {
      let bestDistance = Infinity;
      textWords.forEach((tWord) => {
        const dist = distance(qWord, tWord);
        bestDistance = Math.min(bestDistance, dist);
      });
      if (bestDistance <= 2) {
        score += (isNameField ? 10 : 5) - bestDistance;
      }
    });

    return score;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const allItemsArray = Array.isArray(data)
      ? data
      : Object.values(data).flat();

    const matchedResults = allItemsArray
      .map((item) => {
        const { name, description, vehicleInfo, count = 1 } = item;
        const nameScore = calculateMatchScore(name, query, true);
        const descriptionScore = calculateMatchScore(description, query);
        const vehicleScore = vehicleInfo ? calculateMatchScore(vehicleInfo, query) : 0;
        const totalScore = nameScore + descriptionScore + vehicleScore;
        return totalScore > 0 ? { ...item, score: totalScore, count } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setSearchResults(matchedResults);
  };

  const generateUniqueCartId = () =>
    `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleClickAddtoCart = (item) => {
    const { id, name, image, description, price, category, count = 1 } = item;
    let updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex((p) => p.id === id);

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += count;
    } else {
      updatedCart.push({
        cartId: generateUniqueCartId(),
        id,
        name,
        image,
        description,
        price,
        category,
        quantity: count,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success('🎉 Item added to cart!');
  };

  const updateCount = (itemId, operation) => {
    setSearchResults((prevResults) =>
      prevResults.map((item) =>
        item.id === itemId
          ? { ...item, count: Math.max(item.count + (operation === "increment" ? 1 : -1), 1) }
          : item
      )
    );
  };

  return (
    <div className="search-container">
      <div className="product-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-bar-icon">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-5 -15 30 40"
            width="30"
            height="32"
          >
            <path d="M10 2a8 8 0 016.32 12.906l5.387 5.387a1 1 0 01-1.415 1.415l-5.387-5.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
          </svg>
        </div>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div className="search-result-item" key={`${item.id}-${item.count}`}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <span className="category">Category: {item.category}</span>
                <span className="price">Price: {item.price}</span>
                {item.vehicleInfo && <span className="vehicle">Vehicle: {item.vehicleInfo}</span>}
                <div className="count-controls">
                  <button onClick={() => updateCount(item.id, "decrement")}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => updateCount(item.id, "increment")}>+</button>
                </div>
                <div className="product-actions">
                  <button className="add-to-cart" onClick={() => handleClickAddtoCart(item)}>
                    Add to Cart
                  </button>
                  <div className="whatsapp-wrapper">
                    <WhatsAppMessageLink orderDetails={item} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          searchQuery && <span>No products found.</span>
        )}
      </div>
    </div>
  );
}
