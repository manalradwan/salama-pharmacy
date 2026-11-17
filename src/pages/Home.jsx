import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FaArrowRight,
  FaShieldAlt,
  FaShippingFast,
  FaUserMd,
  FaHeadset,
  FaCheckCircle,
  FaHeartbeat,
  FaAward
} from 'react-icons/fa';
import { categories } from '../data/categories';
import { products } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import '../styles/home.css';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || '';
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(urlCategory || 'All');

  // Filter products dynamically based on selected tab
  const displayedCategoryProducts = products.filter((p) => {
    if (selectedCategoryTab === 'All') return true;
    return p.category.toLowerCase() === selectedCategoryTab.toLowerCase();
  });

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 8);

  const handleTabChange = (categoryName) => {
    setSelectedCategoryTab(categoryName);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <FaHeartbeat />
                <span>Egypt's Trusted Digital Pharmacy</span>
              </div>

              <h1 className="hero-title">
                Salama Pharmacy <span>Your Health, Our Priority</span>
              </h1>

              <p className="hero-description">
                Order your monthly prescriptions, vitamins, skin care essentials, and medical supplies online. Fast delivery to Cairo, Giza, and all Egyptian governorates with certified pharmaceutical cold-chain storage.
              </p>

              <div className="hero-cta-group">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <span>Shop All Products</span>
                  <FaArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  Upload Prescription
                </Link>
              </div>

              {/* Statistics */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50,000+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Genuine Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.8%</span>
                  <span className="stat-label">Delivery Accuracy</span>
                </div>
              </div>
            </div>

            {/* Hero Banner Image */}
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&auto=format&fit=crop&q=80"
                alt="Salama Pharmacy"
                className="hero-main-img"
              />

              {/* Floating Badge 1 */}
              <div className="hero-floating-card card-1">
                <div className="floating-icon">
                  <FaShieldAlt />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark-text)' }}>
                    100% Genuine Medicines
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>
                    Licensed by Egyptian Drug Authority (EDA)
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="hero-floating-card card-2">
                <div className="floating-icon">
                  <FaShippingFast />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark-text)' }}>
                    Express 2-Hour Delivery
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>
                    Cairo &amp; Giza
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Browse Salama Pharmacy's full range of treatment medicines, skin care, vitamins, and baby products.
              </p>
            </div>
            <Link to="/products" className="section-view-all">
              <span>View All Categories</span>
              <FaArrowRight />
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Category Filtering Products Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategoryTab === 'All'
                  ? 'Featured Products & Medicines'
                  : `${selectedCategoryTab} Products`}
              </h2>
              <p className="section-subtitle">
                Select a category below to dynamically filter products.
              </p>
            </div>
            <Link to={`/products${selectedCategoryTab !== 'All' ? `?category=${encodeURIComponent(selectedCategoryTab)}` : ''}`} className="section-view-all">
              <span>Open in Products Page ({displayedCategoryProducts.length})</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* Interactive Dynamic Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              overflowX: 'auto',
              paddingBottom: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            <button
              onClick={() => handleTabChange('All')}
              className={`btn btn-sm ${selectedCategoryTab === 'All' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.name)}
                className={`btn btn-sm ${selectedCategoryTab === cat.name ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Products Grid - Dynamically updates to show ONLY selected category */}
          <div className="product-grid">
            {displayedCategoryProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banners */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="promo-banners-grid">
            {/* Banner 1 */}
            <div className="promo-banner banner-green">
              <span className="promo-tag">Weekly Salama Pharmacy Offers</span>
              <h3 className="promo-title">Up to 20% Off Vitamins &amp; Immunity Supplements</h3>
              <p className="promo-desc">
                Boost your family's health with certified top-tier vitamins. Use code <strong>SALAMA20</strong>.
              </p>
              <div>
                <Link to="/products?category=Vitamins%20%26%20Supplements" className="btn btn-white">
                  <span>Shop Vitamins</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="promo-banner banner-dark">
              <span className="promo-tag" style={{ color: '#00B207' }}>Free Instant Delivery</span>
              <h3 className="promo-title">Free Shipping on All Orders Over 350 EGP</h3>
              <p className="promo-desc">
                Order monthly medicines and household medical supplies delivered instantly to your doorstep at no extra charge.
              </p>
              <div>
                <Link to="/products" className="btn btn-primary">
                  <span>Shop Now</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Selling Products Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Best Sellers in Egypt</h2>
              <p className="section-subtitle">
                Essential medicines and healthcare products ordered daily by thousands of Salama Pharmacy customers.
              </p>
            </div>
            <Link to="/products?sort=popular" className="section-view-all">
              <span>View All Best Sellers</span>
              <FaArrowRight />
            </Link>
          </div>

          <div className="product-grid">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Salama Pharmacy */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <h2 className="section-title">Why Choose Salama Pharmacy?</h2>
              <p className="section-subtitle">
                Your health and safety are in trusted hands with a professional pharmacist team and extensive pharmaceutical care experience across Egypt.
              </p>
            </div>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-box">
              <div className="feature-icon-circle">
                <FaAward />
              </div>
              <h3 className="feature-title">100% Authentic Medicines</h3>
              <p className="feature-desc">
                All medicines and medical supplies are licensed and sourced directly from Egypt Drug Authority-certified major pharmaceutical manufacturers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-box">
              <div className="feature-icon-circle">
                <FaShippingFast />
              </div>
              <h3 className="feature-title">Fast Temperature-Controlled Delivery</h3>
              <p className="feature-desc">
                Our fleet covers Cairo and Giza within 2 hours, with refrigerated boxes for insulin and heat-sensitive medications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-box">
              <div className="feature-icon-circle">
                <FaShieldAlt />
              </div>
              <h3 className="feature-title">Flexible &amp; Secure Payments</h3>
              <p className="feature-desc">
                Pay cash on delivery, Meeza card, InstaPay, or Vodafone Cash and mobile wallets with ease and security.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-box">
              <div className="feature-icon-circle">
                <FaHeadset />
              </div>
              <h3 className="feature-title">24/7 Pharmacist Support</h3>
              <p className="feature-desc">
                Licensed pharmacists available around the clock via our hotline 19888 to answer your medication questions and review dosages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
