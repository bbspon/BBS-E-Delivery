import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "All",
  "Orders",
  "Promotions",
  "Wallet & Payments",
  "Delivery Status",
  "Support Messages",
  "System Alerts",
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/notifications", {
        params: { category: activeCategory },
      });

      const notifs = Array.isArray(res.data)
        ? res.data
        : res.data.notifications || [];

      setNotifications(notifs);
    } catch (err) {
      setError("Failed to load notifications.");
      setNotifications([]);
    }
    setLoading(false);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
    }
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeCategory]);

  return (
    <div className="notification-center">
      <div className="header">
        <h2>🔔 Notification Center</h2>
        <div className="controls">
          <button onClick={handleMarkAllRead}>Mark All Read</button>
          <button onClick={handleDeleteAll}>Delete All</button>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === activeCategory ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="empty">You're all caught up 🎉</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`notification-card ${notif.read ? "read" : "unread"}`}
            >
              <div className="content">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <span className="time">{notif.timeAgo}</span>
              </div>
              <div className="actions">
                <span className="category">{notif.category}</span>
                <button onClick={() => handleToggleRead(notif.id)}>
                  {notif.read ? "Mark Unread" : "Mark Read"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        .notification-center {
  padding: 5% 20px;
  max-width: 800px;
  height: 100vh;

  margin: auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls button {
  margin-left: 0.5rem;
  padding: 6px 12px;
  background: #0056b3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #004099;
}

.category-tabs {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tabs button {
  padding: 6px 12px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.category-tabs .active {
  background: #0070f3;
  color: white;
}

.loading, .error, .empty {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-card {
  background: #fff;
  border: 1px solid #eee;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-card.unread {
  background: #f9f9ff;
  border-left: 4px solid #0070f3;
}

.notification-card.read {
  opacity: 0.7;
}

.notification-card .content h4 {
  margin: 0 0 0.2rem 0;
  font-weight: bold;
}

.notification-card .content p {
  margin: 0 0 0.4rem 0;
  font-size: 0.95rem;
}

.notification-card .time {
  font-size: 0.8rem;
  color: #777;
}

.notification-card .category {
  font-size: 0.75rem;
  color: #555;
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 8px;
}

.notification-card .actions button {
  background: transparent;
  border: none;
  color: #0070f3;
  cursor: pointer;
  font-size: 0.9rem;
}
 
      `}</style>
    </div>
  );
};

export default NotificationCenter;
