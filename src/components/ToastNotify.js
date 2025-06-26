import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "./ToastNotify.css";



// Default options used in all toasts
const defaultOptions = {
  position: "top-center",
  autoClose: 1600,           // a bit longer so it doesn't vanish too fast
  hideProgressBar: true,
  pauseOnHover: true,
  closeOnClick: false,
  draggable: false,
  closeButton: false,
  transition: Slide,         // smooth slide in/out
  toastClassName: "custom-toast",
  bodyClassName: "custom-toast-body",
};

/**
 * Show toast notification with flexible type and options
 */
export const showToast = (message = "🛒 New product added to cart!", type = "success", options = {}) => {
  const toastOptions = { ...defaultOptions, ...options };
  switch (type) {
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "success":
    default:
      toast.success(message, toastOptions);
      break;
  }
};

const ToastNotify = () => {
  return <ToastContainer newestOnTop />;
};

export default ToastNotify;
