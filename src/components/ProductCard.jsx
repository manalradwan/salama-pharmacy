import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaShoppingBag, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useQuickView } from '../context/QuickViewContext';
import { formatPrice } from '../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-card">
      {/* Top Bar with Discount & Quick Action Buttons */}
      <div className="card-top-bar">
        {product.discount ? (
          <span className="card-discount-badge">{product.discount}</span>
        ) : (
          <span></span>
        )}

        <div className="card-action-btns">
          <button
            className={`card-icon-btn ${isWishlisted ? 'wishlist-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist toggle"
          >
            <FaHeart />
          </button>

          <button
            className="card-icon-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            title="Quick View"
            aria-label="Quick View"
          >
            <FaEye />
          </button>
        </div>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      {/* Product Details */}
      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="product-title" title={product.name}>
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <div style={{ display: 'flex', color: '#FF8A00' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className="rating-star-icon"
                style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.3 }}
              />
            ))}
          </div>
          <span className="rating-text">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount} reviews)</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="card-bottom-bar">
          <div className="product-prices">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product, 1)}
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <FaShoppingBag />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
