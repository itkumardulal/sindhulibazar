import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import DrawerAppBar from "../components/Navbar";

import toast from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderIndexes, setExpandedOrderIndexes] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const toggleDetails = (index) => {
    if (expandedOrderIndexes.includes(index)) {
      setExpandedOrderIndexes(expandedOrderIndexes.filter((i) => i !== index));
    } else {
      setExpandedOrderIndexes([...expandedOrderIndexes, index]);
    }
  };

  if (orders.length === 0) {
    return (
      <DrawerAppBar>
        <div className="no-orders-container">
          <h2>🛒 No Orders Yet!</h2>
          <p>Your orders will appear here once placed. Stay tuned! ✨</p>
        </div>
      </DrawerAppBar>
    );
  }

  const latestOrder = orders[orders.length - 1];
  const previousOrders = orders.slice(0, orders.length - 1);

  return (
    <DrawerAppBar>
      <div className="orders-container">
        <h2>📦 My Orders</h2>

        {/* Latest Order */}
        <h3>🌟 Latest Order</h3>
        <ul className="orders-list">
          <li className="order-item latest">
            <OrderItem
              order={latestOrder}
              index={0}
              expandedOrderIndexes={expandedOrderIndexes}
              toggleDetails={toggleDetails}
              orderNumber={orders.length}
            />
          </li>
        </ul>

        {/* Previous Orders */}
        {previousOrders.length > 0 && (
          <>
            <h3 className="previous-orders-label">🕰️ Previous Orders</h3>
            <ul className="orders-list previous-orders">
              {[...previousOrders].reverse().map((order, index) => (
                <li key={index} className="order-item">
                  <OrderItem
                    order={order}
                    index={index + 1}
                    expandedOrderIndexes={expandedOrderIndexes}
                    toggleDetails={toggleDetails}
                    orderNumber={orders.length - (index + 1)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </DrawerAppBar>
  );
};

const OrderItem = ({
  order,
  index,
  expandedOrderIndexes,
  toggleDetails,
  orderNumber,
}) => {
  const totalItems = order.itemsOrdered.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString();

  const link = `${window.location.origin}/order_for_friend/${order.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast("✅ Spinner link copied!");
    });
  };

  return (
    <div className="order-card">
      <div className="order-date-time">
        📅 <strong>Date:</strong> {formattedDate} | ⏰ <strong>Time:</strong>{" "}
        {formattedTime}
      </div>

      <div className="order-summary">
        <span>
          🆔 <strong>Order No. {orderNumber}</strong>
        </span>
        <span>
          🎁 <strong>Items:</strong> {totalItems}
        </span>
        <span>
          💰 <strong>Total:</strong> Rs. {order.totalPrice}
        </span>
        <button
          className="eye-btn"
          onClick={() => toggleDetails(index)}
          title="View Details"
        >
          👁
        </button>
      </div>

      {expandedOrderIndexes.includes(index) && (
        <div className="order-details">
          <p>
            🙋 <strong>Receiver:</strong> {order.receiverName || "N/A"}
          </p>
          <p>
            📞 <strong>Phone:</strong> {order.receiverPhone}
          </p>
          <p>
            🏠 <strong>Address:</strong> {order.receiverAddress}
          </p>
          <p>
            🛍️ <strong>Items Ordered:</strong>
          </p>
          <ul>
            {order.itemsOrdered.map((item, idx) => (
              <li key={idx}>
                🎁 {item.name} - Rs. {item.price} × {item.quantity}
              </li>
            ))}
          </ul>
          <p>
            🚚 <strong>Delivery Charge:</strong> Rs. {order.deliveryCharge}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2px",
              marginTop: "5px",
              background: "#fffbe6",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ffe58f",
            }}
          >
            <strong style={{ color: "#d46b08", fontSize: "13px" }}>
              🎡✨ Play & Win Big!,Spinner : ✨🎉
            </strong>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                wordBreak: "break-all",
                color: "#d46b08",
                textDecoration: "underline",
                maxWidth: "100%",
                overflowWrap: "break-word",
                fontSize: "0.8rem",
              }}
            >
              {link}
            </a>
            <button
              onClick={handleCopy}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "6px",
                border: "1px solid #d46b08",
                background: "#ffe58f",
                flexShrink: 0,
                fontWeight: "600",
              }}
            >
              📋 Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
