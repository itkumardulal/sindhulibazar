import React, { useState, useEffect, useMemo } from "react";
import { Soup, ChevronDown, ChevronUp, Loader2, Feather } from "lucide-react";
import "./FoodGenerator.css"; // Add this line to import your stylesheet
import DrawerAppBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// import FeaturedProducts from '../components/homepagecom/FeaturedProducts';
import Datacarrier from "../data/Datacarrier";
import scrollToTop from "../tinyfunction/scrollToTop";

// The main application component
const FoodGenerator = () => {
  const navigate = useNavigate();
  // Constants for app configuration
  const maxDailyCalls = 14;
  const foodEmojis = ["🍲", "🥘", "🍛", "🍜", "🍚", "🥗", "🌶️", "🥟", "🥪"];

  // State management for API calls, UI, and data
  const [callCount, setCallCount] = useState(0);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState({});
  const [language, setLanguage] = useState("ne");
  const [mode, setMode] = useState("ingredients");
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [expandedRecipeName, setExpandedRecipeName] = useState(null);

  // Array of API keys to cycle through
  const apiKeys = [
    process.env.REACT_APP_GEMINI_API_KEY_1,
    process.env.REACT_APP_GEMINI_API_KEY_2,
    process.env.REACT_APP_GEMINI_API_KEY_3,
  ].filter((key) => key); // Filter out any undefined keys

  // const shuffleArray = (array) => {
  //   const arr = [...array];
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   return arr;
  // };
  // const handlebuttonNav = (producttype) => {
  //   navigate(`/${producttype}Store`);
  // };
  // Function to get a random emoji from the list
  const getRandomEmoji = () => {
    return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  // Fetch daily call count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem("dailyRecipeCallCount");
    const savedDate = localStorage.getItem("dailyRecipeLastCallDate");
    const today = new Date().toLocaleDateString();

    if (savedDate === today && savedCount) {
      setCallCount(parseInt(savedCount, 10));
    } else {
      localStorage.setItem("dailyRecipeCallCount", 0);
      localStorage.setItem("dailyRecipeLastCallDate", today);
      setCallCount(0);
    }
  }, []);

  // Update call count and persist to localStorage
  const updateCallCount = (increment = 1) => {
    const newCount = callCount + increment;
    setCallCount(newCount);
    localStorage.setItem("dailyRecipeCallCount", newCount);
    localStorage.setItem(
      "dailyRecipeLastCallDate",
      new Date().toLocaleDateString()
    );
  };

  // Handle API calls with exponential backoff and error handling, now with key rotation
  const makeApiCall = async (
    apiUrl,
    payload,
    apiKeyIndex = 0,
    retries = 5,
    delay = 1000
  ) => {
    // If we have run out of API keys, throw an error
    if (apiKeyIndex >= apiKeys.length || apiKeys.length === 0) {
      throw new Error("All API keys have failed or are unavailable.");
    }

    const currentApiKey = apiKeys[apiKeyIndex];
    const urlWithKey = `${apiUrl}?key=${currentApiKey}`;

    try {
      const response = await fetch(urlWithKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          console.warn(
            `API call limit exceeded for key ${
              apiKeyIndex + 1
            }. Retrying with same key in ${delay}ms...`
          );
          await new Promise((res) => setTimeout(res, delay));
          return makeApiCall(
            apiUrl,
            payload,
            apiKeyIndex,
            retries - 1,
            delay * 2
          );
        } else {
          // API key failure or other error, try the next key
          console.error(
            `API Error with key ${apiKeyIndex + 1}: ${
              response.statusText
            }. Trying next key.`
          );
          return makeApiCall(apiUrl, payload, apiKeyIndex + 1, 5); // Reset retries for the new key
        }
      }
      return await response.json();
    } catch (error) {
      console.error("API Call Error:", error);
      // If the fetch call itself fails (e.g., network error), try the next key
      return makeApiCall(apiUrl, payload, apiKeyIndex + 1, 5);
    }
  };

  // Fetches a list of recipe ideas from the Gemini API
  const generateRecipeIdeas = async () => {
    // Check if the daily call limit has been reached
    if (callCount >= maxDailyCalls) {
      setShowLimitWarning(true);
      return;
    }

    setShowLimitWarning(false);
    setIsGeneratingIdeas(true);
    setSuggestions([]);
    setExpandedRecipeName(null);

    let prompt = "";
    const numberOfSuggestions = mode === "daily" ? 5 : 3;

    if (mode === "daily") {
      prompt = `Generate ${numberOfSuggestions} different, simple, and creative Nepali or Indian dish ideas. For each dish, provide a short title and a one-sentence description. The output should be in ${
        language === "ne" ? "Nepali" : "English"
      }. The dishes should be distinctly different from each other.`;
    } else {
      // Return early if no ingredients are provided in ingredients mode
      if (!ingredients.trim()) {
        setSuggestions([]);
        setIsGeneratingIdeas(false);
        return;
      }
      prompt = `Generate ${numberOfSuggestions} different, simple, and creative Nepali or Indian dish ideas using the following ingredients: ${ingredients}. For each dish, provide a short title and a one-sentence description. The output should be in ${
        language === "ne" ? "Nepali" : "English"
      }.`;
    }

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              description: { type: "STRING" },
            },
            propertyOrdering: ["name", "description"],
          },
        },
      },
    };

    // The API key is now handled by makeApiCall
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`;

    try {
      const result = await makeApiCall(apiUrl, payload);
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content?.parts.length > 0
      ) {
        const json = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(json);
        // Map the parsed JSON to a new array of suggestions with a random emoji
        const suggestionsWithEmoji = parsedJson.map((s) => ({
          ...s,
          emoji: getRandomEmoji(),
          steps: null,
        }));
        setSuggestions(suggestionsWithEmoji);
        updateCallCount();
      } else {
        console.error("API response error: No candidates found.");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error generating recipe ideas:", error);
      setSuggestions([]);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  // Fetches full recipe instructions as interactive steps from the Gemini API
  const fetchFullRecipe = async (dishName) => {
    // Check if the daily call limit has been reached
    if (callCount >= maxDailyCalls) {
      setShowLimitWarning(true);
      return;
    }

    setIsLoadingRecipe((prevState) => ({ ...prevState, [dishName]: true }));
    const prompt = `Provide the full recipe for "${dishName}" including a detailed list of ingredients and a step-by-step cooking process. Format the response as a JSON array of objects, where each object has a single key "instruction" with the string for that step. The response should be in ${
      language === "ne" ? "Nepali" : "English"
    }.`;

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              instruction: { type: "STRING" },
            },
            propertyOrdering: ["instruction"],
          },
        },
      },
    };

    // The API key is now handled by makeApiCall
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`;

    try {
      const result = await makeApiCall(apiUrl, payload);
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content?.parts.length > 0
      ) {
        const json = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(json);
        setSuggestions((prevSuggestions) =>
          prevSuggestions.map((s) =>
            s.name === dishName ? { ...s, steps: parsedJson } : s
          )
        );
        updateCallCount();
      } else {
        console.error("API response error: No candidates or parts found.");
      }
    } catch (error) {
      console.error("Error fetching full recipe:", error);
    } finally {
      setIsLoadingRecipe((prevState) => ({ ...prevState, [dishName]: false }));
    }
  };

  // Toggle the expanded view for a recipe
  const toggleRecipeExpand = (dishName) => {
    if (expandedRecipeName === dishName) {
      setExpandedRecipeName(null);
    } else {
      setExpandedRecipeName(dishName);
      const existingSuggestion = suggestions.find((s) => s.name === dishName);
      if (existingSuggestion && !existingSuggestion.steps) {
        fetchFullRecipe(dishName);
      }
    }
  };

  // Get the text for the main generation button
  const getButtonText = () => {
    if (isGeneratingIdeas) {
      return "Generating Ideas...";
    }
    const totalCalls = callCount + (mode === "daily" ? 5 : 3);
    if (totalCalls > maxDailyCalls) {
      return "Daily Limit Exceeded";
    }
    return "Generate Ideas ✨";
  };

  // Determine if the main generation button should be disabled
  const getButtonDisabled = () => {
    const totalCalls = callCount + (mode === "daily" ? 5 : 3);
    return (
      isGeneratingIdeas ||
      (mode === "ingredients" && ingredients.trim() === "") ||
      totalCalls > maxDailyCalls
    );
  };
  const handleCart = () => {
    navigate("/Addtocart");
  };
  useEffect(() => {
    const gameContainer = document.createElement("div");
    gameContainer.className = "burger-game-container";
    document.body.appendChild(gameContainer);

    const createBurger = () => {
      const burger = document.createElement("div");
      burger.className = "burger";
      burger.style.left = `${Math.random() * 90}%`;
      burger.style.animationDuration = `${3 + Math.random() * 2}s`;
      gameContainer.appendChild(burger);

      setTimeout(() => {
        burger.remove();
      }, 5000);
    };

    const interval = setInterval(createBurger, 500);
    return () => {
      clearInterval(interval);
      gameContainer.remove();
    };
  }, []);
  // Memoize shuffled products so shuffle runs only once per page load
  // const randomFeaturedproduct = useMemo(
  //   () => shuffleArray(Datacarrier.FeaturedStore).slice(0, 6),
  //   []
  // );

  return (
    <>
      {/* CSS Styles for the entire application */}

      <DrawerAppBar>
        <div className="app-container">
          <div className="main-card">
            <div className="header-section">
              <Soup className="header-icon" />
              <h3 className="header-title">Nepali & Indian Recipe Generator</h3>
              <p className="header-subtitle">
                Choose your mode and language to get started!
              </p>
              <p className="call-count">
                API Calls Today: {callCount}/{maxDailyCalls}
              </p>
            </div>

            {showLimitWarning && (
              <div className="warning-message" role="alert">
                <p style={{ fontWeight: "bold" }}>दैनिक सीमा समाप्त भयो</p>
                <p>
                  तपाइँको दैनिक सिमा समाप्त भयो, कृपया भोलि प्रयास गर्नुहोस्!
                </p>
              </div>
            )}

            <div className="mode-buttons">
              <button
                onClick={() => {
                  setMode("ingredients");
                  setSuggestions([]);
                  setIngredients("");
                }}
                className={`mode-button ${
                  mode === "ingredients" ? "active" : "inactive"
                }`}
              >
                My Ingredients
              </button>
              <button
                onClick={() => {
                  setMode("daily");
                  setSuggestions([]);
                  setIngredients("");
                }}
                className={`mode-button ${
                  mode === "daily" ? "active" : "inactive"
                }`}
              >
                Daily Suggestion
              </button>
            </div>

            {mode === "ingredients" && (
              <div className="ingredients-input">
                <textarea
                  className="ingredients-textarea"
                  rows="4"
                  placeholder="e.g., chicken, onions, ginger, tomatoes, rice"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
            )}
            <div className="controls-container">
              <div className="language-selector">
                <label htmlFor="language-select">Select Language:</label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-dropdown"
                >
                  <option value="en">English</option>
                  <option value="ne">Nepali</option>
                </select>
              </div>
              <button
                onClick={generateRecipeIdeas}
                disabled={getButtonDisabled()}
                className="generate-button"
              >
                {getButtonText()}
              </button>
            </div>

            {isGeneratingIdeas && (
              <div className="loading-indicator">
                <Loader2 className="spinner" />
                <p className="loading-text">Searching for delicious ideas...</p>
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div key={index}>
                    <div className="emoji-container">{suggestion.emoji}</div>
                    <div
                      className="suggestion-card"
                      onClick={() => toggleRecipeExpand(suggestion.name)}
                    >
                      <div className="suggestion-content">
                        <div className="suggestion-header">
                          <div>
                            <h4 className="suggestion-title">
                              {suggestion.name}
                            </h4>
                            {/* <p className="suggestion-description">{suggestion.description}</p> */}
                          </div>
                          {expandedRecipeName === suggestion.name ? (
                            <ChevronUp className="toggle-icon" />
                          ) : (
                            <ChevronDown className="toggle-icon" />
                          )}
                        </div>
                        {expandedRecipeName === suggestion.name && (
                          <div className="expanded-details">
                            {isLoadingRecipe[suggestion.name] ? (
                              <div className="details-loading">
                                <Loader2 className="spinner" />
                                <p className="loading-text">
                                  Fetching full recipe...
                                </p>
                              </div>
                            ) : (
                              suggestion.steps && (
                                <ul className="step-list">
                                  {suggestion.steps.map((step, stepIndex) => (
                                    <li key={stepIndex} className="step-item">
                                      <span className="step-number">
                                        {stepIndex + 1}
                                      </span>
                                      <span className="step-text">
                                        {step.instruction}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <br></br>
            {/* Additional ends */}

            {/* {[
            { title: "Featured Products", products: randomFeaturedproduct },
            
          ].map(({ title, products }, idx) => (
            <section
              key={title}
              className={`featured-section ${
                idx % 2 === 0 ? "bg-light" : "bg-white"
              }`}
              style={{ padding: "10px 0" }}
            >
              <FeaturedProducts
                title={title}
                products={products}
                onProductClick={handlebuttonNav}
              />
            </section>
          ))} */}
          </div>
        </div>
        <br></br>
      </DrawerAppBar>
    </>
  );
};

export default FoodGenerator;
