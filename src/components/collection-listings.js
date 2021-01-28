import React, { Fragment } from "react";
import { ProductListings } from "../components/product-listings";
import styles from "../styles/collection-listings.module.css";
import { Link } from 'gatsby';

export function CollectionListings({ collection, collectionTitle, filters }) {
  /*
    Group items by productType in DESC order
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  */

  const products = collection.products || collection;
  const title = collectionTitle || collection.title;

  products.sort(function (a, b) {

    var productTypeA = a.productType.toUpperCase();
    var productTypeB = b.productType.toUpperCase();

    if(a.tags?.includes("new") > b.tags?.includes("new")) return -1;
    if(a.tags?.includes("new") < b.tags?.includes("new")) return 1;

    if(productTypeA > productTypeB) return 1;
    if(productTypeA < productTypeB) return -1;

    return 0;
  });

  const productFilters = [...new Set(filters)];

  productFilters.sort();

  return (
    <Fragment>
      <h2 className={styles.heading}>{title}</h2>
      {productFilters.length > 1 && (
        <ul className={styles.filters}>
          <li>
            <Link to="/" activeClassName={styles.active}>All</Link>
          </li>
          {productFilters.map(filter => (
            <li key={filter}>
              <Link to={"/products/" + filter.toLowerCase()} activeClassName={styles.active}>{filter}</Link>
            </li>
          ))}
        </ul>
      )}
      <ProductListings products={products} />
    </Fragment>
  );
}
