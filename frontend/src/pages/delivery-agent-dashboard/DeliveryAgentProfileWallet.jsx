import React, { useState, useEffect } from "react";

const MOCK_PROFILE = {
  firstName: "Arjun",
  lastName: "Sharma",
  mobile: "+919876543210",
  email: "arjun.sharma@example.com",
  emailVerified: false,
  profileImage: "https://wallpaper.dog/large/20457672.jpg", // placeholder avatar image
};

const MOCK_WALLET_TRANSACTIONS = [
  {
    id: 1,
    date: "2025-05-22 14:23",
    description: "Order #BBS-1024 Delivered",
    amount: 150,
    type: "credit",
  },
  {
    id: 2,
    date: "2025-05-20 09:15",
    description: "Withdrawal to Bank Account",
    amount: -100,
    type: "debit",
  },
  {
    id: 3,
    date: "2025-05-18 18:40",
    description: "Order #BBS-1019 Delivered",
    amount: 200,
    type: "credit",
  },
  // Add more transactions here...
];

const MIN_WITHDRAWAL_AMOUNT = 50;

const DeliveryAgentProfileWalletPage = () => {
  // Profile states
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(MOCK_PROFILE);
  const [profileMessage, setProfileMessage] = useState("");

  // Wallet states
  const [walletBalance, setWalletBalance] = useState(
    MOCK_WALLET_TRANSACTIONS.reduce((sum, tx) => sum + tx.amount, 0)
  );
  const [transactions, setTransactions] = useState(MOCK_WALLET_TRANSACTIONS);
  const [filteredTransactions, setFilteredTransactions] = useState(
    MOCK_WALLET_TRANSACTIONS
  );
  const [filterType, setFilterType] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Withdrawal modal states
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempProfile((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save profile updates
  const saveProfile = () => {
    // Basic validation
    if (!tempProfile.firstName.trim() || !tempProfile.lastName.trim()) {
      setProfileMessage("First and last name are required.");
      return;
    }
    if (!/^\+?\d{7,15}$/.test(tempProfile.mobile)) {
      setProfileMessage("Enter a valid mobile number.");
      return;
    }
    setProfile(tempProfile);
    setEditMode(false);
    setProfileMessage("Profile updated successfully!");
    // Clear message after 3s
    setTimeout(() => setProfileMessage(""), 3000);
  };

  // Cancel editing
  const cancelEdit = () => {
    setTempProfile(profile);
    setEditMode(false);
    setProfileMessage("");
  };

  // Resend email verification simulation
  const resendVerification = () => {
    alert(`Verification email sent to ${profile.email}`);
  };

  // Filter transactions
  useEffect(() => {
    let filtered = [...transactions];
    if (filterType !== "all") {
      filtered = filtered.filter((tx) => tx.type === filterType);
    }
    if (filterDateFrom) {
      filtered = filtered.filter(
        (tx) => new Date(tx.date) >= new Date(filterDateFrom)
      );
    }
    if (filterDateTo) {
      filtered = filtered.filter(
        (tx) => new Date(tx.date) <= new Date(filterDateTo)
      );
    }
    setFilteredTransactions(filtered);
  }, [filterType, filterDateFrom, filterDateTo, transactions]);

  // Open withdrawal modal
  const openWithdrawalModal = () => {
    setWithdrawAmount("");
    setWithdrawMessage("");
    setWithdrawalOpen(true);
  };

  // Handle withdrawal request
  const handleWithdrawalRequest = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < MIN_WITHDRAWAL_AMOUNT) {
      setWithdrawMessage(
        `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`
      );
      return;
    }
    if (amount > walletBalance) {
      setWithdrawMessage("Withdrawal amount exceeds wallet balance.");
      return;
    }
    // Process withdrawal - simulate API call
    const newTx = {
      id: transactions.length + 1,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      description: "Withdrawal to Bank Account",
      amount: -amount,
      type: "debit",
    };
    const updatedTransactions = [newTx, ...transactions];
    setTransactions(updatedTransactions);
    setWalletBalance(walletBalance - amount);
    setWithdrawMessage("Withdrawal successful!");
    setTimeout(() => {
      setWithdrawalOpen(false);
      setWithdrawMessage("");
    }, 2000);
  };

  // Logout simulation
  const handleLogout = () => {
    alert("Logged out!");
    // Redirect to login page or clear auth token etc.
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Delivery Agent Profile & Wallet</h1>

      <div style={styles.content}>
        {/* Profile Section */}
        <section style={styles.profileSection}>
          <h2 className="p-1 text-center mb-2">Profile Details</h2>

          <div className="d-flex flex-row justify-content-between align-items-first">
            <div>
              <div style={styles.formGroup}>
                <label>First Name:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={tempProfile.firstName}
                    onChange={handleProfileChange}
                    style={styles.input}
                    autoFocus
                  />
                ) : (
                  <p>{profile.firstName}</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label>Last Name:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={tempProfile.lastName}
                    onChange={handleProfileChange}
                    style={styles.input}
                  />
                ) : (
                  <p>{profile.lastName}</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label>Mobile Number:</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="mobile"
                    value={tempProfile.mobile}
                    onChange={handleProfileChange}
                    style={styles.input}
                    placeholder="+91XXXXXXXXXX"
                  />
                ) : (
                  <p>{profile.mobile}</p>
                )}
              </div>
            </div>

            <div style={styles.profileImageWrapper}>
              <img
                src={tempProfile.profileImage}
                alt="Profile"
                style={styles.profileImage}
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={styles.fileInput}
                  title="Change Profile Image"
                />
              )}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Email:</label>
            <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {profile.email}
              {profile.emailVerified ? (
                <span style={styles.verifiedBadge}>Verified ✓</span>
              ) : (
                <button
                  onClick={resendVerification}
                  style={styles.resendBtn}
                  title="Resend Verification Email"
                >
                  Resend Verification
                </button>
              )}
            </p>
          </div>

          <div style={styles.buttonGroup}>
            <div>
              {editMode ? (
                <>
                  <button style={styles.saveBtn} onClick={saveProfile}>
                    Save
                  </button>
                  <button style={styles.cancelBtn} onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  style={styles.editBtn}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                style={styles.changePasswordBtn}
                onClick={() => alert("Redirect to Change Password Page")}
              >
                Change Password
              </button>
            </div>
            <div>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {profileMessage && <p style={styles.message}>{profileMessage}</p>}
        </section>

        {/* Wallet Section */}
        <section style={styles.walletSection}>
          <h2 className="p-1 text-center mb-2">Wallet</h2>
          <div style={styles.walletBalance}>
          <div>
              Balance:{" "}
            <span style={styles.balanceAmount}>
              ₹{walletBalance.toFixed(2)}
            </span>
          </div>

            <button
              onClick={openWithdrawalModal}
              disabled={walletBalance < MIN_WITHDRAWAL_AMOUNT}
              style={{
                ...styles.withdrawBtn,
                opacity: walletBalance < MIN_WITHDRAWAL_AMOUNT ? 0.5 : 1,
                cursor:
                  walletBalance < MIN_WITHDRAWAL_AMOUNT
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Request Withdrawal
            </button>
            {walletBalance < MIN_WITHDRAWAL_AMOUNT && (
              <p style={styles.infoText}>
                Minimum ₹{MIN_WITHDRAWAL_AMOUNT} required to request withdrawal.
              </p>
            )}
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            <label>
              Filter Type:{" "}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={styles.select}
              >
                <option value="all">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </label>

            <label>
              From:{" "}
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                style={styles.dateInput}
              />
            </label>

            <label>
              To:{" "}
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                style={styles.dateInput}
              />
            </label>
          </div>

          {/* Transactions Table */}
          <table style={styles.transactionsTable}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Description</th>
                <th style={{ textAlign: "right" }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.description}</td>
                  <td
                    style={{
                      textAlign: "right",
                      color: tx.type === "credit" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {tx.type === "debit" ? "-" : "+"}
                    {Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Withdrawal Modal */}
      {withdrawalOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3>Request Withdrawal</h3>
            <p>Available Balance: ₹{walletBalance.toFixed(2)}</p>
            <input
              type="number"
              min={MIN_WITHDRAWAL_AMOUNT}
              max={walletBalance}
              step="0.01"
              placeholder={`Minimum ₹${MIN_WITHDRAWAL_AMOUNT}`}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              style={styles.input}
            />
            {withdrawMessage && <p style={styles.message}>{withdrawMessage}</p>}
            <div style={styles.modalButtons}>
              <button style={styles.saveBtn} onClick={handleWithdrawalRequest}>
                Submit
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setWithdrawalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for demo, can be replaced with Tailwind or CSS Modules
const styles = {
  container: {
    maxWidth: 1000,
    margin: "auto",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  pageTitle: {
    textAlign: "center",
    marginTop: 20,
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "5rem",
  },
  profileSection: {
    flex: "1 1 400px",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "2.5rem",
    boxShadow: "0 0 10px #ccc",
  },
  walletSection: {
    flex: "1 1 400px",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "3rem",
    boxShadow: "0 0 10px #ccc",
  },
  profileImageWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  profileImage: {
    width: "200px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solidrgba(0, 123, 255, 0.38)",
    position: "absolute",
    top: 0,
    right: "30px",
  },
  fileInput: {
    position: "absolute",
    bottom: 0,
    left: 0,
    opacity: 0.7,
    width: "100%",
    cursor: "pointer",
  },
  formGroup: {
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: "6px 10px",
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: "10px",
  },
  saveBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
  },
  changePasswordBtn: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
  },
  verifiedBadge: {
    color: "green",
    fontWeight: "bold",
  },
  resendBtn: {
    backgroundColor: "#17a2b8",
    color: "white",
    border: "none",
    padding: "4px 10px",
    borderRadius: 4,
    cursor: "pointer",
  },
  message: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  walletBalance: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
  },
  balanceAmount: {
    color: "#28a745",
  },
  withdrawBtn: {
    padding: "5px 20px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: 5,
    color: "white",
    cursor: "pointer",
    marginBottom: 5,
    fontSize: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  filters: {
    display: "flex",
    gap: 15,
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  select: {
    padding: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  dateInput: {
    padding: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  transactionsTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  transactionsTableThTd: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: 8,
    width: "90%",
    maxWidth: 400,
    boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  },
  modalButtons: {
    marginTop: 15,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
};

export default DeliveryAgentProfileWalletPage;
