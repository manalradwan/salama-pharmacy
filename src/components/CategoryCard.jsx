import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="category-icon-circle">
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>
      <h3 className="category-name">{category.name}</h3>
      <span className="category-count">{category.count} Products</span>
    </Link>
  );
};

export default CategoryCard;
