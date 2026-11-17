import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/auth.css';

const Login = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(formData.email, formData.password, formData.rememberMe);
    navigate('/');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      addToast('Please enter a valid email address to reset your password', 'error');
      return;
    }
    setForgotModalOpen(false);
    addToast(`Password reset link sent to ${resetEmail}`, 'success');
    setResetEmail('');
  };

  if (isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.25rem', border: '3px solid var(--primary-green)' }}
          />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Welcome back, {user.name}!
          </h2>
          <p style={{ color: 'var(--secondary-text)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            {user.email} &middot; Verified Account at Salama Pharmacy
          </p>

          <div style={{ background: 'var(--light-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--secondary-text)' }}>Account Status:</span>
              <span className="badge badge-success">Active &amp; Verified</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--secondary-text)' }}>Digital Prescription Vault:</span>
              <span style={{ fontWeight: 600 }}>Activated</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <button className="btn btn-outline" onClick={logout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Sign In' }]} />

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-badge">
              <FaLock />
            </div>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">
              Sign in to track your medicine orders and prescriptions at Salama Pharmacy
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="auth-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show / Hide password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="auth-options">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--primary-green)' }}
                />
                <span>Remember me on this device</span>
              </label>

              <button
                type="button"
                className="auth-link"
                onClick={() => setForgotModalOpen(true)}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '1.05rem' }}
            >
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="auth-link">
              Create an account with Salama
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="modal-overlay" onClick={() => setForgotModalOpen(false)}>
          <div
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '2rem' }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Reset Password
            </h3>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Enter your registered email and we'll send you a secure link to set a new password.
            </p>

            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setForgotModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
