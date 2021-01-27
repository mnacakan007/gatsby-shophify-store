import React, { Fragment } from "react";
import { ProductListings } from "../components/product-listings";
import styles from "../styles/collection-listings.module.css";
import { Link } from 'gatsby';

export function CollectionListings({ collection, collectionTitle }) {
  /*
    Group items by productType in DESC order
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  */

  const products = collection.products || collection;
  const title = collectionTitle || collection.title;

  products.sort(function (a, b) {
    var productTypeA = a.productType.toUpperCase();
    var productTypeB = b.productType.toUpperCase();

    /* Make sure New products are at the top of the list */
    if (a.tags?.includes("new") || b.tags?.includes("new")) {
      return -2;
    }
    if (productTypeA > productTypeB) {
      return -1;
    }
    if (productTypeA < productTypeB) {
      return 1;
    }

    return 0;
  });

  return (
    <Fragment>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.filters}>
        <li>
          <Link to="/" activeClassName={styles.active}>All</Link>
        </li>
        <li>
          <Link to="/products/shirt" activeClassName={styles.active}>Shirt</Link>
        </li>
        <li>
          <Link to="/products/stickers" activeClassName={styles.active}>Stickers</Link>
        </li>
      </ul>
      <ProductListings products={products} />
    </Fragment>
  );
}
