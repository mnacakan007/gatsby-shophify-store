import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import ProductTypeLabel from '../components/product-type-label';
import Cart from '../assets/cart.svg';
import { useCart } from '../context/cart-context';
import styles from '../styles/product-details.module.css';
import SEO from '../components/seo';
import { SizingChart } from '../components/sizing-chart';

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
      metafields {
        value
        key
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

const formatPrice = ((amount, currency = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
})

const ProductPage = ({ data }) => {
  const { addItemToCart } = useCart();
  const product = data.shopifyProduct;
  const needsSizing = product.variants.length > 1;

  const firstVariant = product.variants[0];
  const availableForSale = product.variants.find(variant => variant.availableForSale);
  const currency = firstVariant.priceV2.currencyCode;
  const price = formatPrice(firstVariant.priceV2.amount);
  const compareAtPrice = firstVariant.compareAtPriceV2 ? formatPrice(firstVariant.compareAtPriceV2.amount) : null;

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
      <SEO product={{...product }}/>
      <div className={styles.details}>
        <div className={styles.productDetailsContentContainer}>
          <h1 className={styles.heading}>{product.title}</h1>
          <p className={styles.price}>
            {compareAtPrice ? (
              <span>
                {currency} {price}
                <del className={styles.priceOnSale}>{compareAtPrice}</del>
              </span>
            ) : (
                <span>{currency} {price}</span>
              )
            }
          </p>
          <p className={styles.description}>{product.description}</p>
          {product.metafields.length > 0 ? (
            <details className={styles.metafields}>
              <summary>Product details</summary>
              <dl>
                {product.metafields.map(metafield => {
                  return (
                    <Fragment>
                      <dt>{metafield.key}:</dt>
                      <dd>{metafield.value}</dd>
                    </Fragment>
                  )
                })}
              </dl>
            </details>
          ) : (
            " "
          )}


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

            {availableForSale ? (
              <Fragment>
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
              </Fragment>
            ) : (
              <div className={styles.outOfStock}>
                Out of stock
              </div>
            )
            }
          </form>
        </div>
        <div className={styles.productDetailsImageContainer}>
          {product.productType &&
            <ProductTypeLabel
              type={product.productType}
              className={styles.productDetailsProductType}
            />
          }
          <Image
            fluid={product.images[0].localFile.childImageSharp.fluid}
            alt={product.title}
          />
        </div>
      </div>
      {product.productType && product.productType === "shirt" ? (
        <div className={styles.details}>
          <h2 className={styles.heading}>Sizing chart</h2>
          <SizingChart />
        </div>
        ) : (" ")
      }
    </Layout>
  );
};

export default ProductPage;
