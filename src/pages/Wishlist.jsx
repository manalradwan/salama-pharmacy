import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import { formatPrice } from '../utils/formatCurrency';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      addToCart(product, 1);
    });
    clearWishlist();
  };

  return (
    <div className="wishlist-page" style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      <Breadcrumb items={[{ label: 'Wishlist' }]} />

      <div className="container" style={{ marginTop: '2rem' }}>
        {wishlistItems.length === 0 ? (
          <div className="cart-empty-wrapper">
            <div className="empty-cart-icon" style={{ backgroundColor: '#FFF0F0', color: 'var(--danger-red)' }}>
              <FaHeart />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.75rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              You haven't saved any medicines or healthcare products to your wishlist yet. Browse the pharmacy and tap the heart icon to save your favourites.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Browse Pharmacy Products</span>
              <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--dark-text)' }}>
                  Saved Products ({wishlistItems.length})
                </h1>
                <p style={{ color: 'var(--secondary-text)', fontSize: '0.92rem' }}>
                  Save your favourite medicines and products to easily add them to your cart later.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="btn btn-primary" onClick={handleAddAllToCart}>
                  <FaShoppingBag />
                  <span>Move All to Cart</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={clearWishlist}
                  style={{ color: 'var(--danger-red)' }}
                >
                  <FaTrash />
                  <span>Clear Wishlist</span>
                </button>
              </div>
            </div>

            {/* Wishlist Table */}
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product / Medicine</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th>Add to Cart</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((product) => (
                    <tr key={product.id}>
                      {/* Product cell */}
                      <td>
                        <div className="cart-product-cell">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="cart-product-img"
                          />
                          <div>
                            <Link to={`/product/${product.id}`} className="cart-product-title">
                              {product.name}
                            </Link>
                            <div className="cart-product-cat">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price in EGP */}
                      <td style={{ fontWeight: 800, color: 'var(--dark-text)', fontSize: '1rem' }}>
                        {formatPrice(product.price)}
                      </td>

                      {/* Stock Status */}
                      <td>
                        <span className={`badge ${product.inStock ? 'badge-success' : 'badge-warning'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>

                      {/* Add to Cart */}
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleMoveToCart(product)}
                        >
                          <FaShoppingBag /> Move to Cart
                        </button>
                      </td>

                      {/* Remove */}
                      <td>
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromWishlist(product.id)}
                          title="Remove from Wishlist"
                          aria-label="Remove from wishlist"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-table-footer">
                <Link to="/products" className="btn btn-outline btn-sm">
                  <FaArrowRight />
                  <span>Back to All Products</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
