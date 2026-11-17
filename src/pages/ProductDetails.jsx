import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaMinus,
  FaPlus,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaArrowLeft,
  FaInfoCircle
} from 'react-icons/fa';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatCurrency';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === parseInt(id, 10) || p.id === id);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setActiveTab('description');
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--dark-text)' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--secondary-text)', marginBottom: '2rem' }}>
          Sorry, the medicine or product you are looking for is not currently available in our pharmacy database.
        </p>
        <Link to="/products" className="btn btn-primary">
          <FaArrowLeft /> Return to Pharmacy Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // Related products from same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-details-page" style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'All Products & Medicines', link: '/products' },
          { label: product.category, link: `/products?category=${encodeURIComponent(product.category)}` },
          { label: product.name }
        ]}
      />

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Main Product Section */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-gray)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left: Product Image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                backgroundColor: '#F8F9FA',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                border: '1px solid var(--border-light)',
                position: 'relative'
              }}
            >
              {product.discount && (
                <span
                  className="badge badge-sale"
                  style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                >
                  {product.discount}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxHeight: '380px',
                  width: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            {/* Quality Badges Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginTop: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem', background: 'var(--light-bg)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
                <FaShieldAlt style={{ color: 'var(--primary-green)', fontSize: '1.2rem', flexShrink: 0 }} />
                <span>100% Genuine — Egyptian Drug Authority Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem', background: 'var(--light-bg)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
                <FaTruck style={{ color: 'var(--primary-green)', fontSize: '1.2rem', flexShrink: 0 }} />
                <span>Temperature-Controlled &amp; Certified Cold-Chain Storage</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details Info */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Category & Status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span
                style={{
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  color: 'var(--primary-green)'
                }}
              >
                {product.category}
              </span>
              <span className={`badge ${product.inStock ? 'badge-success' : 'badge-warning'}`}>
                <FaCheckCircle style={{ marginRight: 4 }} />
                {product.inStock ? 'In Stock at Salama Pharmacy' : 'Temporarily Out of Stock'}
              </span>
            </div>

            <h1
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                color: 'var(--dark-text)',
                lineHeight: 1.25,
                marginBottom: '1rem'
              }}
            >
              {product.name}
            </h1>

            {/* Rating & Review Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', color: '#FF8A00' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    style={{
                      opacity: i < Math.floor(product.rating) ? 1 : 0.3,
                      fontSize: '1rem'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.rating}</span>
              <span style={{ color: 'var(--secondary-text)', fontSize: '0.9rem' }}>
                ({product.reviewsCount} verified patient &amp; customer reviews)
              </span>
            </div>

            {/* Price block (Egyptian Pounds) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.5rem'
              }}
            >
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--muted-text)',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="badge badge-sale" style={{ fontSize: '0.85rem' }}>
                  Save {formatPrice(product.originalPrice - product.price)} ({product.discount})
                </span>
              )}
            </div>

            {/* Short Description */}
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--secondary-text)',
                lineHeight: 1.7,
                marginBottom: '1.75rem'
              }}
            >
              {product.shortDescription}
            </p>

            {/* Specifications meta table */}
            <div
              style={{
                backgroundColor: 'var(--light-bg)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--secondary-text)' }}>Manufacturer: </span>
                <strong>{product.brand}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--secondary-text)' }}>SKU: </span>
                <strong>{product.sku}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--secondary-text)' }}>Dosage Form &amp; Pack: </span>
                <strong>{product.dosageForm}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--secondary-text)' }}>Delivery Speed: </span>
                <strong style={{ color: 'var(--dark-green)' }}>2-Hour Express in Cairo &amp; Giza</strong>
              </div>
            </div>

            {/* Quantity Selector + Add to Cart + Wishlist */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {/* Quantity Counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid var(--border-gray)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: 'var(--white)'
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--dark-text)'
                  }}
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span style={{ minWidth: 42, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--dark-text)'
                  }}
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '220px' }}
              >
                <FaShoppingBag />
                <span>Add to Cart &mdash; {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                className={`card-icon-btn ${isWishlisted ? 'wishlist-active' : ''}`}
                onClick={() => toggleWishlist(product)}
                style={{ width: 50, height: 50, fontSize: '1.2rem' }}
                title="Add to Wishlist"
                aria-label="Toggle wishlist"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Product Information Section */}
        <div
          style={{
            marginTop: '3.5rem',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-gray)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Tab Headers */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-gray)',
              backgroundColor: '#FAFBFB',
              overflowX: 'auto'
            }}
          >
            {[
              { id: 'description', label: 'Full Description' },
              { id: 'benefits', label: 'Key Health Benefits' },
              { id: 'usage', label: 'Dosage & Usage' },
              { id: 'ingredients', label: 'Composition & Ingredients' },
              { id: 'warnings', label: 'Safety & Warnings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1.25rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: activeTab === tab.id ? 'var(--primary-green)' : 'var(--secondary-text)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--primary-green)' : '3px solid transparent',
                  backgroundColor: activeTab === tab.id ? 'var(--white)' : 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-fast)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div style={{ padding: '2.5rem' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--dark-text)' }}>
                  About This Medicine / Product
                </h3>
                <p style={{ color: 'var(--secondary-text)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>
                  {product.description}
                </p>
                <p style={{ color: 'var(--secondary-text)', lineHeight: 1.8, fontSize: '1rem' }}>
                  Salama Pharmacy guarantees this product is stored in dedicated temperature-controlled rooms under the latest pharmaceutical standards, ensuring full efficacy through the printed expiry date on the packaging.
                </p>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--dark-text)' }}>
                  Clinically Proven Benefits &amp; Indications
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {product.benefits?.map((benefit, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: 'var(--dark-text)' }}>
                      <FaCheckCircle style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--dark-text)' }}>
                  Dosage Instructions &amp; Usage Guide
                </h3>
                <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-green)' }}>
                  <p style={{ color: 'var(--dark-text)', fontSize: '1rem', lineHeight: 1.7 }}>
                    {product.usage}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--dark-text)' }}>
                  Active Ingredients &amp; Chemical Composition
                </h3>
                <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', lineHeight: 1.8 }}>
                  {product.ingredients}
                </p>
              </div>
            )}

            {activeTab === 'warnings' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--danger-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaInfoCircle /> Important Safety Warnings &amp; Contraindications
                </h3>
                <div style={{ background: '#FFF3F3', border: '1px solid #FFD6D6', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: '#B3261E', fontSize: '0.98rem', lineHeight: 1.7 }}>
                    {product.warnings}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '4.5rem' }}>
            <div className="section-header">
              <div>
                <h2 className="section-title">Related Products from the Same Category</h2>
                <p className="section-subtitle">
                  Other medicines and products from the {product.category} category.
                </p>
              </div>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="section-view-all">
                <span>View More in {product.category}</span>
              </Link>
            </div>

            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
