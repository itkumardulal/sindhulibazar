import React, { useState, useEffect } from 'react';
import { Soup, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// The main application component
const FoodGenerator = () => {
  // App state for API calls and UI
  const maxDailyCalls = 50;
  const [callCount, setCallCount] = useState(0);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState({});
  const [isLoadingImage, setIsLoadingImage] = useState({});
  
  // Recipe and user input state
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('daily');
  const [ingredients, setIngredients] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [expandedRecipeName, setExpandedRecipeName] = useState(null);

  // Fetch daily call count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('dailyRecipeCallCount');
    const savedDate = localStorage.getItem('dailyRecipeLastCallDate');
    const today = new Date().toLocaleDateString();

    if (savedDate === today && savedCount) {
      setCallCount(parseInt(savedCount, 10));
    } else {
      localStorage.setItem('dailyRecipeCallCount', 0);
      localStorage.setItem('dailyRecipeLastCallDate', today);
      setCallCount(0);
    }
  }, []);

  // Update call count and persist to localStorage
  const updateCallCount = (increment = 1) => {
    const newCount = callCount + increment;
    setCallCount(newCount);
    localStorage.setItem('dailyRecipeCallCount', newCount);
    localStorage.setItem('dailyRecipeLastCallDate', new Date().toLocaleDateString());
  };

  // Handle API calls with exponential backoff and error handling
  const makeApiCall = async (apiUrl, payload, retries = 5, delay = 1000) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          console.warn(`API call limit exceeded. Retrying in ${delay}ms...`);
          await new Promise(res => setTimeout(res, delay));
          return makeApiCall(apiUrl, payload, retries - 1, delay * 2);
        }
        throw new Error(`API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Call Error:", error);
      throw error;
    }
  };

  // Fetches a list of recipe ideas
  const generateRecipeIdeas = async () => {
    if (callCount >= maxDailyCalls) {
      setShowLimitWarning(true);
      return;
    }

    setShowLimitWarning(false);
    setIsGeneratingIdeas(true);
    setSuggestions([]);
    setExpandedRecipeName(null);

    let prompt = '';
    const numberOfSuggestions = mode === 'daily' ? 10 : 3;

    if (mode === 'daily') {
      prompt = `Generate ${numberOfSuggestions} different, simple, and creative Nepali or Indian dish ideas. For each dish, provide a short title and a one-sentence description. The output should be in ${language === 'ne' ? 'Nepali' : 'English'}. The dishes should be distinctly different from each other.`;
    } else {
      if (!ingredients.trim()) {
        setSuggestions([]);
        setIsGeneratingIdeas(false);
        return;
      }
      prompt = `Generate ${numberOfSuggestions} different, simple, and creative Nepali or Indian dish ideas using the following ingredients: ${ingredients}. For each dish, provide a short title and a one-sentence description. The output should be in ${language === 'ne' ? 'Nepali' : 'English'}.`;
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
              "name": { "type": "STRING" },
              "description": { "type": "STRING" }
            },
            "propertyOrdering": ["name", "description"]
          }
        }
      }
    };

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    try {
      const result = await makeApiCall(apiUrl, payload);
      if (result.candidates && result.candidates.length > 0 && result.candidates[0].content?.parts.length > 0) {
        const json = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(json);
        const suggestionsWithImages = parsedJson.map(s => ({ ...s, image: null, steps: null }));
        setSuggestions(suggestionsWithImages);
        updateCallCount();
        
        // After getting the list, start generating images for each one
        suggestionsWithImages.forEach(s => generateRecipeImage(s.name, s.description));
      } else {
        console.error('API response error: No candidates found.');
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error generating recipe ideas:', error);
      setSuggestions([]);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  // Generates an image for a specific recipe
  const generateRecipeImage = async (dishName, description) => {
    if (callCount >= maxDailyCalls) {
      setShowLimitWarning(true);
      return;
    }

    setIsLoadingImage(prevState => ({ ...prevState, [dishName]: true }));
    // Create a more descriptive prompt for image generation
    const prompt = `A professional food photograph of "${dishName}". The image should be vibrant, beautifully lit, and placed on a rustic wooden table. The style should be photorealistic. The dish description is: ${description}.`;
    const payload = { instances: { prompt }, parameters: { "sampleCount": 1 } };
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    try {
      const result = await makeApiCall(apiUrl, payload);
      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        setSuggestions(prevSuggestions => 
          prevSuggestions.map(s => s.name === dishName ? { ...s, image: imageUrl } : s)
        );
        updateCallCount();
      } else {
        console.error('Image API response error: No predictions found.');
        setSuggestions(prevSuggestions => 
          prevSuggestions.map(s => s.name === dishName ? { ...s, image: 'https://placehold.co/400x200/e2e8f0/cbd5e1?text=Image+Failed' } : s)
        );
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setSuggestions(prevSuggestions => 
        prevSuggestions.map(s => s.name === dishName ? { ...s, image: 'https://placehold.co/400x200/e2e8f0/cbd5e1?text=Image+Failed' } : s)
      );
    } finally {
      setIsLoadingImage(prevState => ({ ...prevState, [dishName]: false }));
    }
  };

  // Fetches full recipe instructions as interactive steps
  const fetchFullRecipe = async (dishName) => {
    if (callCount >= maxDailyCalls) {
      setShowLimitWarning(true);
      return;
    }

    setIsLoadingRecipe(prevState => ({ ...prevState, [dishName]: true }));
    const prompt = `Provide the full recipe for "${dishName}" including a detailed list of ingredients and a step-by-step cooking process. Format the response as a JSON array of objects, where each object has a single key "instruction" with the string for that step. The response should be in ${language === 'ne' ? 'Nepali' : 'English'}.`;

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
              "instruction": { "type": "STRING" }
            },
            "propertyOrdering": ["instruction"]
          }
        }
      }
    };

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const result = await makeApiCall(apiUrl, payload);
      if (result.candidates && result.candidates.length > 0 && result.candidates[0].content?.parts.length > 0) {
        const json = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(json);
        setSuggestions(prevSuggestions => 
          prevSuggestions.map(s => s.name === dishName ? { ...s, steps: parsedJson } : s)
        );
        updateCallCount();
      } else {
        console.error('API response error: No candidates or parts found.');
      }
    } catch (error) {
      console.error('Error fetching full recipe:', error);
    } finally {
      setIsLoadingRecipe(prevState => ({ ...prevState, [dishName]: false }));
    }
  };

  // Toggle the expanded view for a recipe
  const toggleRecipeExpand = (dishName) => {
    if (expandedRecipeName === dishName) {
      setExpandedRecipeName(null);
    } else {
      setExpandedRecipeName(dishName);
      const existingSuggestion = suggestions.find(s => s.name === dishName);
      if (existingSuggestion && !existingSuggestion.steps) {
        fetchFullRecipe(dishName);
      }
    }
  };

  const getButtonText = () => {
    if (isGeneratingIdeas) {
      return 'Generating Ideas...';
    }
    const totalCalls = callCount + (mode === 'daily' ? 10 : 3);
    if (totalCalls > maxDailyCalls) {
      return 'Daily Limit Exceeded';
    }
    return 'Generate Ideas ✨';
  };

  const getButtonDisabled = () => {
    const totalCalls = callCount + (mode === 'daily' ? 10 : 3);
    return isGeneratingIdeas || (mode === 'ingredients' && ingredients.trim() === '') || totalCalls > maxDailyCalls;
  };

  return (
    <>
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
        }
        .app-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .main-card {
          background-color: #ffffff;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-width: 48rem;
          width: 100%;
          padding: 2rem;
          animation: fadeIn 0.5s ease-out;
        }
        .header-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 2rem;
        }
        .header-icon {
          width: 3rem;
          height: 3rem;
          color: #f59e0b;
          margin-bottom: 1rem;
        }
        .header-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .header-subtitle {
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .call-count {
          font-size: 0.875rem;
          color: #64748b;
        }
        .warning-message {
          background-color: #fffbeb;
          border-left: 4px solid #f59e0b;
          color: #b45309;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .warning-message p {
          margin: 0;
        }
        .mode-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .mode-button {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        .mode-button.active {
          background-color: #f59e0b;
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .mode-button.inactive {
          background-color: #e2e8f0;
          color: #1e293b;
        }
        .mode-button.inactive:hover {
          background-color: #cbd5e1;
        }
        .ingredients-input {
          margin-bottom: 1.5rem;
        }
        .ingredients-textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 2px solid #cbd5e1;
          outline: none;
          transition: all 0.2s ease-in-out;
          resize: none;
        }
        .ingredients-textarea:focus {
          border-color: #f59e0b;
        }
        .controls-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .language-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .generate-button {
          width: 100%;
          background-color: #f59e0b;
          color: #ffffff;
          font-weight: 700;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out;
          transform-origin: center;
          border: none;
          cursor: pointer;
          outline: none;
        }
        .generate-button:hover:not(:disabled) {
          transform: scale(1.05);
        }
        .generate-button:focus:not(:disabled) {
          box-shadow: 0 0 0 4px rgba(250, 202, 24, 0.5);
        }
        .generate-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .loading-indicator {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .spinner {
          animation: spin 1s linear infinite;
          width: 2rem;
          height: 2rem;
          color: #f59e0b;
          margin-right: 0.75rem;
        }
        .loading-text {
          color: #475569;
        }
        .suggestions-container {
          margin-top: 2rem;
          display: grid;
          gap: 1.5rem;
        }
        .suggestion-card {
          background-color: #ffffff;
          border-radius: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;
        }
        .suggestion-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .suggestion-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          background-color: #e2e8f0;
        }
        .suggestion-content {
          padding: 1.5rem;
        }
        .suggestion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .suggestion-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .suggestion-description {
          font-size: 0.875rem;
          color: #475569;
          margin-top: 0.25rem;
        }
        .toggle-icon {
          width: 2rem;
          height: 2rem;
          color: #f59e0b;
          transition: transform 0.3s ease-in-out;
        }
        .expanded-details {
          margin-top: 1.5rem;
          border-top: 1px solid #cbd5e1;
          padding-top: 1.5rem;
        }
        .step-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.75rem;
          background-color: #f1f5f9;
          padding: 1rem;
          border-radius: 0.75rem;
          transition: all 0.2s ease-in-out;
          border: 2px solid transparent;
        }
        .step-text {
          flex-grow: 1;
          color: #1e293b;
          line-height: 1.5;
        }
        .details-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }
        .image-loading-placeholder {
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #e2e8f0;
          text-align: center;
        }
        .image-spinner {
          animation: spin 1s linear infinite;
          width: 2rem;
          height: 2rem;
          color: #cbd5e1;
        }
        .image-error-text {
          font-size: 0.875rem;
          color: #64748b;
          margin-top: 0.5rem;
        }
        @media (min-width: 640px) {
          .app-container {
            padding: 1.5rem;
          }
          .main-card {
            padding: 3rem;
          }
          .controls-container {
            flex-direction: row;
            gap: 1rem;
          }
          .generate-button {
            width: auto;
          }
        }
        `}
      </style>
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
              <p style={{ fontWeight: 'bold' }}>Daily Limit Reached</p>
              <p>Today's API limit is over. Please try again tomorrow!</p>
            </div>
          )}

          <div className="mode-buttons">
            <button 
              onClick={() => { setMode('daily'); setSuggestions([]); setIngredients(''); }}
              className={`mode-button ${mode === 'daily' ? 'active' : 'inactive'}`}
            >
              Daily Suggestion
            </button>
            <button 
              onClick={() => { setMode('ingredients'); setSuggestions([]); setIngredients(''); }}
              className={`mode-button ${mode === 'ingredients' ? 'active' : 'inactive'}`}
            >
              My Ingredients
            </button>
          </div>

          {mode === 'ingredients' && (
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
            <div className="language-buttons">
              <button 
                onClick={() => setLanguage('en')}
                className={`mode-button ${language === 'en' ? 'active' : 'inactive'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('ne')}
                className={`mode-button ${language === 'ne' ? 'active' : 'inactive'}`}
              >
                Nepali
              </button>
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
                  <div className="suggestion-card" onClick={() => toggleRecipeExpand(suggestion.name)}>
                    {isLoadingImage[suggestion.name] ? (
                      <div className="image-loading-placeholder">
                        <Loader2 className="image-spinner" />
                        <p className="image-error-text">Generating image...</p>
                      </div>
                    ) : (
                      suggestion.image && <img src={suggestion.image} alt={suggestion.name} className="suggestion-image" />
                    )}
                    <div className="suggestion-content">
                      <div className="suggestion-header">
                        <div>
                          <h4 className="suggestion-title">{suggestion.name}</h4>
                          <p className="suggestion-description">{suggestion.description}</p>
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
                              <p className="loading-text">Fetching full recipe...</p>
                            </div>
                          ) : (
                            suggestion.steps && (
                              <ul className="step-list">
                                {suggestion.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} 
                                    className="step-item"
                                  >
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
        </div>
      </div>
    </>
  );
};

export default FoodGenerator;
