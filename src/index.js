import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
      // ✅ Import your Redux store
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
             {/* ✅ Wrap here */}
        <CartProvider>
          <App />
        </CartProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);

// Register service worker to enable PWA features
serviceWorkerRegistration.register();
