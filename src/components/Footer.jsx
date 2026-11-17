import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPrescriptionBottleAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter
} from 'react-icons/fa';
import { categories } from '../data/categories';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Column 1: Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon-wrapper" style={{ width: 40, height: 40, fontSize: '1.25rem' }}>
                <FaPrescriptionBottleAlt />
              </div>
              <span className="footer-logo-title">
                Salama <span>Pharmacy</span>
              </span>
            </Link>

            <p className="footer-desc">
              Salama Pharmacy is Egypt's trusted online pharmacy — open 24/7. We supply 100% genuine EDA-certified medicines, supplements, skin care, and baby products with fast home delivery nationwide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div className="footer-contact-item">
                <FaPhoneAlt className="icon" />
                <span>Hotline: 19888 (24/7 Support)</span>
              </div>
              <div className="footer-contact-item">
                <FaWhatsapp className="icon" style={{ color: '#25D366' }} />
                <span>WhatsApp Orders: +20 100 555 1988</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="icon" />
                <span>support@salama-pharmacy.com</span>
              </div>
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="icon" />
                <span>Main Branch: 45 Mossadak St, Dokki, Giza, Egypt</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              {[
                { Icon: FaFacebook, href: '#', label: 'Facebook' },
                { Icon: FaInstagram, href: '#', label: 'Instagram' },
                { Icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
                { Icon: FaTwitter, href: '#', label: 'Twitter' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#2B2B2B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '0.95rem',
                    transition: 'background 0.2s, color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-green)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2B2B2B';
                    e.currentTarget.style.color = '#999';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact &amp; Branches</Link></li>
              <li><Link to="/wishlist" className="footer-link">My Wishlist</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Cart</Link></li>
              <li><Link to="/login" className="footer-link">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="footer-heading">Product Categories</h4>
            <ul className="footer-links-list">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="footer-link"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div>
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links-list" style={{ marginBottom: '1.5rem' }}>
              <li><Link to="/contact" className="footer-link">Track My Order</Link></li>
              <li><Link to="/about" className="footer-link">Licensed Pharmacist Team</Link></li>
              <li><Link to="/contact" className="footer-link">Delivery &amp; Return Policy</Link></li>
              <li><Link to="/contact" className="footer-link">FAQ &amp; Help Center</Link></li>
              <li><Link to="/login" className="footer-link">Account &amp; Prescription Vault</Link></li>
            </ul>

            <div style={{ background: '#242424', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FaClock style={{ color: 'var(--primary-green)', fontSize: '1.1rem', flexShrink: 0 }} />
                <div>
                  <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.85rem' }}>Working Hours</div>
                  <div style={{ fontSize: '0.78rem', color: '#888' }}>24/7 — Every Day of the Year</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FaShieldAlt style={{ color: 'var(--primary-green)', fontSize: '1.1rem', flexShrink: 0 }} />
                <div>
                  <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.85rem' }}>100% Certified Medicines</div>
                  <div style={{ fontSize: '0.78rem', color: '#888' }}>Licensed by Egyptian Drug Authority (EDA)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-text">
            © 2026 Salama Pharmacy. All Rights Reserved. Licensed by the Egyptian Drug Authority (EDA).
          </p>

          <div className="payment-methods">
            <span className="payment-badge">Meeza</span>
            <span className="payment-badge">Vodafone Cash</span>
            <span className="payment-badge">InstaPay</span>
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
