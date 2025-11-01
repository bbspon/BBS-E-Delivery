import React, { useEffect, useState } from "react";
import axios from "axios";


const categories = [
  "All",
  "Orders",
  "Payments",
  "Delivery Alerts",
  "Promotions",
  "Support",
  "System",
];

const roleMap = {
  admin: "Admin",
  vendor: "Vendor",
  delivery: "Delivery Agent",
};

const NotificationCenterRoles = ({ role = "admin" }) => {
  const [notifications, setNotifications] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/role-notifications", {
        params: { role, category },
      });
      setNotifications(Array.isArray(res.data) ? res.data : res.data.notifications || []);
    } catch (err) {
      setError("Failed to fetch notifications.");
      setNotifications([]);
    }
    setLoading(false);
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const deleteAll = () => {
    if (window.confirm("Delete all notifications?")) {
      setNotifications([]);
    }
  };

  const toggleRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, [category]);

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2>🔔 {roleMap[role]} Notification Center</h2>
        <div className="notification-controls">
          <button onClick={markAllRead}>Mark All Read</button>
          <button onClick={deleteAll}>Delete All</button>
        </div>
      </div>

      <div className="notification-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="status">Loading...</p>
      ) : error ? (
        <p className="status error">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="status">No notifications for this category.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map(notif => (
            <li
              key={notif.id}
              className={`notification-card ${notif.read ? "read" : "unread"}`}
            >
              <div className="notif-content">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <span className="timestamp">{notif.timeAgo}</span>
              </div>
              <div className="notif-actions">
                <span className="notif-category">{notif.category}</span>
                <button onClick={() => toggleRead(notif.id)}>
                  {notif.read ? "Unread" : "Read"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

    <style>{`
       .notification-container {
  padding: 4rem;
  max-width: 900px;
  height: 100vh;
  margin: auto;
  font-family: "Segoe UI", sans-serif;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-controls button {
  margin-left: 10px;
  padding: 6px 12px;
  border: none;
  background: #0050c5;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.notification-controls button:hover {
  background: #003f9f;
}

.notification-tabs {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.notification-tabs button {
  background: #eee;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
}

.notification-tabs .active {
  background: #0050c5;
  color: white;
}

.status {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}

.status.error {
  color: red;
}

.notification-list {
  list-style: none;
  margin-top: 1rem;
  padding: 0;
}

.notification-card {
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}

.notification-card.unread {
  border-left: 5px solid #007bff;
  background-color: #f0f8ff;
}

.notif-content h4 {
  margin: 0;
  font-size: 1rem;
}

.notif-content p {
  margin: 0.4rem 0;
  font-size: 0.9rem;
}

.notif-content .timestamp {
  font-size: 0.75rem;
  color: gray;
}

.notif-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.notif-actions .notif-category {
  font-size: 0.75rem;
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
}

.notif-actions button {
  border: none;
  background: transparent;
  color: #0050c5;
  cursor: pointer;
  font-size: 0.85rem;
}


    `}</style>

    </div>
  );
};

export default NotificationCenterRoles;
