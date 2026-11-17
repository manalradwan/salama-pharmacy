import React, { useState } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaChevronDown
} from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumb';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Egyptian mobile number is required.';
    } else if (!/^01[0125][0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid 11-digit Egyptian phone number (010, 011, 012, 015).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Request subject is required.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or medicine names needed.';
    } else if (formData.message.trim().length < 8) {
      errs.message = 'Message must be at least 8 characters.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitted(true);
    addToast('Your inquiry was sent successfully to Salama Pharmacy pharmacists. We will contact you via phone or WhatsApp shortly.', 'success');
    setFormData({ fullName: '', phone: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'How can I send a medical prescription to have medicines dispensed?',
      a: 'You can send a photo of your prescription directly via our dedicated WhatsApp number +20 100 555 1988 or call our hotline 19888. Our pharmacist will review dosages, suggest available alternatives, and confirm your delivery immediately.'
    },
    {
      q: 'How long does medicine delivery take within Cairo and Giza?',
      a: 'We offer express delivery within 2 hours of order confirmation across all Cairo and Giza neighbourhoods. For other governorates, delivery takes 24 to 48 hours via fully equipped refrigerated transport vehicles.'
    },
    {
      q: 'What payment methods does Salama Pharmacy accept?',
      a: 'You can pay cash on delivery (COD), via InstaPay (instant transfer), Vodafone Cash, Orange / Etisalat mobile wallets, or by Meeza, Visa, or Mastercard cards with the delivery agent.'
    },
    {
      q: 'Are all medicines listed registered with the Ministry of Health?',
      a: 'Yes — all medicines, nutritional supplements, and cosmetic products sold at Salama Pharmacy are 100% licensed and certified by the Egyptian Drug Authority (EDA) and registered with the Ministry of Health and Population.'
    }
  ];

  return (
    <div className="contact-page" style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Contact Us & Branches' }]} />

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Page Heading */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            Salama Pharmacy Team at Your Service
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--dark-text)', margin: '0.5rem 0 1rem' }}>
            Get in Touch with Salama Pharmacy
          </h1>
          <p style={{ color: 'var(--secondary-text)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Have a question about a medicine or a prescription? Our pharmacist team is available 24/7 by phone, WhatsApp, and at our branches.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Card 1: Hotline */}
          <div style={{ background: 'var(--white)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1.25rem' }}>
              <FaPhoneAlt />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Unified Hotline
            </h3>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Fast service across all governorates
            </p>
            <div style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '1.4rem' }}>
              19888
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div style={{ background: 'var(--white)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E6F9EC', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 1.25rem' }}>
              <FaWhatsapp />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Salama WhatsApp
            </h3>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Send prescriptions &amp; instant enquiries
            </p>
            <div style={{ fontWeight: 700, color: 'var(--dark-text)', fontSize: '1rem' }}>
              +20 100 555 1988
            </div>
          </div>

          {/* Card 3: Address */}
          <div style={{ background: 'var(--white)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#FFF4E5', color: '#FF8A00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1.25rem' }}>
              <FaMapMarkerAlt />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Our Main Branches
            </h3>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Dokki · Nasr City · New Cairo · Maadi
            </p>
            <div style={{ fontWeight: 600, color: 'var(--dark-text)', fontSize: '0.88rem' }}>
              45 Mossadak St, Dokki, Giza, Egypt
            </div>
          </div>

          {/* Card 4: Hours */}
          <div style={{ background: 'var(--white)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F0E8FF', color: '#722ED1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1.25rem' }}>
              <FaClock />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Working Hours
            </h3>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Dispensing &amp; home delivery
            </p>
            <div style={{ fontWeight: 800, color: 'var(--dark-green)', fontSize: '1rem' }}>
              24/7 — Every Day of the Year
            </div>
          </div>
        </div>

        {/* Contact Form & Info Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-gray)',
            padding: '3rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Form */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Send Your Enquiry or Order
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Fill in the details below and one of our Salama Pharmacy pharmacists will review it and contact you by phone or WhatsApp.
            </p>

            {isSubmitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--light-green)', border: '1px solid var(--primary-green)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', color: 'var(--dark-green)', fontWeight: 600, marginBottom: '1.5rem' }}>
                <FaCheckCircle style={{ fontSize: '1.3rem' }} />
                <span>Your message was sent successfully! We will contact you within minutes.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
              </div>

              <div className="form-group">
                <label className="form-label">Request Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="e.g. Medicine availability enquiry or dosage question"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && <div className="form-error">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Message Details or Medicines Required *</label>
                <textarea
                  name="message"
                  rows="4"
                  className="form-control"
                  placeholder="Enter medicine names needed or details of your medical enquiry..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                <FaPaperPlane />
                <span>Send to Pharmacist</span>
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '1rem' }}>
                Medical Emergency Notice
              </h3>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                In cases of critical medical emergencies, cardiac events, or sudden accidents, please go immediately to the nearest emergency department at a government or private hospital, or call the Egyptian Ambulance Service at <strong>123</strong>.
              </p>

              <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--dark-text)' }}>
                  Monthly Prescription Dispensing Service
                </h4>
                <p style={{ color: 'var(--secondary-text)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Salama Pharmacy offers a recurring dispensing service for chronic condition prescriptions (blood pressure, diabetes, and cardiac medications) with special discounts and automatic monthly doorstep delivery.
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.85rem' }}>
                Follow Salama Pharmacy on Social Media
              </h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: <FaFacebookF />, label: 'Facebook' },
                  { icon: <FaInstagram />, label: 'Instagram' },
                  { icon: <FaWhatsapp />, label: 'WhatsApp' }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'var(--light-bg)',
                      color: 'var(--dark-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-green)';
                      e.currentTarget.style.color = 'var(--white)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--light-bg)';
                      e.currentTarget.style.color = 'var(--dark-text)';
                    }}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div style={{ marginTop: '4.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.95rem' }}>
              Quick answers to the most common questions about delivery, payment, and medicine dispensing.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-gray)',
                    overflow: 'hidden',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--dark-text)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        color: 'var(--primary-green)',
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--secondary-text)', fontSize: '0.95rem', lineHeight: 1.7, borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
