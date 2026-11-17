import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import { FaBars, FaChevronDown, FaPhoneAlt } from 'react-icons/fa';
import { categories } from '../data/categories';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const isProductsPage = location.pathname === '/products';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-left">
          {/* Categories Dropdown */}
          <div className="category-menu-wrapper" ref={dropdownRef}>
            <button
              className="category-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <FaBars />
              <span>All Categories</span>
              <FaChevronDown
                style={{
                  fontSize: '0.75rem',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: '0.2s ease'
                }}
              />
            </button>

            {dropdownOpen && (
              <div className="category-dropdown-menu">
                <Link
                  to="/products"
                  className="category-menu-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span>All Products</span>
                  <span className="category-item-count">All</span>
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="category-menu-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <span className="category-item-count">{cat.count} items</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Top Navigation Links */}
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive && !isProductsPage ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <Link
                to="/products"
                className={`nav-link ${isProductsPage && !currentCategory ? 'active' : ''}`}
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Treatments"
                className={`nav-link ${isProductsPage && currentCategory.toLowerCase() === 'treatments' ? 'active' : ''}`}
              >
                Treatments
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Skin%20Care"
                className={`nav-link ${isProductsPage && currentCategory.toLowerCase() === 'skin care' ? 'active' : ''}`}
              >
                Skin Care
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Body%20Care"
                className={`nav-link ${isProductsPage && currentCategory.toLowerCase() === 'body care' ? 'active' : ''}`}
              >
                Body Care
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Vitamins%20%26%20Supplements"
                className={`nav-link ${isProductsPage && (currentCategory.toLowerCase().includes('vitamin') || currentCategory.toLowerCase().includes('supplements')) ? 'active' : ''}`}
              >
                Vitamins
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Mother%20%26%20Child"
                className={`nav-link ${isProductsPage && (currentCategory.toLowerCase().includes('mother') || currentCategory.toLowerCase().includes('child') || currentCategory.toLowerCase().includes('baby')) ? 'active' : ''}`}
              >
                Mother & Child
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=First%20Aid%20%26%20Devices"
                className={`nav-link ${isProductsPage && (currentCategory.toLowerCase().includes('aid') || currentCategory.toLowerCase().includes('device')) ? 'active' : ''}`}
              >
                First Aid
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Hotline */}
        <div className="nav-right">
          <FaPhoneAlt className="nav-phone-icon" />
          <span>Hotline: 19888</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
