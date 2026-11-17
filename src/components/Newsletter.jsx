import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    addToast('Thank you for subscribing! Use code SALAMA20 for 20% off your order.', 'success');
  };

  return (
    <section style={{ backgroundColor: '#F2F9F3', padding: '4rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            <FaEnvelope />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.75rem' }}>
            Subscribe to Salama Pharmacy Newsletter
          </h2>
          <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Get exclusive seasonal health offers, clinical wellness tips from licensed Egyptian pharmacists, and <strong>20% OFF</strong> your order.
          </p>

          {subscribed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--white)', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary-green)', color: 'var(--primary-green)', fontWeight: 600 }}>
              <FaCheckCircle style={{ fontSize: '1.3rem' }} />
              <span>Successfully subscribed! Your voucher code is: <strong>SALAMA20</strong> (20% off at checkout).</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ maxWidth: '540px', margin: '0 auto' }}>
              <div style={{ display: 'flex', borderRadius: 'var(--radius-full)', overflow: 'hidden', backgroundColor: 'var(--white)', border: '1.5px solid var(--border-gray)', padding: '4px', boxShadow: 'var(--shadow-sm)' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address..."
                  style={{ flex: 1, border: 'none', padding: '0.85rem 1.4rem', fontSize: '0.95rem', background: 'transparent' }}
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  <span>Subscribe</span>
                  <FaPaperPlane style={{ fontSize: '0.85rem' }} />
                </button>
              </div>
              {error && <p className="form-error" style={{ marginTop: '0.65rem' }}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;