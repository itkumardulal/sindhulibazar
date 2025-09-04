import React, { useEffect, useState } from "react";
import "./AdminControl.css";

// Modal Component
const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  const total = order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Order Details - #{order.id}</h2>
        <p>
          <strong>Sender:</strong> {order.sender_name} ({order.sender_phone})
        </p>
        <p>
          <strong>Receiver:</strong> {order.receiver_name} ({order.receiver_phone})
        </p>
        <p>
          <strong>Message:</strong> {order.message}
        </p>
        <p>
          <strong>Occasion:</strong> {order.occasion}
        </p>
        <p>
          <strong>Gift Range:</strong> {order.gift_Range} |{" "}
          <strong>Gift Cost:</strong> Rs.{order.gift_Cost}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <ul>
          {order.items?.map((i) => (
            <li key={i.id}>
              {i.item_name} × {i.quantity} — Rs.{i.price}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total:</strong> Rs.{total}
        </p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Table Row Component
const OrderRow = ({ order, onToggle, onView }) => {
  const giftNames = order.items?.map((i) => i.item_name).join(", ");
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.sender_name}</td>
      <td>{order.receiver_name}</td>
      <td>{order.sender_phone}</td>
      <td>{order.receiver_phone}</td>
      <td>{giftNames}</td>
      <td>
        <input
          type="checkbox"
          checked={order.claimed === 1}
          onChange={(e) => onToggle(order.id, "claimed", e.target.checked ? 1 : 0)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={order.delivery_delivered === 1}
          onChange={(e) =>
            onToggle(order.id, "delivery_delivered", e.target.checked ? 1 : 0)
          }
        />
      </td>
      <td>
        <button onClick={() => onView(order)}>View</button>
      </td>
    </tr>
  );
};

// Main AdminControl Component
const AdminControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOrder, setModalOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Login check
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password. Try again!");
    }
  };

  // Fetch orders
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getAllOrders`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setFetchError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isLoggedIn]);

  const handleToggle = async (orderId, field, value) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error("Update failed");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "claimed" && order.claimed === 1) ||
      (filter === "unclaimed" && order.claimed === 0) ||
      (filter === "delivered" && order.delivery_delivered === 1) ||
      (filter === "undelivered" && order.delivery_delivered === 0);

    const matchesSearch =
      order.sender_phone.includes(search) || order.receiver_phone.includes(search);

    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // LOGIN VIEW
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    );
  }

  // LOADING / FETCH ERROR
  if (loading)
    return (
      <div className="center-screen">
        <p className="loading-text">Loading orders...</p>
      </div>
    );

  if (fetchError)
    return (
      <div className="center-screen">
        <p className="error-text">{fetchError}</p>
      </div>
    );

  // ADMIN PANEL
  return (
    <div className="admin-panel">
      <h1>SINDHULIBAZAR : Order Management</h1>

      <div className="filters-search">
        <div className="buttons-group">
          {["all", "claimed", "unclaimed", "delivered", "undelivered"].map(
            (f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            )
          )}
        </div>
        <input
          type="text"
          placeholder="Search by sender/receiver phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {[
                "Order ID",
                "Sender",
                "Receiver",
                "Sender Phone",
                "Receiver Phone",
                "Gift Item",
                "Claimed",
                "Delivered",
                "View",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No orders found
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onToggle={handleToggle}
                  onView={setModalOrder}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredOrders.length > ordersPerPage && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      <OrderModal order={modalOrder} onClose={() => setModalOrder(null)} />
    </div>
  );
};

export default AdminControl;
