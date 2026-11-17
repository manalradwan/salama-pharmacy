import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaUser, FaBars, FaTimes, FaPrescriptionBottleAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatCurrency';
import SearchBar from './SearchBar';

const Header = () => {
  const { totalItemsCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="container">
          {/* Logo - Salama Pharmacy */}
          <Link to="/" className="logo">
            <div className="logo-icon-wrapper" title="Salama Pharmacy">
              <FaPrescriptionBottleAlt />
            </div>
            <div className="logo-text-block">
              <span className="logo-title">
                Salama <span>Pharmacy</span>
              </span>
              <span className="logo-subtitle">Trusted Healthcare Egypt</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <SearchBar />

          {/* Header Actions */}
          <div className="header-actions">
            {/* Wishlist Link */}
            <Link to="/wishlist" className="action-item" title="Saved Wishlist">
              <div className="action-icon-wrap">
                <FaHeart />
                {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
              </div>
              <div className="action-text d-none-mobile">
                <span className="action-label">My Saved</span>
                <span className="action-value">Wishlist</span>
              </div>
            </Link>

            {/* Shopping Cart Link */}
            <Link to="/cart" className="action-item" title="Shopping Cart">
              <div className="action-icon-wrap">
                <FaShoppingBag />
                {totalItemsCount > 0 && <span className="action-badge">{totalItemsCount}</span>}
              </div>
              <div className="action-text d-none-mobile">
                <span className="action-label">Shopping Cart</span>
                <span className="action-value">{formatPrice(subtotal)}</span>
              </div>
            </Link>

            {/* Account Link */}
            {isAuthenticated ? (
              <div className="action-item" style={{ cursor: 'default' }}>
                <Link to="/login" title="My Account" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-green)' }}
                  />
                  <div className="action-text">
                    <span className="action-label">Welcome</span>
                    <span className="action-value">{user.name.split(' ')[0]}</span>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="action-item" title="Sign In">
                <div className="action-icon-wrap">
                  <FaUser />
                </div>
                <div className="action-text">
                  <span className="action-label">Account</span>
                  <span className="action-value">Sign In</span>
                </div>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle mobile menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
                <div className="logo-icon-wrapper" style={{ width: 36, height: 36, fontSize: '1.2rem' }}>
                  <FaPrescriptionBottleAlt />
                </div>
                <span className="logo-title" style={{ fontSize: '1.25rem' }}>
                  Salama <span>Pharmacy</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.4rem', color: 'var(--secondary-text)' }}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="drawer-body">
              {/* Mobile Search */}
              <SearchBar onSearchComplete={() => setMobileMenuOpen(false)} />

              {/* Navigation Links */}
              <div className="drawer-nav-list">
                <NavLink
                  to="/"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </NavLink>

                {/* Direct category shortcuts */}
                <NavLink
                  to="/products?category=Treatments"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • Treatments
                </NavLink>
                <NavLink
                  to="/products?category=Skin%20Care"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • Skin Care
                </NavLink>
                <NavLink
                  to="/products?category=Body%20Care"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • Body Care
                </NavLink>
                <NavLink
                  to="/products?category=Vitamins%20%26%20Supplements"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • Vitamins & Supplements
                </NavLink>
                <NavLink
                  to="/products?category=Mother%20%26%20Child"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • Mother & Child
                </NavLink>
                <NavLink
                  to="/products?category=First%20Aid%20%26%20Devices"
                  className="drawer-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--primary-green)', fontWeight: 600 }}
                >
                  • First Aid & Devices
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist ({wishlistCount})
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shopping Cart ({totalItemsCount})
                </NavLink>

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="drawer-nav-item"
                    style={{ textAlign: 'left', color: 'var(--danger-red)' }}
                  >
                    Logout ({user.name})
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="drawer-nav-item"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="drawer-nav-item"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>

              {/* Support Hotline */}
              <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--light-bg)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>24/7 Pharmacist Hotline:</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-green)' }}>19888</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)', marginTop: '0.25rem' }}>
                  WhatsApp Orders: +20 100 555 1988
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
