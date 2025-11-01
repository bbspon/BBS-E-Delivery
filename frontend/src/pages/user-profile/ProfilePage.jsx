import React, { useState, useEffect } from 'react';
import { IoArrowBackCircle } from "react-icons/io5";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    profileImage: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      mobile: '9876543210',
      profileImage: '',
    };
    setUser(savedUser);
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setEditMode(false);
    setMessage('✅ Profile updated successfully.');
  };

  const goBack = () => {
    window.history.back('/');
  };

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.backBtn} className=' d-flex align-items-center gap-2'><IoArrowBackCircle />Back</button>
      <h2 style={styles.header}>My Profile</h2>

      {/* Profile Image */}
      <div style={styles.imageSection}>
        <img
          src={user.profileImage || 'https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?pid=ImgDet&w=474&h=496&rs=1'}
          alt="Profile"
          style={styles.profileImage}
        />
        {editMode && (
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: 10 }} />
        )}
      </div>

      {/* Input Fields */}
      <div style={styles.form}>
        <label style={styles.label}>First Name</label>
        <input
          style={styles.input}
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        <label style={styles.label}>Last Name</label>
        <input
          style={styles.input}
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        <label style={styles.label}>Email Address</label>
        <input
          style={styles.input}
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        <label style={styles.label}>Mobile Number</label>
        <input
          style={styles.input}
          name="mobile"
          value={user.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        {message && <p style={styles.success}>{message}</p>}

        <button
          onClick={editMode ? saveChanges : () => setEditMode(true)}
          style={editMode ? styles.saveBtn : styles.editBtn}
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
   
    height: '100vh',
    margin: '40px auto',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '0 20px',
  },
  header: {
    borderBottom: '2px solid #eee',
    paddingBottom: 10,
    marginBottom: 20,
    fontSize: 24,
    color: '#333',
  },
  backBtn: {
    marginBottom: 15,
    background: 'none',
    border: 'none',
    color: '#1a73e8',
    fontWeight: 'bold',
    fontSize: 16,
    cursor: 'pointer',
  },
  imageSection: {
    textAlign: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: '#555',
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  editBtn: {
    marginTop: 10,
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 5,
    cursor: 'pointer',
  },
  saveBtn: {
    marginTop: 10,
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 5,
    cursor: 'pointer',
  },
  success: {
    color: '#4caf50',
    fontWeight: '500',
  },
};

export default ProfilePage;
