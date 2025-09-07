import React, { useEffect, useState } from "react";
import "./AdminControl.css";
import toast from "react-hot-toast";
import DrawerAppBar from "../components/Navbar";

const AdminControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  // LocalStorage for viewed orders
  const [viewedOrders, setViewedOrders] = useState(() => {
    const stored = localStorage.getItem("viewedOrders");
    return stored ? JSON.parse(stored) : [];
  });

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

    let isMounted = true;
    let intervalId;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/getAllOrders`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          const sortedOrders = Array.isArray(data)
            ? [...data].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              )
            : [];
          setOrders(sortedOrders);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setFetchError("Failed to fetch orders");
      }
    };

    fetchOrders();

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(fetchOrders, 10000); // every 10 sec
    }, 30000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isLoggedIn]);

  // Toggle expand and mark as viewed
  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );

    if (!viewedOrders.includes(orderId)) {
      const newViewed = [...viewedOrders, orderId];
      setViewedOrders(newViewed);
      localStorage.setItem("viewedOrders", JSON.stringify(newViewed));
    }
  };

  // Update claimed / delivered
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
      toast.success("Updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    }
  };

  // Filter & Search
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "claimed" && order.claimed === 1) ||
      (filter === "unclaimed" && order.claimed === 0) ||
      (filter === "delivered" && order.delivery_delivered === 1) ||
      (filter === "undelivered" && order.delivery_delivered === 0);

    const matchesSearch =
      (order.sender_phone || "").includes(search) ||
      (order.receiver_phone || "").includes(search);

    return matchesFilter && matchesSearch;
  });

  // Split orders
  const latestOrders = filteredOrders.slice(0, 2);
  const previousOrders = filteredOrders.slice(2);

  // Render order
  const renderOrder = (order) => {
    const totalItems =
      order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
    const hasGift = order.gift_item ? "Yes" : "No";
    const dateTime = order.created_at
      ? new Date(order.created_at.replace(" ", "T")).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "N/A";

    // Background color based on viewed status
    const cardBgColor = viewedOrders.includes(order.id)
      ? "#ffffff" // white if viewed
      : "#bdbdb3ff"; // light grey if not viewed

    return (
      <li key={order.id} className="order-item">
        <div className="order-card" style={{ backgroundColor: cardBgColor }}>
          {/* Date & Time */}
          <div className="order-card-header">
            <span>{dateTime}</span>
          </div>

          <div
            className="order-summary"
            style={{
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span>
              <strong>🎯 Receiver:</strong> {order.receiver_name}
            </span>
            <span>
              <strong>📞 Contact:</strong> {order.receiver_phone}
            </span>
            <span>
              <strong>🏠 Address:</strong> {order.receiver_address || "N/A"}
            </span>
            <span>
              <strong>🎁 Gift:</strong>{" "}
              <span
                style={{
                  color: order.gift_item ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {hasGift}
              </span>
            </span>
            <button
              className="eye-btn"
              onClick={() => toggleExpand(order.id)}
              title="View Details"
              style={{
                backgroundColor: viewedOrders.includes(order.id)
                  ? "#ffffff"
                  : "#e0e0e0",
                color: viewedOrders.includes(order.id) ? "#e63946" : "#555",
              }}
            >
              👁
            </button>
          </div>

          {expandedOrders.includes(order.id) && (
            <div className="order-details">
              <p>
                <strong>Sender:</strong> {order.sender_name} |{" "}
                {order.sender_phone}
              </p>
              <p>
                <strong>Gift Item:</strong> {order.gift_item || "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {order.message || "N/A"}
              </p>
              <p>
                <strong>Occasion:</strong> {order.occasion || "N/A"}
              </p>
              <p>
                <strong>Gift Range:</strong> {order.gift_Range} |{" "}
                <strong>Gift Cost:</strong> Rs.{order.gift_Cost}
              </p>
              <p>
                <strong>Claimed:</strong>{" "}
                <input
                  type="checkbox"
                  checked={order.claimed === 1}
                  onChange={(e) =>
                    handleToggle(order.id, "claimed", e.target.checked ? 1 : 0)
                  }
                />{" "}
                &nbsp;&nbsp;
                <strong>Delivered:</strong>{" "}
                <input
                  type="checkbox"
                  checked={order.delivery_delivered === 1}
                  onChange={(e) =>
                    handleToggle(
                      order.id,
                      "delivery_delivered",
                      e.target.checked ? 1 : 0
                    )
                  }
                />
              </p>
              <p>
                <strong>Items Ordered:</strong>
              </p>
              <ul>
                {order.items?.map((i) => (
                  <li key={i.id}>
                    {i.item_name} × {i.quantity} — Rs.{i.price * i.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total Items:</strong> {totalItems} |{" "}
                <strong>Total Price:</strong> Rs.{order.total_price}
              </p>
            </div>
          )}
        </div>
      </li>
    );
  };

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

  return (
    <>
      <DrawerAppBar />
      <div className="admin-panel">
        <h1>SINDHULIBAZAR : Order Management</h1>

        {/* Filters and Search */}
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

        {/* Latest Orders */}
        <h2>Latest Orders</h2>
        <ul className="orders-list">
          {latestOrders.length === 0 && <li>No latest orders</li>}
          {latestOrders.map(renderOrder)}
        </ul>

        {/* Previous Orders */}
        <h2>Previous Orders</h2>
        <ul className="orders-list">
          {previousOrders.length === 0 && <li>No previous orders</li>}
          {previousOrders.slice(0, visibleCount).map(renderOrder)}
        </ul>

        {/* Show More Button */}
        {visibleCount < previousOrders.length && (
          <button
            className="show-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            Show More
          </button>
        )}
      </div>
    </>
  );
};

export default AdminControl;
