import React, { Fragment } from 'react';
import { ProductListings } from '../components/product-listings';
import styles from '../styles/collection-listings.module.css';

export function CollectionListings({ collection }) {
  
  return (
    <Fragment>
      <h2 className={styles.heading}>{collection.title}</h2>
      <ProductListings products={collection.products} />
    </Fragment>
  );
}
