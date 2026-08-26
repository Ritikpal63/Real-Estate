import React, { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contextApi/useAuth";
import axiosInstance from "../utils/axiosConfig";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [otpLoading, setOtpLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState("");

  const [resendSeconds, setResendSeconds] = useState(0);

  const [otpEmail, setOtpEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    contact: "",
    category: "Consumer",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (resendSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
    name === "email" &&
    otpSent &&
    value.trim().toLowerCase() !== otpEmail)
    {
      setOtpSent(false);
      setOtp("");
      setResendSeconds(0);
      setOtpEmail("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);

    if (error) {
      setError("");
    }
  };

  const handleSendOtp = async () => {
    const cleanEmail = formData.email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address first");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setOtpLoading(true);
      setError("");
      setSuccess("");

      const response = await axiosInstance.post("/auth/send-register-otp", {
        email: cleanEmail
      });

      if (response.data.success) {
        setOtpSent(true);
        setOtpEmail(cleanEmail);
        setOtp("");
        setResendSeconds(60);

        setSuccess("OTP sent successfully. Please check your email.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const validateForm = () => {
    if (
    !formData.username.trim() ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.contact.trim() ||
    !formData.category ||
    !formData.password ||
    !formData.confirmPassword)
    {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address");

      return false;
    }

    const contactRegex = /^[6-9]\d{9}$/;

    if (!contactRegex.test(formData.contact.trim())) {
      setError("Please enter a valid 10 digit contact number");

      return false;
    }

    if (!["Dealer", "Consumer"].includes(formData.category)) {
      setError("Please select a valid category");

      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");

      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!otpSent) {
      setError("Please send OTP to your email first");

      return false;
    }

    if (formData.email.trim().toLowerCase() !== otpEmail) {
      setError("Email changed. Please request a new OTP");

      return false;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6 digit OTP");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const userData = {
        username: formData.username.trim(),

        name: formData.name.trim(),

        email: formData.email.trim().toLowerCase(),

        contact: formData.contact.trim(),

        category: formData.category,

        password: formData.password,

        otp
      };

      const result = await register(userData);

      if (result) {
        setSuccess(
          "Email verified and registration successful! Redirecting to login..."
        );

        setFormData({
          username: "",
          name: "",
          email: "",
          contact: "",
          category: "Consumer",
          password: "",
          confirmPassword: ""
        });

        setOtp("");
        setOtpSent(false);
        setOtpEmail("");
        setResendSeconds(0);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12">
            <div className="register">
              <h4 className="login_register_title">Create a new account:</h4>

              {error &&
              <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              }

              {success &&
              <div className="alert alert-success" role="alert">
                  {success}
                </div>
              }

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control requiredField input-label"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    required />

                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control requiredField input-label"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required />

                </div>

                <div className="form-group">
                  <div className="d-flex gap-2">
                    <input
                      type="email"
                      className="form-control requiredField input-label"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required />


                    <button
                      type="button"
                      className="btn btn-blog-bg"
                      onClick={handleSendOtp}
                      disabled={loading || otpLoading || resendSeconds > 0}
                      style={{
                        whiteSpace: "nowrap"
                      }}>

                      {otpLoading ?
                      "Sending..." :
                      resendSeconds > 0 ?
                      `${resendSeconds}s` :
                      otpSent ?
                      "Resend OTP" :
                      "Send OTP"}
                    </button>
                  </div>
                </div>

                {otpSent &&
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control requiredField input-label"
                    placeholder="Enter 6 Digit Email OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    disabled={loading}
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required />

                  </div>
                }

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control requiredField input-label"
                    placeholder="Contact Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={10}
                    inputMode="numeric"
                    required />

                </div>

                <div className="form-group">
                  <select
                    className="form-control requiredField input-label"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={loading}
                    required>

                    <option value="Consumer">Consumer</option>

                    <option value="Dealer">Dealer</option>
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control requiredField input-label"
                    placeholder="Password (min. 6 characters)"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required />

                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control requiredField input-label"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required />

                </div>

                <div className="form-group col-md-12 mbnone">
                  <button
                    className="btn btn-contact-bg"
                    type="submit"
                    disabled={loading || otpLoading}
                    style={{
                      width: "100%"
                    }}>

                    {loading ?
                    <>
                        <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true">
                      </span>
                        Creating Account...
                      </> :

                    "Verify OTP & Sign Up"
                    }
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default Register;
