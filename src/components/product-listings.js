import React from 'react';
import ProductCard from '../components/product-card';
import styles from '../styles/product-listings.module.css';

export function ProductListings({ products }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>This Is Our Swag</h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
