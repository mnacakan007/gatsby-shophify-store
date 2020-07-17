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
      <h1
        sx={{
          color: 'white',
          fontFamily: 'MADE-dillan',
          fontSize: 7,
          fontWeight: 400,
          mb: 4,
          mt: 5,
          mx: 'auto',
          maxWidth: '90vw',
          width: 1100,
        }}
      >
        {product.title}
      </h1>
      <div
        sx={{
          bg: 'white',
          borderRadius: 8,
          display: 'grid',
          gap: 4,
          gridTemplateColumns: '1fr 35%',
          margin: '50px auto',
          maxWidth: 1100,
          mt: 0,
          p: 2,
          pl: 3,
          width: '90vw',
        }}
      >
        <div>
          <p sx={{ color: 'background', fontSize: 3, fontWeight: 'bold' }}>
            {price}
          </p>
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
                <label htmlFor="variantId" className="sr-only">
                  Size
                </label>
                <select
                  name="variantId"
                  id="variantId"
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
                name="variantId"
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
