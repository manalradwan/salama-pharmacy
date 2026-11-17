import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Egyptian mobile number is required.';
    } else if (!/^01[0125][0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid 11-digit Egyptian phone number (010, 011, 012, 015).';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to Salama Pharmacy\'s Terms and Privacy Policy.';
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

    register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    navigate('/');
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Create Account' }]} />

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-badge">
              <FaUserPlus />
            </div>
            <h1 className="auth-title">Create New Account</h1>
            <p className="auth-subtitle">
              Join Salama Pharmacy for easy medicine ordering, prescriptions, and instant delivery
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="e.g. Ahmed Mohamed"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="form-error">{errors.fullName}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Egyptian Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="01012345678"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="At least 6 characters"
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

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div className="auth-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="auth-toggle-pwd"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Show / Hide confirm password"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="form-group">
              <label className="auth-checkbox-label" style={{ alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--primary-green)', marginTop: 3 }}
                />
                <span style={{ fontSize: '0.85rem' }}>
                  I agree to Salama Pharmacy&apos;s{' '}
                  <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Terms of Service</span> and{' '}
                  <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Privacy Policy</span>.
                </span>
              </label>
              {errors.agreeTerms && <div className="form-error">{errors.agreeTerms}</div>}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '1.05rem', marginTop: '0.5rem' }}
            >
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
