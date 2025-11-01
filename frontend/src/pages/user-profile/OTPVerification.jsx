import React, { useState, useRef, useEffect } from 'react';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);

  const inputs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      if (newOtp.join('').length === 6 && newOtp.every((digit) => digit !== '')) {
        handleVerify(newOtp.join(''));
      }
    }
  };

  const handleVerify = (code) => {
    setVerifying(true);
    setTimeout(() => {
      if (code === '123456') {
        alert('OTP Verified Successfully!');
        // Proceed to next step
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setVerifying(false);
    }, 1000);
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setOtp(['', '', '', '', '', '']);
      setResendTimer(30);
      alert('A new OTP has been sent!');
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtp(digits);
      handleVerify(pasted);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>OTP Verification</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: 30 }}>
        Enter the 6-digit OTP sent to your phone <strong>+91-XXXXXX7890</strong>
      </p>

      {/* OTP Input Fields */}
      <div
        onPaste={handlePaste}
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            ref={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            style={{
              width: 40,
              height: 50,
              fontSize: 24,
              textAlign: 'center',
              borderRadius: 6,
              border: error ? '1px solid red' : '1px solid #ccc',
            }}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>
      )}

      <button
        onClick={() => handleVerify(otp.join(''))}
        disabled={verifying || otp.some((digit) => digit === '')}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          backgroundColor: '#fb641b',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontWeight: 'bold',
          cursor: verifying ? 'not-allowed' : 'pointer',
        }}
        aria-busy={verifying}
      >
        {verifying ? 'Verifying...' : 'Verify OTP'}
      </button>

      {/* Resend OTP Section */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ color: '#777' }}>
          Didn’t receive the code?{' '}
          <button
            onClick={handleResend}
            disabled={resendTimer > 0}
            style={{
              background: 'none',
              border: 'none',
              color: resendTimer > 0 ? '#aaa' : '#2874f0',
              textDecoration: 'underline',
              cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Resend {resendTimer > 0 && `in ${resendTimer}s`}
          </button>
        </span>
      </div>

      {/* Edit Phone Number */}
      <div style={{ textAlign: 'center', marginTop: 15 }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#555',
            textDecoration: 'underline',
            fontSize: 14,
            cursor: 'pointer',
          }}
          onClick={() => alert('Go back to edit phone number')}
        >
          Change Phone Number
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: 15 }}>
        <p>back to <span style={{ cursor: 'pointer' }}>HomePage</span></p>
      </div>
      <div>
        <p style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>
          By continuing, you agree to the{' '}
          <span style={{ color: '#2874f0', cursor: 'pointer' }}>Terms of Use</span> and{' '}
          <span style={{ color: '#2874f0', cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
