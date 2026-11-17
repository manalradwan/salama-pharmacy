import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ items = [] }) => {
  return (
    <div style={{ backgroundColor: 'var(--light-bg)', padding: '1rem 0', borderBottom: '1px solid var(--border-gray)' }}>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--secondary-text)', flexWrap: 'wrap' }}>
            <li>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--secondary-text)' }}>
                <FaHome style={{ color: 'var(--primary-green)' }} />
                <span>Home</span>
              </Link>
            </li>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <React.Fragment key={index}>
                  <li style={{ color: 'var(--muted-text)', fontSize: '0.7rem' }}>
                    <FaChevronRight />
                  </li>
                  <li>
                    {isLast || !item.link ? (
                      <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>
                        {item.label}
                      </span>
                    ) : (
                      <Link to={item.link} style={{ color: 'var(--secondary-text)' }}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
