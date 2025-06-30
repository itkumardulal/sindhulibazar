import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // ✅ import the provider
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Not just serviceWorker
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* ✅ wrap App inside CartProvider */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
serviceWorkerRegistration.register();