import React, { Fragment } from "react";
import { ProductListings } from "../components/product-listings";
import styles from "../styles/collection-listings.module.css";

export function CollectionListings({ collection }) {
  /*
    Group items by productType in DESC order
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  */

  const newProducts = collection.products.filter(product => product.tags.length >= 1);

  collection.products.sort(function (a, b) {
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
      <h2 className={styles.heading}>{collection.title}</h2>
      <ProductListings products={collection.products} />
    </Fragment>
  );
}
