import React, { useState, useEffect } from "react";

const AdminProfileSettings = () => {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567890",
    socialLinks: {
      linkedin: "",
      twitter: "",
    },
    profilePic: null,
    profilePicPreview: null,
  });

  // Security state
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [loginActivity, setLoginActivity] = useState([
    // example data
    { date: "2025-06-03 12:00", ip: "192.168.1.1", device: "Chrome on Windows" },
    { date: "2025-06-02 08:23", ip: "192.168.1.2", device: "Firefox on Mac" },
  ]);

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    systemAlerts: true,
    messages: false,
    dndStart: "22:00",
    dndEnd: "07:00",
  });

  // System preferences
  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "GMT",
    theme: "light",
    dateFormat: "DD/MM/YYYY",
    currency: "USD",
    fontSize: "medium",
    highContrast: false,
  });

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name in profile.socialLinks) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profilePic: file,
        profilePicPreview: URL.createObjectURL(file),
      }));
    }
  };

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return "";
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[\W]/.test(pwd)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(newPassword));
  }, [newPassword]);

  const toggleTwoFA = () => {
    setTwoFAEnabled((prev) => !prev);
  };

  // Notification toggle handler
  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Preferences change handler
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fontSizeOptions = ["small", "medium", "large"];
  const themeOptions = ["light", "dark", "auto"];
  const languageOptions = ["English", "Spanish", "French", "German"];
  const timezoneOptions = [
    "GMT",
    "UTC",
    "EST",
    "PST",
    "CST",
    "IST",
    "CET",
  ];
  const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
  const currencyOptions = ["USD", "EUR", "GBP", "INR", "JPY"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Profile & Settings</h2>

  <div className="d-flex justify-content-space-between p-2 gap-4 ">
        {/* Profile Section */}
      <section style={styles.section}>
        <h3 style={styles.subHeading}>Profile</h3>
        <div style={styles.profileContainer}>
          <div style={styles.picContainer}>
            {profile.profilePicPreview ? (
              <img
                src={profile.profilePicPreview}
                alt="Profile Preview"
                style={styles.profilePic}
              />
            ) : (
              <div style={styles.picPlaceholder}>No Image</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={styles.fileInput}
            />
          </div>
          <div style={styles.profileFields}>
            <label style={styles.label}>
              Name:
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                style={styles.input}
                disabled
              />
              <small style={styles.note}>
                Email cannot be changed here. Contact support.
              </small>
            </label>
            <label style={styles.label}>
              Phone:
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              LinkedIn:
              <input
                type="url"
                name="linkedin"
                value={profile.socialLinks.linkedin}
                onChange={handleProfileChange}
                style={styles.input}
                placeholder="https://linkedin.com/in/username"
              />
            </label>
            <label style={styles.label}>
              Twitter:
              <input
                type="url"
                name="twitter"
                value={profile.socialLinks.twitter}
                onChange={handleProfileChange}
                style={styles.input}
                placeholder="https://twitter.com/username"
              />
            </label>
            <button style={styles.button}>Save Profile</button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section style={styles.section}>
        <h3 style={styles.subHeading}>Security</h3>
        <div style={styles.securityContainer}>
          <label style={styles.label}>
            Current Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter current password"
            />
          </label>
          <label style={styles.label}>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter new password"
            />
          </label>
          <label style={styles.label}>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              placeholder="Confirm new password"
            />
          </label>
          {newPassword && (
            <div style={styles.passwordStrength}>
              Password Strength:{" "}
              <span
                style={{
                  color:
                    passwordStrength === "Weak"
                      ? "red"
                      : passwordStrength === "Fair"
                      ? "orange"
                      : passwordStrength === "Good"
                      ? "blue"
                      : "green",
                }}
              >
                {passwordStrength}
              </span>
            </div>
          )}
          <button style={styles.button}>Change Password</button>

          <div style={{ marginTop: "1rem" }}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={twoFAEnabled}
                onChange={toggleTwoFA}
                style={styles.checkbox}
              />
              Enable Two-Factor Authentication (2FA)
            </label>
          </div>

          <div style={styles.loginActivity}>
            <h4>Recent Login Activity</h4>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>IP Address</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                {loginActivity.map((log, i) => (
                  <tr key={i}>
                    <td>{log.date}</td>
                    <td>{log.ip}</td>
                    <td>{log.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section style={styles.section}>
        <h3 style={styles.subHeading}>Notification Settings</h3>
        <div>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
              style={styles.checkbox}
            />
            Email Notifications
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => toggleNotification("sms")}
              style={styles.checkbox}
            />
            SMS Notifications
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => toggleNotification("push")}
              style={styles.checkbox}
            />
            Push Notifications
          </label>

          <h4 style={{ marginTop: "1rem" }}>Notification Types</h4>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.orderUpdates}
              onChange={() => toggleNotification("orderUpdates")}
              style={styles.checkbox}
            />
            Order Updates
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.systemAlerts}
              onChange={() => toggleNotification("systemAlerts")}
              style={styles.checkbox}
            />
            System Alerts
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={notifications.messages}
              onChange={() => toggleNotification("messages")}
              style={styles.checkbox}
            />
            Messages
          </label>

          <div className="d-flex align-items-center" style={{ marginTop: "1rem" }}>
            <label>
              Do Not Disturb Start:
              <input
                type="time"
                name="dndStart"
                value={notifications.dndStart}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    dndStart: e.target.value,
                  }))
                }
                style={styles.timeInput}
              />
            </label>
            <label style={{ marginLeft: "1rem" }}>
              Do Not Disturb End:
              <input
                type="time"
                name="dndEnd"
                value={notifications.dndEnd}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    dndEnd: e.target.value,
                  }))
                }
                style={styles.timeInput}
              />
            </label>
          </div>
          <button style={styles.button}>Save Notification Settings</button>
        </div>
      </section>
  </div>

      {/* System Preferences Section */}
      <section style={styles.section}>
        <h3 style={styles.subHeading}>System Preferences</h3>
        <label style={styles.label}>
          Language:
          <select
            name="language"
            value={preferences.language}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Timezone:
          <select
            name="timezone"
            value={preferences.timezone}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {timezoneOptions.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Theme:
          <select
            name="theme"
            value={preferences.theme}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {themeOptions.map((th) => (
              <option key={th} value={th}>
                {th.charAt(0).toUpperCase() + th.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Date Format:
          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {dateFormatOptions.map((df) => (
              <option key={df} value={df}>
                {df}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Currency:
          <select
            name="currency"
            value={preferences.currency}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="highContrast"
            checked={preferences.highContrast}
            onChange={handlePreferenceChange}
            style={styles.checkbox}
          />
          High Contrast Mode
        </label>
        <label style={styles.label}>
          Font Size:
          <select
            name="fontSize"
            value={preferences.fontSize}
            onChange={handlePreferenceChange}
            style={styles.select}
          >
            {fontSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <button style={styles.button}>Save Preferences</button>
      </section>
    </div>
  );
};

// Inline CSS styles for simplicity
const styles = {
  container: {
    // maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  section: {
    marginBottom: "40px",
    padding: "20px ",
    borderRadius: "8px",
    backgroundColor: "#f5f7fa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

  },
  subHeading: {
    borderBottom: "2px solid #3498db",
    paddingBottom: "8px",
    marginBottom: "15px",
    color: "#2980b9",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",    
    gap: "20px",
    flexWrap: "wrap",
  },
  picContainer: {
    minWidth: "140px",
    textAlign: "center",
  },
  profilePic: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    border: "3px solid #3498db",
  },
  picPlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontSize: "14px",
    marginBottom: "10px",
  },
  fileInput: {
    cursor: "pointer",
    display: "none",

  },
  profileFields: {
    flex: 1,
    minWidth: "300px",
  },
  thead: {
    backgroundColor: "#3498db",
    color: "white",
  },
  th: {
    padding: "10px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
  },
  label: {
    display: "block",
    marginBottom: "12px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  note: {
    fontSize: "12px",
    color: "#999",
    marginTop: "3px",
  },
  button: {
    marginTop: "15px",
    padding: "10px 18px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },
  securityContainer: {
    maxWidth: "500px",
  },
  passwordStrength: {
    marginTop: "5px",
    fontWeight: "600",
  },
  checkboxLabel: {
    display: "block",
    marginBottom: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
  checkbox: {
    marginRight: "8px",
  },
  loginActivity: {
    marginTop: "20px",
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  timeInput: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
};

export default AdminProfileSettings;
