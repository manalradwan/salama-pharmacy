import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaLock, FaCreditCard, FaMoneyBillWave, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatCurrency';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, subtotal, discountAmount, shippingFee, taxFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '01001234567',
    governorate: 'Cairo',
    area: 'Nasr City',
    address: '14 Abbas El-Akkad St, Building 14, 3rd Floor',
    notes: '',
    paymentMethod: 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Egyptian mobile number is required';
    } else if (!/^01[0125][0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid 11-digit Egyptian phone number (010, 011, 012, 015)';
    }
    if (!formData.address.trim()) errs.address = 'Detailed address (street and building number) is required';
    return errs;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = 'SALAMA-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
      addToast(`Order confirmed successfully #${generatedId}! Our pharmacist will contact you shortly.`, 'success');
    }, 1200);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="checkout-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: '2.5rem'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--light-bg)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: 'var(--secondary-text)'
          }}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {orderComplete ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>
              <FaCheckCircle />
            </div>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Order Confirmed Successfully!
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Thank you for trusting <strong>Salama Pharmacy</strong>. Licensed pharmacists are reviewing and preparing your prescription medications and healthcare items.
            </p>

            <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '520px', margin: '0 auto 2rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-gray)' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Order Number:</span>
                <span style={{ fontWeight: 800, color: 'var(--primary-green)' }}>{orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Delivery Address:</span>
                <span style={{ fontWeight: 600 }}>{formData.address}, {formData.area}, {formData.governorate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Contact Phone:</span>
                <span style={{ fontWeight: 600 }}>{formData.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Estimated Delivery:</span>
                <span style={{ fontWeight: 700, color: 'var(--dark-green)' }}>Within 2 Hours (Express Delivery)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-gray)' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Total Amount Due:</span>
                <span style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '1.1rem' }}>{formatPrice(total)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleFinish}>
              Return to Pharmacy Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                <FaLock />
              </div>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--dark-text)', margin: 0 }}>
                  Checkout – Salama Pharmacy
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
                  Fast & secure pharmaceutical delivery across Cairo, Giza, and all Egyptian governorates
                </span>
              </div>
            </div>

            {/* 1. Contact and Shipping Information */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--dark-text)' }}>
                1. Customer & Delivery Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ahmed Mohamed"
                  />
                  {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Egyptian Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 01001234567"
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Governorate *</label>
                  <select
                    name="governorate"
                    className="form-control"
                    value={formData.governorate}
                    onChange={handleChange}
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Qalyubia">Qalyubia</option>
                    <option value="Sharqia">Sharqia</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Gharbia">Gharbia</option>
                    <option value="Red Sea">Red Sea</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">District / Neighborhood *</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. Dokki / Nasr City / New Cairo / Maadi"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                  <label className="form-label">Detailed Street Address (Street name, Building #, Floor #) *</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 25 Mossadak St, Building 14, 4th Floor, Apt 8"
                  />
                  {errors.address && <div className="form-error">{errors.address}</div>}
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--dark-text)' }}>
                2. Payment Method
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: formData.paymentMethod === 'cod' ? '2px solid var(--primary-green)' : '1px solid var(--border-gray)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: formData.paymentMethod === 'cod' ? 'var(--light-green)' : 'var(--white)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <FaMoneyBillWave style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Cash on Delivery (COD)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: formData.paymentMethod === 'instapay' ? '2px solid var(--primary-green)' : '1px solid var(--border-gray)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: formData.paymentMethod === 'instapay' ? 'var(--light-green)' : 'var(--white)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="instapay"
                    checked={formData.paymentMethod === 'instapay'}
                    onChange={handleChange}
                  />
                  <FaMobileAlt style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>InstaPay (Instant Transfer)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: formData.paymentMethod === 'vodafone' ? '2px solid var(--primary-green)' : '1px solid var(--border-gray)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: formData.paymentMethod === 'vodafone' ? 'var(--light-green)' : 'var(--white)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="vodafone"
                    checked={formData.paymentMethod === 'vodafone'}
                    onChange={handleChange}
                  />
                  <FaMobileAlt style={{ color: 'var(--danger-red)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Vodafone Cash / Mobile Wallet</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: formData.paymentMethod === 'card' ? '2px solid var(--primary-green)' : '1px solid var(--border-gray)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: formData.paymentMethod === 'card' ? 'var(--light-green)' : 'var(--white)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <FaCreditCard style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Meeza / Visa / Mastercard</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div style={{ background: 'var(--light-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Card Number (Meeza / Visa)</label>
                    <input type="text" className="form-control" defaultValue="5200 •••• •••• 1988" readOnly />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Expiration</label>
                    <input type="text" className="form-control" defaultValue="08/29" readOnly />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>CVV</label>
                    <input type="text" className="form-control" defaultValue="421" readOnly />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Order Review Summary */}
            <div style={{ background: '#FAFBFB', border: '1px solid var(--border-gray)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>Products & Medicines Subtotal:</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--dark-green)' }}>
                  <span>Coupon Discount:</span>
                  <span style={{ fontWeight: 700 }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--secondary-text)' }}>
                  Express Delivery Fee:
                  {subtotal >= 350 && (
                    <span style={{ color: 'var(--primary-green)', display: 'block', fontSize: '0.8rem' }}>
                      (Free shipping on orders over 350 EGP)
                    </span>
                  )}
                </span>
                <span style={{ fontWeight: 700, color: shippingFee === 0 ? 'var(--primary-green)' : 'var(--dark-text)' }}>
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-gray)', fontSize: '1.25rem', fontWeight: 800 }}>
                <span>Total Amount Due:</span>
                <span style={{ color: 'var(--primary-green)' }}>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '1.1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirming Order with Pharmacy...' : `Confirm & Place Order (${formatPrice(total)})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;