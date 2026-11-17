import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <div className="top-bar-item">
            <FaMapMarkerAlt className="icon" />
            <span>Branches: Dokki • Nasr City • New Cairo • Maadi • Alexandria</span>
          </div>
          <div className="top-bar-divider"></div>
          <div className="top-bar-item">
            <FaPhoneAlt className="icon" />
            <span>24/7 Pharmacist Hotline: 19888</span>
          </div>
        </div>

        <div className="top-bar-right">
          <span style={{ color: '#84D187', fontWeight: 600 }}>
            Free express delivery on orders over 350 EGP!
          </span>
          <div className="top-bar-divider"></div>

          {isAuthenticated ? (
            <div className="top-bar-item">
              <FaUser className="icon" />
              <span>Hi, {user.name}</span>
              <button
                onClick={logout}
                className="top-bar-link"
                style={{ marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Log out"
              >
                <FaSignOutAlt /> (Logout)
              </button>
            </div>
          ) : (
            <div className="top-bar-item">
              <Link to="/login" className="top-bar-link">
                Sign In
              </Link>
              <span style={{ margin: '0 0.35rem' }}>/</span>
              <Link to="/register" className="top-bar-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
