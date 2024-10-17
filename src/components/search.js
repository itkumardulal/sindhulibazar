import React, { useState } from "react";
import "./Search.css"; // Make sure to have a CSS file for styling.
import Datacarrier from "../data/Datacarrier";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  // Function to calculate how well a field (name or description) matches the search query
  const calculateMatchScore = (text, query, isNameField = false) => {
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    let score = 0;

    // Match the number of times the query appears anywhere in the text
    const matchCount = normalizedText.split(normalizedQuery).length - 1;

    // Prioritize name matches with a higher score multiplier
    score += matchCount * (isNameField ? 10 : 2);

    return score;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]); // Reset search results when input is cleared
      return;
    }

    const matchedResults = [];

    // Loop through all store categories (LiquorStore, FoodStore, etc.)
    Object.keys(Datacarrier).forEach((storeKey) => {
      const storeItems = Datacarrier[storeKey];

      storeItems.forEach((item) => {
        const { name, description, vehicleInfo, count = 1 } = item; // Extract count with a default of 1

        // Calculate match score based on name (higher priority)
        const nameScore = calculateMatchScore(name, query, true);
        const descriptionScore = calculateMatchScore(description, query);
        const vehicleScore = vehicleInfo
          ? calculateMatchScore(vehicleInfo, query)
          : 0;

        // Combine scores from name, description, and vehicle info
        const totalScore = nameScore + descriptionScore + vehicleScore;

        if (totalScore > 0) {
          matchedResults.push({ ...item, score: totalScore, count }); // Include count in matched results
        }
      });
    });

    // Sort results based on score (highest first)
    const sortedResults = matchedResults
      .sort((a, b) => b.score - a.score) // Higher score first
      .slice(0, 5); // Get only the top 5 results

    setSearchResults(sortedResults);
  };

  const generateUniqueCartId = () => {
    return `cart-${new Date().getTime()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  // Update the handleClickAddtoCart function to receive the item details
  const handleClickAddtoCart = (item) => {
    const { id, name, image, description, price, category, count = 1 } = item; // Extract from the passed item

    // Get existing cart from localStorage
    let cart = localStorage.getItem("cart");

    // If cart exists, parse it, otherwise initialize an empty array
    cart = cart ? JSON.parse(cart) : [];

    // Create a new product object with a unique cart ID
    const newProduct = {
      cartId: generateUniqueCartId(), // Unique identifier for the cart item
      id,
      name,
      image,
      description,
      price,
      category,
      quantity: count,
    };

    // Add the new product to the cart
    cart.push(newProduct);

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("New Product added to cart");
    window.location.reload(); // Refresh the page
  };

  // Function to update the count for a specific item
  const updateCount = (itemId, operation) => {
    setSearchResults((prevResults) =>
      prevResults.map((item) => {
        if (item.id === itemId) {
          const newCount =
            operation === "increment" ? item.count + 1 : item.count - 1;
          return { ...item, count: Math.max(newCount, 1) }; // Ensure count doesn't go below 1
        }
        return item;
      })
    );
  };

  return (
    <div className="search-container">
      {/* Search Bar */}
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

      {/* Search Results */}
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
                    onClick={() => handleClickAddtoCart(item)} // Pass the item details when clicked
                  >
                    Add to Cart
                  </button>

                  <button className="buy-now">Buy Now</button>
                </div>
              </div>
            ))
          : searchQuery && <p>No products found.</p>}
      </div>
    </div>
  );
}
