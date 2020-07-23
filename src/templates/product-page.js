import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import ProductTypeLabel from '../components/product-type-label';
import Cart from '../assets/cart.svg';
import { useCart } from '../context/cart-context';
import styles from '../styles/product-details.module.css';

export const query = graphql`
  query($productID: String) {
    shopifyProduct(id: { eq: $productID }) {
      title
      description
      images {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      variants {
        shopifyId
        availableForSale
        priceV2 {
          amount
          currencyCode
        }
        title
      }
      productType
    }
  }
`;

const ProductPage = ({ data }) => {
  const { addItemToCart } = useCart();
  const product = data.shopifyProduct;
  const needsSizing = product.variants.length > 1;

  const firstVariant = product.variants[0];
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: firstVariant.priceV2.currencyCode,
  }).format(firstVariant.priceV2.amount);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    addItemToCart({
      variantId: data.get('variantId'),
      quantity: data.get('quantity'),
    });
  };

  return (
    <Layout>
      <div className={styles.details}>
        <div className={styles.productDetailsContentContainer}>
          <h1 className={styles.heading}>{product.title}</h1>
          <p className={styles.price}>{price}</p>
          <p>{product.description}</p>
          <form
            onSubmit={handleSubmit}
            className={`${styles.form} ${
              needsSizing ? styles.needsSizing : ""
            }`}
          >
            {needsSizing ? (
              <div className={styles.formRow}>
                <label htmlFor="variantId">Size</label>
                <select
                  name="variantId"
                  id="variantId"
                  className={styles.select}
                >
                  {product.variants
                    .filter((v) => v.availableForSale)
                    .map(({ shopifyId, title }) => (
                      <option key={shopifyId} value={shopifyId}>
                        {title}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              <input
                type="hidden"
                name="variantId"
                value={product.variants[0].shopifyId}
              />
            )}

            <div className={styles.formRow}>
              <label htmlFor="quantity">Quantity</label>
              <input
                name="quantity"
                id="quantity"
                type="number"
                min={1}
                defaultValue={1}
                className={styles.quantity}
              />
            </div>

            <button type="submit" className={styles.button}>
              <img src={Cart} alt="" className={styles.icon} />
              Add to Cart
            </button>
          </form>
        </div>
        <div className={styles.productDetailsImageContainer}>
          <ProductTypeLabel
            type={product.productType}
            className={styles.productDetailsProductType}
          />
          <Image
            fluid={product.images[0].localFile.childImageSharp.fluid}
            alt={product.title}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
