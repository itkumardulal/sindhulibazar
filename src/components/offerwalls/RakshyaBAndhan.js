// import { useState, useRef, useEffect } from 'react';
// import { AnimatePresence, motion } from "framer-motion";
// import './RakshaBandhan.css';
// import WhatsAppMessageLink from '../../messagecarrier/Whatsappme';

// // This is the main component for the Raksha Bandhan offer banner.
// export default function RakshyaBandhan() {

//   const [count, setQuantity] = useState(1);
//   const scrollContainerRef = useRef(null);
//   const [itemsViewed, setItemsViewed] = useState(new Set());

//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
// var name = "Raksha Bandhan Special";
//   // Define the combo items as an array of objects.
//   const comboItems = [
//     {
//       id: 1,
//       name: "Designer Rakhi Set",
//       description: "A beautiful rakhi for your brother.",
//       imageUrl: "https://i.imgur.com/LeaLeZO.jpeg"
//     },
//        {
//       id: 2,
//       name: "Combo Set",
//       description: "A hamper full of assorted goodies.",
//       imageUrl: "https://i.imgur.com/8qRTynh.jpeg"
//     },
//     {
//       id: 3,
//       name: "Men Wallets",
//       description: "A sweet treat for the sweet bond.",
//       imageUrl: "https://i.imgur.com/JouFe7g.jpeg"
//     },

//     {
//       id: 4,
//       name: "perfume",
//       description: "A heartfelt message for your sibling.",
//       imageUrl: "https://i.imgur.com/6Oa0iB0.jpeg"
//     },
//     {
//       id: 5,
//       name: "Rakhi",
//       description: "A traditional box of delicious sweets.",
//       imageUrl: "https://i.imgur.com/sG1VGYp.jpeg"
//     },
//      {
//       id: 6,
//       name: "Hankerchief",
//       description: "Capture your favorite memory.",
//       imageUrl: "https://i.imgur.com/X0md6WW.jpeg"
//     },

//   ];

//   // State for the main, large image display.
//   const [mainImage, setMainImage] = useState(comboItems[0].imageUrl);
//   const [mainItem, setMainItem] = useState(comboItems[0]);

//   // This function handles the 'Send Order' button click.
//   // const handleOrderClick = () => {
//   //   if (isOrderUnlocked) {
//   //     console.log(`Order sent for ${count} of ${mainItem.name}!`);
//   //     setOrderSent(true);
//   //   }
//   // };

//   // This function handles a click on a small image, updating the main image and tracking viewed items.
//   const handleImageClick = (item) => {
//     setMainImage(item.imageUrl);
//     setMainItem(item);
//     // Add the item's ID to the set of viewed items.
//     setItemsViewed(prev => new Set(prev).add(item.id));
//   };

//   // Handles quantity increase
//   const handleQuantityIncrease = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   // Handles quantity decrease, ensuring it doesn't go below 1
//   const handleQuantityDecrease = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   // Handles clicking the scroll buttons
//   const scroll = (direction) => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       const scrollAmount = container.clientWidth / 2;
//       container.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Handles drag-to-scroll mouse events
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
//     setScrollLeft(scrollContainerRef.current.scrollLeft);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - scrollContainerRef.current.offsetLeft;
//     const walk = (x - startX) * 1.5;
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   // Check if all items have been viewed to unlock the order button.

//   const price = 999 * count;

//   return (
//     <div className="app-container">
//       <div

//         className="banner-container"
//       >
//         {/* Abstract background elements */}
//         <div className="banner-background-gradient"></div>
//         <div className="banner-background-pulse"></div>

//         {/* Header section with heading and subheading */}
//         <h2 className="header">
//           Raksha Bandhan Special
//         </h2>
//         <p className="subheader">
//           A Sacred Bond. An Unforgettable Combo.
//         </p>

//         {/* Main section with image and combo items */}
//         <div className="main-content">
//           {/* Main image display with fade animation */}
//           <div className="main-image-container">
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={mainImage}
//                 src={mainImage}
//                 alt="Main combo item"
//                 initial={{ opacity: 0, scale: 1.05 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.5, type: "tween" }}
//                 className="main-image"
//               />
//             </AnimatePresence>
//           </div>

//           {/* Combo items section with horizontal scroll and controls */}
//           <div className="items-container">
//             <div
//               ref={scrollContainerRef}
//               className={`items-scroll-area ${isDragging ? 'dragging' : ''}`}
//               onMouseDown={handleMouseDown}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseLeave}
//               onMouseMove={handleMouseMove}
//               onTouchStart={handleMouseDown}
//               onTouchMove={handleMouseMove}
//               onTouchEnd={handleMouseUp}
//             >
//               {comboItems.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   className={`item-card ${mainItem.id === item.id ? 'selected' : ''}`}
//                   onClick={() => handleImageClick(item)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="item-image"
//                   />
//                   <p className="item-name">{item.name}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <button
//               onClick={() => scroll('left')}
//               className="scroll-button left"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <button
//               onClick={() => scroll('right')}
//               className="scroll-button right"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Price and Quantity at the bottom, before the button */}
//         <motion.div
//           className="price-quantity-section"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           {/* Price display with animation */}
//           <motion.div
//             className="price-display"
//             // animate={{ scale: [1, 1.02, 1] }}
//             // transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <span>Total Price</span>
//             <span>Rs. {price}</span>
//           </motion.div>

//           {/* Quantity selector */}
//           <motion.div
//             className="quantity-selector"
//             // initial={{ scale: 0.8 }}
//             // animate={{ scale: 1 }}
//             // transition={{ duration: 0.3 }}
//           >
//             <button
//               onClick={handleQuantityDecrease}
//               className="quantity-button"
//             >
//               -
//             </button>
//             <span className="quantity-count">{count}</span>
//             <button
//               onClick={handleQuantityIncrease}
//               className="quantity-button"
//             >
//               +
//             </button>
//           </motion.div>

//         </motion.div>

//             <WhatsAppMessageLink orderDetails={{ name, price, count }} />

//       </div>
//     </div>
//   );
// }
