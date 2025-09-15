import React, { useState, useContext } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

import { distance } from "fastest-levenshtein";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

export default function Search({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearch, setRecentSearch] = useState(""); // store only one recent search
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate fuzzy match score
  const calculateMatchScore = (text, query, isNameField = false) => {
    const normalizedText = text?.toLowerCase() || "";
    const normalizedQuery = query?.toLowerCase() || "";
    let score = 0;
    const queryWords = normalizedQuery.split(/\s+/);
    const textWords = normalizedText.split(/\s+/);

    queryWords.forEach((qWord) => {
      let bestDistance = Infinity;
      textWords.forEach((tWord) => {
        bestDistance = Math.min(bestDistance, distance(qWord, tWord));
      });
      if (bestDistance <= 2) score += (isNameField ? 10 : 5) - bestDistance;
    });

    return score;
  };

  // Perform search and return results
  const performSearch = (query) => {
    if (!query.trim()) return [];
    const allItems = Array.isArray(data) ? data : Object.values(data).flat();

    return allItems
      .map((item) => {
        const { name, description, vehicleInfo, count = 1 } = item;
        const nameScore = calculateMatchScore(name, query, true);
        const descriptionScore = calculateMatchScore(description, query);
        const vehicleScore = vehicleInfo
          ? calculateMatchScore(vehicleInfo, query)
          : 0;
        const totalScore = nameScore + descriptionScore + vehicleScore;
        return totalScore > 0 ? { ...item, score: totalScore, count } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  // Handle input change for live search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchResults(performSearch(query));
  };

  // Handle enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchQuery.trim()) return;

      const results = performSearch(searchQuery);
      setRecentSearch(searchQuery);
      setSearchResults(results);
      setSearchQuery(""); // clear input but placeholder remains default
    }
  };

  // Cancel recent search
  const handleCancelSearch = () => {
    setRecentSearch("");
    setSearchResults([]);
    setSearchQuery("");
  };

  // Add item to cart
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
    toast.success("🎉 Item added to cart!");
  };

  const updateCount = (itemId, operation) => {
    setSearchResults((prevResults) =>
      prevResults.map((item) =>
        item.id === itemId
          ? {
              ...item,
              count: Math.max(
                item.count + (operation === "increment" ? 1 : -1),
                1
              ),
            }
          : item
      )
    );
  };

  return (
    <div className="search-container">
      {/* Input */}
      <div className="product-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Recent Search */}
      {recentSearch && searchResults.length > 0 && (
        <div className="recent-search-container">
          <span>
            Your search results for: <strong>{recentSearch}</strong>
          </span>
          <button className="cancel-search-btn" onClick={handleCancelSearch}>
            ✖
          </button>
        </div>
      )}

      {/* Search Results */}
      <div className="search-results">
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <div
                className="search-result-item"
                key={`${item.id}-${item.count}`}
              >
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <span className="category">Category: {item.category}</span>
                  <span className="price">Price: {item.price}</span>
                  {item.vehicleInfo && (
                    <span className="vehicle">Vehicle: {item.vehicleInfo}</span>
                  )}

                  <div className="count-controls">
                    <button onClick={() => updateCount(item.id, "decrement")}>
                      -
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => updateCount(item.id, "increment")}>
                      +
                    </button>
                  </div>

                  <div className="product-actions">
                    <button
                      className="add-to-cart"
                      onClick={() => handleClickAddtoCart(item)}
                    >
                      🛒 Add to BAG
                    </button>
                  </div>
                </div>
              </div>
            ))
          : recentSearch && <span>No products found.</span>}
      </div>
    </div>
  );
}
