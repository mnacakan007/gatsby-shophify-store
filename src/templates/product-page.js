/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import ProductTypeLabel from '../components/product-type-label';
import Cart from '../assets/cart.svg';
import { useCart } from '../context/cart-context';

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
  const { checkout } = useCart();
  const product = data.shopifyProduct;
  const needsSizing = product.variants.length > 1;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    console.log({
      checkout,
      id: data.get('shopifyId'),
      quantity: data.get('quantity'),
    });

    // checkout.addLineItems([
    //   {
    //     variantId: data.get('shopifyId'),
    //     quantity: data.get('quantity'),
    //   },
    // ]);
  };

  return (
    <Layout>
      <div
        sx={{
          bg: 'white',
          borderRadius: 8,
          display: 'grid',
          gap: 4,
          gridTemplateColumns: '1fr 35%',
          margin: '50px auto',
          maxWidth: 1000,
          p: 2,
          pl: 3,
          width: '90vw',
        }}
      >
        <div>
          <h1 sx={{ color: 'heading' }}>{product.title}</h1>
          <ProductTypeLabel type={product.productType} />
          <p>{product.description}</p>
          <form
            onSubmit={handleSubmit}
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: needsSizing ? '1fr 1fr 2fr' : '1fr 2fr',
            }}
          >
            {needsSizing ? (
              <Fragment>
                <label htmlFor="shopifyId" className="sr-only">
                  Size
                </label>
                <select
                  name="shopifyId"
                  id="shopifyId"
                  sx={{
                    bg: 'white',
                    border: '2px solid',
                    borderColor: 'grayLight',
                    borderRadius: 6,
                    fontSize: 2,
                    p: 2,
                  }}
                >
                  {product.variants
                    .filter((v) => v.availableForSale)
                    .map(({ shopifyId, title }) => (
                      <option key={shopifyId} value={shopifyId}>
                        {title}
                      </option>
                    ))}
                </select>
              </Fragment>
            ) : (
              <input
                type="hidden"
                name="shopifyId"
                value={product.variants[0].shopifyId}
              />
            )}

            <label htmlFor="quantity" className="sr-only">
              Quantity
            </label>
            <input
              name="quantity"
              id="quantity"
              type="number"
              min={1}
              defaultValue={1}
              sx={{
                border: '2px solid',
                borderColor: 'grayLight',
                borderRadius: 6,
                fontSize: 2,
                p: 2,
              }}
            />

            <button
              type="submit"
              sx={{
                bg: 'teal',
                border: '2px solid',
                borderColor: 'teal',
                borderRadius: 6,
                color: 'white',
                fontSize: 2,
                fontWeight: 600,
                p: 2,
              }}
            >
              <img src={Cart} alt="" sx={{ mr: 1 }} />
              Add to Cart
            </button>
          </form>
        </div>
        <div>
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
