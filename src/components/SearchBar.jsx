import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { categories } from '../data/categories';

const SearchBar = ({ onSearchComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    navigate(`/products?${params.toString()}`);
    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <select
          className="search-category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search medicine, vitamins, skincare, baby..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button type="submit" className="search-button" aria-label="Search">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
