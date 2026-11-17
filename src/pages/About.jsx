import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeartbeat,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaHospital,
  FaCapsules,
  FaAward
} from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumb';

const About = () => {
  return (
    <div className="about-page" style={{ backgroundColor: 'var(--white)', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'About Salama Pharmacy' }]} />

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #F0FAF1 0%, #E2F6E5 100%)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="hero-badge" style={{ margin: '0 auto 1.25rem' }}>
              <FaHeartbeat />
              <span>Trusted Pharmaceutical Care in Egypt Since 2010</span>
            </div>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--dark-text)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Salama Pharmacy — Caring for Your Health &amp; Your Family's
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--secondary-text)', lineHeight: 1.7, marginBottom: '2rem' }}>
              At Salama Pharmacy, we believe that access to genuine medicines and honest medical consultations is a fundamental right for every Egyptian family. We deliver our services to the highest pharmaceutical standards, certified by the Egyptian Drug Authority, with unmatched delivery speed.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Browse Medicines &amp; Medical Supplies</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Story & Intro Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Our Story &amp; Identity
              </span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--dark-text)', lineHeight: 1.25, margin: '0.75rem 0 1.5rem' }}>
                Pioneering Certified Pharmaceutical Services in Egypt
              </h2>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.75, fontSize: '1rem', marginBottom: '1.25rem' }}>
                Salama Pharmacy was established to be the primary reference for Egyptian patients seeking genuine medicines and trusted medical supplies. Our branches in Dokki, Nasr City, New Cairo, and Maadi cover patient needs around the clock, 24 hours a day.
              </p>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.75, fontSize: '1rem', marginBottom: '2rem' }}>
                Today, our digital platform offers a fully integrated online shopping experience — allowing you to order medicines, dispense prescriptions, and purchase healthcare products with a single tap, with instant refrigerated delivery.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCheckCircle style={{ color: 'var(--primary-green)', fontSize: '1.25rem', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Genuine Medicines</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCheckCircle style={{ color: 'var(--primary-green)', fontSize: '1.25rem', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Licensed Practicing Pharmacists</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCheckCircle style={{ color: 'var(--primary-green)', fontSize: '1.25rem', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Safe Medical Cold-Chain Storage</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaCheckCircle style={{ color: 'var(--primary-green)', fontSize: '1.25rem', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>2-Hour Express Home Delivery</span>
                </div>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
                alt="Salama Pharmacy Team"
                style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section style={{ backgroundColor: 'var(--light-bg)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Mission */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '16px', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                <FaCapsules />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.85rem' }}>
                Our Mission
              </h3>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                To provide genuine medicines and fast pharmaceutical care to every Egyptian patient, delivering trusted digital solutions that ensure treatment reaches the right person at the right time, with the highest safety standards.
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '16px', background: '#E6F4FF', color: '#1890FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                <FaHospital />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.85rem' }}>
                Our Vision
              </h3>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                To be the leading digital pharmaceutical ecosystem in Egypt — a benchmark for professional integrity and patient safety, setting the standard for online pharmacy care across the Arab world.
              </p>
            </div>

            {/* Values */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-gray)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '16px', background: '#FFF4E5', color: '#FF8A00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                <FaAward />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.85rem' }}>
                Our Core Values
              </h3>
              <p style={{ color: 'var(--secondary-text)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                Patient health first, full integrity and transparency, respect for medical data privacy, and continuous innovation in the latest medicine dispensing and delivery technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Pharmacists Team */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Our Expert Team
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--dark-text)', margin: '0.5rem 0 1rem' }}>
              Egypt's Elite Pharmacist Leadership Team
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', lineHeight: 1.6 }}>
              Salama Pharmacy's team includes top certified clinical pharmacists to ensure full drug interaction reviews and ongoing patient health monitoring.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              {
                name: 'Dr. Ahmed Salama',
                role: 'Founder & CEO, Salama Pharmacy Group',
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80',
                exp: 'Over 20 years of clinical pharmacy experience in Egypt'
              },
              {
                name: 'Dr. Marwa El-Shennawy',
                role: 'Director of Drug Quality Control & Dispensing',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80',
                exp: 'Former member of the Egyptian Drug Authority (EDA)'
              },
              {
                name: 'Dr. Hany Abdel-Rahman',
                role: 'Clinical Nutrition & Supplements Consultant',
                image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80',
                exp: 'Specialist in vitamins and sports medicine supplementation'
              },
              {
                name: 'Dr. Yasmine El-Khouly',
                role: 'Head of Skin Care, Mother & Child Division',
                image: 'https://images.unsplash.com/photo-1594824813633-89824382349a?w=500&auto=format&fit=crop&q=80',
                exp: 'Specialist in medical dermatological formulations and neonatal care'
              }
            ].map((member, i) => (
              <div key={i} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border-gray)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textAlign: 'center', transition: 'var(--transition-normal)' }}>
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.25rem' }}>
                    {member.name}
                  </h4>
                  <div style={{ color: 'var(--primary-green)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    {member.role}
                  </div>
                  <div style={{ color: 'var(--secondary-text)', fontSize: '0.8rem' }}>
                    {member.exp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
