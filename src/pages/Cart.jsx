import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingBag,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
  FaTag,
  FaShieldAlt
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import CheckoutModal from '../components/CheckoutModal';
import { formatPrice } from '../utils/formatCurrency';
import '../styles/cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    isFreeShipping,
    taxFee,
    total
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="cart-page">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="container">
        {cartItems.length === 0 ? (
          <div className="cart-empty-wrapper">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.75rem' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              You haven't added any medicines or medical supplies yet. Browse Salama Pharmacy's categories and order what you need for fast delivery.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Start Shopping</span>
              <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left: Cart Items Table */}
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product / Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product.id}>
                      {/* Product cell */}
                      <td>
                        <div className="cart-product-cell">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="cart-product-img"
                          />
                          <div>
                            <Link to={`/product/${item.product.id}`} className="cart-product-title">
                              {item.product.name}
                            </Link>
                            <div className="cart-product-cat">
                              {item.product.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Unit Price in EGP */}
                      <td style={{ fontWeight: 600, color: 'var(--dark-text)', fontSize: '0.95rem' }}>
                        {formatPrice(item.product.price)}
                      </td>

                      {/* Quantity */}
                      <td>
                        <div className="cart-qty-ctrl">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus size={10} />
                          </button>
                          <input
                            type="number"
                            className="qty-input"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(item.product.id, e.target.value)}
                          />
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </td>

                      {/* Subtotal in EGP */}
                      <td style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '1.05rem' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </td>

                      {/* Remove */}
                      <td>
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.product.id)}
                          title="Remove from cart"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table Bottom Action Bar */}
              <div className="cart-table-footer">
                <Link to="/products" className="btn btn-outline btn-sm">
                  <FaArrowRight />
                  <span>Continue Shopping</span>
                </Link>

                <button
                  className="btn btn-sm"
                  onClick={clearCart}
                  style={{ color: 'var(--danger-red)', background: 'var(--danger-light)' }}
                >
                  <FaTrash /> Clear Cart
                </button>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="cart-summary-box">
              <h3 className="summary-title">Order Summary</h3>

              {/* Coupon Form */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '0.4rem', display: 'block' }}>
                  Have a discount code?
                </label>
                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--light-green)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dark-green)', fontWeight: 600, fontSize: '0.9rem' }}>
                      <FaTag />
                      <span>{appliedCoupon.code} Applied Successfully!</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ color: 'var(--danger-red)', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <input
                      type="text"
                      className="coupon-input"
                      placeholder="e.g. SALAMA10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="coupon-btn">
                      Apply
                    </button>
                  </form>
                )}
                <div style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
                  Try <strong>SALAMA10</strong> for 10% off or <strong>SALAMA20</strong> for 20% off.
                </div>
              </div>

              {/* Calculations breakdown */}
              <div className="summary-row">
                <span style={{ color: 'var(--secondary-text)' }}>Products Subtotal:</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row" style={{ color: 'var(--dark-green)' }}>
                  <span>Coupon Discount:</span>
                  <span style={{ fontWeight: 700 }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span style={{ color: 'var(--secondary-text)' }}>
                  Express Delivery Fee:
                  {subtotal >= 350 && (
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--primary-green)' }}>
                      (Free shipping on orders over 350 EGP)
                    </span>
                  )}
                </span>
                <span style={{ fontWeight: 700, color: isFreeShipping ? 'var(--primary-green)' : 'var(--dark-text)' }}>
                  {isFreeShipping ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="summary-row total-row">
                <span>Total Amount:</span>
                <span style={{ color: 'var(--primary-green)' }}>{formatPrice(total)}</span>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '1rem', fontSize: '1.05rem' }}
                onClick={() => setIsCheckoutOpen(true)}
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--secondary-text)' }}>
                <FaShieldAlt style={{ color: 'var(--primary-green)' }} />
                <span>Secure payment: Cash on Delivery, InstaPay, or Vodafone Cash</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Cart;
