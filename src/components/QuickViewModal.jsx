import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaStar, FaHeart, FaShoppingBag, FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import { useQuickView } from '../context/QuickViewContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatCurrency';

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, isOpen } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    closeQuickView();
  };

  return (
    <div className="modal-overlay" onClick={closeQuickView}>
      <div
        className="quickview-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '820px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.25s ease'
        }}
      >
        <button
          onClick={closeQuickView}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--light-bg)',
            borderRadius: '50%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            color: 'var(--dark-text)',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', padding: '2.5rem' }}>
          {/* Image Column */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              style={{ maxHeight: '340px', width: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-success">
                <FaCheckCircle style={{ marginRight: 4 }} /> In Stock at Salama Pharmacy
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--secondary-text)' }}>
                SKU: {quickViewProduct.sku}
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark-text)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', color: '#FF8A00' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    style={{ opacity: i < Math.floor(quickViewProduct.rating) ? 1 : 0.3, fontSize: '0.9rem' }}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{quickViewProduct.rating}</span>
              <span style={{ color: 'var(--secondary-text)', fontSize: '0.85rem' }}>
                ({quickViewProduct.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price in EGP */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--muted-text)', textDecoration: 'line-through' }}>
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
              {quickViewProduct.discount && (
                <span className="badge badge-sale">{quickViewProduct.discount}</span>
              )}
            </div>

            {/* Short Description */}
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {quickViewProduct.shortDescription || quickViewProduct.description}
            </p>

            {/* Brand / Dosage */}
            <div style={{ padding: '0.75rem 1rem', background: 'var(--light-bg)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Manufacturer / Brand:</span>
                <span style={{ fontWeight: 600 }}>{quickViewProduct.brand}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Dosage Form & Packaging:</span>
                <span style={{ fontWeight: 600 }}>{quickViewProduct.dosageForm}</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              {/* Quantity Counter */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-gray)', borderRadius: 'var(--radius-full)', padding: '0.35rem 0.65rem' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-text)' }}
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={11} />
                </button>
                <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-text)' }}
                  aria-label="Increase quantity"
                >
                  <FaPlus size={11} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ flex: 1 }}
              >
                <FaShoppingBag /> Add to Cart ({formatPrice(quickViewProduct.price * quantity)})
              </button>

              {/* Wishlist Button */}
              <button
                className={`card-icon-btn ${isWishlisted ? 'wishlist-active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct)}
                style={{ width: 44, height: 44 }}
                title="Wishlist"
                aria-label="Wishlist toggle"
              >
                <FaHeart />
              </button>
            </div>

            {/* Full Details link */}
            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={closeQuickView}
              style={{ marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--primary-green)', fontWeight: 600, textAlign: 'center', textDecoration: 'underline' }}
            >
              View Full Clinical Details & Usage Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;