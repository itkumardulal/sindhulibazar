import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import WhatsAppMessageLink from "./Whatsappme";
import { distance } from "fastest-levenshtein";

export default function Search({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

    const matchedResults = [];

    // Check if data is an object (full Datacarrier) or array (filtered like FoodStore)
    const allItemsArray = Array.isArray(data)
      ? data
      : Object.values(data).flat();

    allItemsArray.forEach((item) => {
      const { name, description, vehicleInfo, count = 1 } = item;

      const nameScore = calculateMatchScore(name, query, true);
      const descriptionScore = calculateMatchScore(description, query);
      const vehicleScore = vehicleInfo
        ? calculateMatchScore(vehicleInfo, query)
        : 0;

      const totalScore = nameScore + descriptionScore + vehicleScore;

      if (totalScore > 0) {
        matchedResults.push({ ...item, score: totalScore, count });
      }
    });

    const sortedResults = matchedResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setSearchResults(sortedResults);
  };

  const generateUniqueCartId = () =>
    `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleClickAddtoCart = (item) => {
    const { id, name, image, description, price, category, count = 1 } = item;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newProduct = {
      cartId: generateUniqueCartId(),
      id,
      name,
      image,
      description,
      price,
      category,
      quantity: count,
    };

    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("New Product added to cart");
    window.location.reload();
  };

  const updateCount = (itemId, operation) => {
    setSearchResults((prevResults) =>
      prevResults.map((item) => {
        if (item.id === itemId) {
          const newCount =
            operation === "increment" ? item.count + 1 : item.count - 1;
          return { ...item, count: Math.max(newCount, 1) };
        }
        return item;
      })
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
            height="30"
          >
            <path d="M10 2a8 8 0 016.32 12.906l5.387 5.387a1 1 0 01-1.415 1.415l-5.387-5.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
          </svg>
        </div>
      </div>

      <div className="search-results">
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <div className="search-result-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  <p>Price: {item.price}</p>
                  <div className="count-controls">
                    <button onClick={() => updateCount(item.id, "decrement")}>
                      -
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => updateCount(item.id, "increment")}>
                      +
                    </button>
                  </div>
                  {item.vehicleInfo && <p>Vehicle Info: {item.vehicleInfo}</p>}
                </div>
                <div className="product-actions">
                  <button
                    className="add-to-cart"
                    onClick={() => handleClickAddtoCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
                <WhatsAppMessageLink orderDetails={item} />
              </div>
            ))
          : searchQuery && <p>No products found.</p>}
      </div>
    </div>
  );
}
