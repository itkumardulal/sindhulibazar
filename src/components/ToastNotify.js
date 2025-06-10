// src/components/ToastNotify.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message = "🛒 New product added to cart!") => {
  toast.success(message, {
    position: "top-center", // Keep top-center for default
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: false,
    toastClassName: "custom-toast", // 👈 Add custom class here
    bodyClassName: "custom-toast-body",
  });
};

const ToastNotify = () => {
  return <ToastContainer newestOnTop />;
};

export default ToastNotify;
