import React, { useState } from 'react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setSuccessMsg('');

    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace with real API call
      // await axios.post('/api/auth/reset-password', { password });

      setSuccessMsg('Password reset successful. You can now login with your new password.');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '50px auto',
      padding: 30,
      border: '1px solid #ddd',
      borderRadius: 8,
      fontFamily: 'exo',
    }}>
      <h3 style={{ marginBottom: 20 ,textAlign:'center'}}>Reset Your Password</h3>

      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {successMsg && <div style={{ color: 'green', marginBottom: 10 }}>{successMsg}</div>}

      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: 600, marginBottom: 5, marginLeft: 10 }}>New Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #ccc',marginBottom: 10 }}
          placeholder="Enter new password"
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600 ,marginBottom: 5, marginLeft: 10 }}>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
          placeholder="Re-enter new password"
        />
      </div>

      <button
        onClick={handleReset}
        disabled={loading}
        style={{
          backgroundColor: '#fb641b',
          color: '#fff',
          border: 'none',
          padding: '12px 20px',
          width: '100%',
          borderRadius: 4,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      <div>
        <p style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ color: '#fb641b' }}>Back to main page</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
