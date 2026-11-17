import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes, FaSearch, FaRedo, FaStar } from 'react-icons/fa';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { formatPrice } from '../utils/formatCurrency';
import '../styles/products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL or defaults
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';
  const querySort = searchParams.get('sort') || 'default';

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [sortBy, setSortBy] = useState(querySort);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state when URL params change (e.g. clicking top navbar category links)
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSortBy(searchParams.get('sort') || 'default');
    setVisibleCount(12);
  }, [searchParams]);

  // Sync state back to URL
  const updateURL = (newCat, newSearch, newSort) => {
    const params = new URLSearchParams();
    if (newCat) params.set('category', newCat);
    if (newSearch) params.set('search', newSearch);
    if (newSort && newSort !== 'default') params.set('sort', newSort);
    setSearchParams(params);
  };

  const handleCategorySelect = (catName) => {
    const nextCat = selectedCategory === catName ? '' : catName;
    setSelectedCategory(nextCat);
    updateURL(nextCat, searchTerm, sortBy);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateURL(selectedCategory, searchTerm, sortBy);
  };

  const handleSortChange = (e) => {
    const nextSort = e.target.value;
    setSortBy(nextSort);
    updateURL(selectedCategory, searchTerm, nextSort);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('default');
    setMaxPrice(1500);
    setOnlyInStock(false);
    setMinRating(0);
    setSearchParams({});
  };

  // Robust Category & Search Matching Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Dynamic Category Filter
      if (selectedCategory) {
        const catTarget = selectedCategory.trim().toLowerCase();
        const pCat = product.category.toLowerCase();

        const isMatch =
          pCat === catTarget ||
          pCat.includes(catTarget) ||
          catTarget.includes(pCat);

        if (!isMatch) return false;
      }

      // 2. Keyword Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = (product.shortDescription || '').toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      // 3. Price Filter (Egyptian Pounds)
      if (product.price > maxPrice) {
        return false;
      }

      // 4. In Stock Filter
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // 5. Rating Filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [selectedCategory, searchTerm, maxPrice, onlyInStock, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const activeCategoryObj = categories.find((c) => c.name.toLowerCase() === selectedCategory.toLowerCase());

  const hasActiveFilters = selectedCategory || searchTerm || maxPrice < 1500 || onlyInStock || minRating > 0 || sortBy !== 'default';

  return (
    <div className="products-page">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'All Products & Medicines', link: '/products' },
          ...(selectedCategory ? [{ label: activeCategoryObj?.name || selectedCategory }] : [])
        ]}
      />

      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="products-layout">
          {/* ================= Sidebar Filters ================= */}
          <aside className="products-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.15rem' }}>
                <FaFilter style={{ color: 'var(--primary-green)' }} />
                <span>Filter Products</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.82rem', color: 'var(--danger-red)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                >
                  <FaRedo size={10} /> Reset Filters
                </button>
              )}
            </div>

            {/* Category Filter List */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Product Categories</h3>
              <div className="filter-category-list">
                <button
                  className={`filter-category-btn ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => handleCategorySelect('')}
                >
                  <span>All Categories</span>
                  <span className="filter-count">{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const countInCat = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                  const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      className={`filter-category-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.name)}
                    >
                      <span>{cat.name}</span>
                      <span className="filter-count">{countInCat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider (Egyptian Pounds) */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Price Range (EGP)</h3>
              <div className="price-slider-wrap">
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--secondary-text)' }}>From 20 EGP</span>
                  <span style={{ color: 'var(--primary-green)' }}>Up to {formatPrice(maxPrice)}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Customer Rating</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {[4.8, 4.7, 4.5].map((rating) => (
                  <label
                    key={rating}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      padding: '0.35rem 0'
                    }}
                  >
                    <input
                      type="radio"
                      name="minRating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                      style={{ accentColor: 'var(--primary-green)' }}
                    />
                    <div style={{ display: 'flex', color: '#FF8A00' }}>
                      <FaStar />
                    </div>
                    <span>{rating} Stars &amp; Above</span>
                  </label>
                ))}
                {minRating > 0 && (
                  <button
                    onClick={() => setMinRating(0)}
                    style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', textAlign: 'left', marginTop: '0.25rem' }}
                  >
                    Clear rating filter
                  </button>
                )}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Availability</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  style={{ accentColor: 'var(--primary-green)', width: 16, height: 16 }}
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* ================= Products Content ================= */}
          <main className="products-content">
            {/* Top Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-info">
                Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
                {selectedCategory && (
                  <span style={{ marginLeft: '0.5rem', color: 'var(--primary-green)', fontWeight: 700 }}>
                    in {activeCategoryObj?.name || selectedCategory}
                  </span>
                )}
              </div>

              <div className="toolbar-controls">
                {/* Search in list */}
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-gray)', borderRadius: 'var(--radius-full)', padding: '0.3rem 0.75rem', background: 'var(--white)' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    style={{ border: 'none', fontSize: '0.88rem', outline: 'none', width: '160px' }}
                  />
                  <button type="submit" style={{ color: 'var(--primary-green)', display: 'flex', alignItems: 'center' }}>
                    <FaSearch size={13} />
                  </button>
                </form>

                {/* Sort dropdown */}
                <div className="sort-select-wrapper">
                  <span>Sort by:</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">Featured / Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Best Sellers</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="active-filters-bar">
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Active Filters:</span>
                {selectedCategory && (
                  <span className="active-filter-pill">
                    Category: {activeCategoryObj?.name || selectedCategory}
                    <FaTimes style={{ cursor: 'pointer' }} onClick={() => handleCategorySelect(selectedCategory)} />
                  </span>
                )}
                {searchTerm && (
                  <span className="active-filter-pill">
                    &quot;{searchTerm}&quot;
                    <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setSearchTerm(''); updateURL(selectedCategory, '', sortBy); }} />
                  </span>
                )}
                {maxPrice < 1500 && (
                  <span className="active-filter-pill">
                    Under {formatPrice(maxPrice)}
                    <FaTimes style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(1500)} />
                  </span>
                )}
                {onlyInStock && (
                  <span className="active-filter-pill">
                    In Stock Only
                    <FaTimes style={{ cursor: 'pointer' }} onClick={() => setOnlyInStock(false)} />
                  </span>
                )}
                {minRating > 0 && (
                  <span className="active-filter-pill">
                    {minRating}+ Stars
                    <FaTimes style={{ cursor: 'pointer' }} onClick={() => setMinRating(0)} />
                  </span>
                )}
                <button className="clear-filters-btn" onClick={handleResetFilters}>
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {displayedProducts.length > 0 ? (
              <>
                <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="pagination-wrap">
                    <button
                      className="btn btn-outline btn-lg"
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                    >
                      Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="products-empty-state">
                <div className="empty-state-icon">
                  <FaSearch />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  No Matching Products Found
                </h3>
                <p style={{ color: 'var(--secondary-text)', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                  We couldn't find products matching your selected category or search term. Try another category or clear the filters.
                </p>
                <button className="btn btn-primary" onClick={handleResetFilters}>
                  View All Pharmacy Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
