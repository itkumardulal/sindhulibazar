import React, { useState, forwardRef, useRef } from "react";
import "./OrderForm.css";
import { handleSubmitOrder } from "../../components/handlers/orderHandler";

const OrderForm = forwardRef(({ orderData = {}, onClose }, ref) => {
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const city = "Sindhulimadhi";

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    await handleSubmitOrder({
      orderData,
      receiverName,
      phone,
      addressDetail,
      setPhone,
      setAddressDetail,
      setLoading,
      setErrorMsg,
      setSuccess,
      onClose,
    });
  };

  return (
    <div ref={ref} className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Place Your Order</h2>

        <form onSubmit={handleSubmit}>
          {errorMsg && <div className="error-msg">⚠ {errorMsg}</div>}

          <label>Receiver Name</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
            placeholder="Enter receiver's name"
            autoFocus
            onKeyDown={(e) => handleKeyDown(e, phoneRef)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            ref={phoneRef}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="98XXXXXXXX"
            inputMode="numeric"
            pattern="[0-9]{10}"
            onKeyDown={(e) => handleKeyDown(e, addressRef)}
          />

          <label>City</label>
          <p className="readonly-text">{city}</p>

          <label>Tol / Place Name</label>
          <input
            type="text"
            ref={addressRef}
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            required
            placeholder="E.g., Ratmata, near Prayash Hotel"
          />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>

        {success && (
          <div className="success-popup">
            <h3>✅ Successfully Ordered!</h3>
            <p>Your order is in review. We’ll contact you in a few minutes.</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default OrderForm;
// import React, { useState, forwardRef, useRef } from "react";
// import "./OrderForm.css";
// import { createOrder } from "../../components/orderforfriendcom/order_api/createOrder";
// import { useNavigate } from "react-router-dom";

// const OrderForm = forwardRef(({ orderData = {}, onClose }, ref) => {
//   const [phone, setPhone] = useState("");
//   const [addressDetail, setAddressDetail] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();
//   const city = "Sindhulimadhi"; // default city

//   // Refs for smoother keyboard navigation
//   const phoneRef = useRef(null);
//   const addressRef = useRef(null);

//   const handleKeyDown = (e, nextRef) => {
//     if (e.key === "Enter" && nextRef?.current) {
//       e.preventDefault();
//       nextRef.current.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!phone || !addressDetail) {
//       setErrorMsg("Please fill all required fields.");
//       return;
//     }

//     let itemsOrdered = [];
//     if (orderData.cart?.length) {
//       itemsOrdered = orderData.cart.map((item) => ({
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       }));
//     } else if (orderData.name && orderData.price) {
//       itemsOrdered = [
//         {
//           name: orderData.name,
//           price: orderData.price,
//           quantity: orderData.quantity || 1,
//         },
//       ];
//     } else {
//       itemsOrdered = [
//         {
//           name: "Default Item",
//           price: orderData.totalPrice || 0,
//           quantity: 1,
//         },
//       ];
//     }

//     const uniqueId = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//     const newtotalPrice =
//       Number(orderData.price) + Number(orderData.shiftValue);

//     const dataToSend = {
//       id: uniqueId,
//       createdAt: new Date().toISOString(),
//       senderName: "Guest",
//       senderPhone: null,
//       receiverName,
//       receiverPhone: phone,
//       receiverAddress: addressDetail,
//       deliveryCharge:
//         orderData.deliveryChargeFinal || orderData.shiftValue || 0,
//       totalPrice: orderData.totalPrice || newtotalPrice || 0,
//       itemsOrdered,
//     };

//     setLoading(true);

//     try {
//       const response = await createOrder(dataToSend);

//       if (response.success) {
//         setPhone("");
//         setAddressDetail("");
//         localStorage.removeItem("cart");

//         const orderWithId = {
//           ...dataToSend,
//           id: response.data.orderId,
//         };

//         let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//         existingOrders.push(orderWithId);

//         if (existingOrders.length > 5) {
//           existingOrders = [orderWithId];
//         }

//         localStorage.setItem("orders", JSON.stringify(existingOrders));

//         setSuccess(true);

//         setTimeout(() => {
//           setSuccess(false);
//           onClose();
//           navigate("/myorders");
//         }, 2000);
//       } else {
//         setErrorMsg(response.error || "Failed to create order.");
//       }
//     } catch (err) {
//       console.error("❌ Unexpected error:", err.message);
//       setErrorMsg("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div ref={ref} className="modal-overlay">
//       <div className="modal">
//         <button className="modal-close" onClick={onClose}>
//           ×
//         </button>

//         <h2>Place Your Order</h2>

//         <form onSubmit={handleSubmit}>
//           {errorMsg && <div className="error-msg">⚠ {errorMsg}</div>}

//           <label>Receiver Name</label>
//           <input
//             type="text"
//             value={receiverName}
//             onChange={(e) => setReceiverName(e.target.value)}
//             required
//             placeholder="Enter receiver's name"
//             autoFocus
//             onKeyDown={(e) => handleKeyDown(e, phoneRef)}
//           />

//           <label>Phone Number</label>
//           <input
//             type="tel"
//             ref={phoneRef}
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             placeholder="98XXXXXXXX"
//             inputMode="numeric"
//             pattern="[0-9]{10}"
//             onKeyDown={(e) => handleKeyDown(e, addressRef)}
//           />

//           <label>City</label>
//           <p className="readonly-text">{city}</p>

//           <label>Tol / Place Name</label>
//           <input
//             type="text"
//             ref={addressRef}
//             value={addressDetail}
//             onChange={(e) => setAddressDetail(e.target.value)}
//             required
//             placeholder="E.g., Ratmata, near Prayash Hotel"
//           />

//           <div className="modal-buttons">
//             <button type="submit" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Order"}
//             </button>
//           </div>
//         </form>

//         {success && (
//           <div className="success-popup">
//             <h3>✅ Successfully Ordered!</h3>
//             <p>Your order is in review. We’ll contact you in a few minutes.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default OrderForm;
