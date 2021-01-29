import React, { Fragment } from "react";
import { ProductListings } from "../components/product-listings";
import styles from "../styles/collection-listings.module.css";
import { Link } from 'gatsby';

export function CollectionListings({ collection, collectionTitle, filters }) {
  const products = collection.products || collection;
  const title = collectionTitle || collection.title;

  products.sort(function (a, b) {
    /*
      Push `new` products at the top of the list
    */
    if(a.tags?.includes("new") > b.tags?.includes("new")) return -1;
    if(a.tags?.includes("new") < b.tags?.includes("new")) return 1;

    return 0;
  });

  /*
    We need to do this magically beautiful process
    because we want "Apparel" to appear first and then sort ASC
  */
  let productFilters = [...new Set(filters)];
  productFilters = productFilters.filter(filter => filter !== "Apparel");
  productFilters.sort();
  productFilters.unshift("Apparel");

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
