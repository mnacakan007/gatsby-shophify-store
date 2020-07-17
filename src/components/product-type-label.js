import React from 'react';
import styles from '../styles/product-type-label.module.css';

const ProductTypeLabel = ({ type, className, ...rest }) => {
  return (
    <p className={`${styles.label} ${className}`} {...rest} data-type={type}>
      {type}
    </p>
  );
};

export default ProductTypeLabel;
