import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignupPage = () => {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    confirmPassword: "",
    agree: false, // ✅ renamed from agree
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!isLogin) {
      // Signup validation
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Enter 10-digit phone number";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agree)
        newErrors.agree = "You must accept the terms & conditions";
    } else {
      // Login validation
      if (!formData.email.trim() && !formData.phone.trim()) {
        newErrors.email = "Email or Phone is required";
      }
      if (!formData.password) newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = "http://localhost:5000"; // ✅ your Node/Express backend

const validationErrors = validate();
if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors);
  return;
}


    const url = isLogin
      ? `${BASE_URL}/api/auth/login`
      : `${BASE_URL}/api/auth/signup`;

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
          agree: formData.agree,
        };

    try {
      setSubmitting(true);
      const { data } = await axios.post(url, payload);

      // expecting { token, user: { role, ... } }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      alert(`${isLogin ? "Logged in" : "Signed up"} successfully!`);
      // Redirect based on role
      const role = data.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "agent") {
        navigate("/deliveryagent");
      } else {
        navigate("/dashboard");
      }
      // OPTIONAL: redirect after login/signup
      // navigate("/dashboard");

      // Reset form
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agree: false,
        role: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrors({ api: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: 450,
          margin: "50px auto",
          padding: 30,
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ddd",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Welcome to Delivery App
        </h2>

        {/* Toggle Tabs */}
        <div style={{ display: "flex", marginBottom: 20 }}>
          <button
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              backgroundColor: isLogin ? "#fb641b" : "#eee",
              color: isLogin ? "#fff" : "#555",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px 0 0 5px",
            }}
            aria-pressed={isLogin}
            aria-label="Login Tab"
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              backgroundColor: !isLogin ? "#fb641b" : "#eee",
              color: !isLogin ? "#fff" : "#555",
              border: "none",
              cursor: "pointer",
              borderRadius: "0 5px 5px 0",
            }}
            aria-pressed={!isLogin}
            aria-label="Signup Tab"
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <>
              {/* Name */}
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: 4 }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: errors.name ? 4 : 12,
                  borderRadius: 4,
                  border: errors.name ? "1px solid red" : "1px solid #ccc",
                }}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <div id="name-error" style={{ color: "red", marginBottom: 8 }}>
                  {errors.name}
                </div>
              )}
            </>
          )}
          <label
            htmlFor="lastName"
            style={{ display: "block", marginBottom: 4 }}
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 8,
              marginBottom: errors.lastName ? 4 : 12,
              borderRadius: 4,
              border: errors.lastName ? "1px solid red" : "1px solid #ccc",
            }}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <div id="lastName-error" style={{ color: "red", marginBottom: 8 }}>
              {errors.lastName}
            </div>
          )}

          {/* Email or Phone */}
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
            {isLogin ? "Email or Phone" : "Email"}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 8,
              marginBottom: errors.email ? 4 : 12,
              borderRadius: 4,
              border: errors.email ? "1px solid red" : "1px solid #ccc",
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <div id="email-error" style={{ color: "red", marginBottom: 8 }}>
              {errors.email}
            </div>
          )}

          {/* Phone for Signup */}
          {!isLogin && (
            <>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: 4 }}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: errors.phone ? 4 : 12,
                  borderRadius: 4,
                  border: errors.phone ? "1px solid red" : "1px solid #ccc",
                }}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <div id="phone-error" style={{ color: "red", marginBottom: 8 }}>
                  {errors.phone}
                </div>
              )}
            </>
          )}
          <label htmlFor="role" style={{ display: "block", marginBottom: 4 }}>
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 8,
              marginBottom: errors.role ? 4 : 12,
              borderRadius: 4,
              border: errors.role ? "1px solid red" : "1px solid #ccc",
            }}
          >
            <option value="">-- Select Role --</option>
            <option value="agent">Agent</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="delivery">Delivery</option>
          </select>
          {errors.role && (
            <div style={{ color: "red", marginBottom: 8 }}>{errors.role}</div>
          )}

          {/* Password */}
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: 4 }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 8,
                marginBottom: errors.password ? 4 : 12,
                borderRadius: 4,
                border: errors.password ? "1px solid red" : "1px solid #ccc",
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
                fontSize: 14,
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div id="password-error" style={{ color: "red", marginBottom: 8 }}>
              {errors.password}
            </div>
          )}

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <>
              <label
                htmlFor="confirmPassword"
                style={{ display: "block", marginBottom: 4 }}
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: errors.confirmPassword ? 4 : 12,
                  borderRadius: 4,
                  border: errors.confirmPassword
                    ? "1px solid red"
                    : "1px solid #ccc",
                }}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <div
                  id="confirmPassword-error"
                  style={{ color: "red", marginBottom: 8 }}
                >
                  {errors.confirmPassword}
                </div>
              )}
            </>
          )}

          {/* Terms & Conditions for Signup */}
          {!isLogin && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 14 }}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  aria-invalid={!!errors.agree}
                  aria-describedby={errors.agree ? "terms-error" : undefined}
                />{" "}
                I accept the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </label>
              {errors.agree && (
                <div id="terms-error" style={{ color: "red", marginTop: 4 }}>
                  {errors.agree}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#fb641b",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: submitting ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: 16,
            }}
            aria-busy={submitting}
          >
            {submitting
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>
        </form>

        {/* Switch forms link */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                }}
                style={{
                  color: "#fb641b",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                aria-label="Switch to Signup"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setErrors({});
                }}
                style={{
                  color: "#fb641b",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                aria-label="Switch to Login"
              >
                Login
              </button>
            </>
          )}
        </p>

        {/* Social Login - UI placeholders */}
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <p style={{ marginBottom: 12, color: "#555" }}>Or continue with</p>
          <button
            style={{
              backgroundColor: "#db4437",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              marginRight: 8,
              borderRadius: 4,
              cursor: "pointer",
            }}
            aria-label="Login with Google"
            onClick={() => alert("Google login is not implemented")}
          >
            Google
          </button>
          <button
            style={{
              backgroundColor: "#3b5998",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
            }}
            aria-label="Login with Facebook"
            onClick={() => alert("Facebook login is not implemented")}
          >
            Facebook
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginSignupPage;
