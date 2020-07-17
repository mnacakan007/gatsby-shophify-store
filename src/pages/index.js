/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProductCard from '../components/product-card';

export const query = graphql`
  {
    allShopifyCollection(filter: { title: { eq: "Publicly Available" } }) {
      nodes {
        products {
          id
          title
          slug
          productType
          description
          availableForSale
          variants {
            shopifyId
            title
            image {
              localFile {
                childImageSharp {
                  fluid(
                    maxWidth: 1600
                    maxHeight: 900
                    fit: COVER
                    cropFocus: CENTER
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            priceV2 {
              amount
              currencyCode
            }
            sku
          }
        }
      }
    }
  }
`;

export default ({ data }) => {
  const products = data?.allShopifyCollection?.nodes[0]?.products ?? [];

  return (
    <Layout home>
      <div
        sx={{
          mx: 'auto',
          maxWidth: '90vw',
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          width: 1100,
        }}
      >
        <h1
          sx={{
            gridColumn: '1 / 4',
            color: 'white',
            fontFamily: 'MADE-dillan',
            fontSize: 7,
            fontWeight: 400,
            mb: 3,
            mt: 5,
          }}
        >
          This Is Our Swag
        </h1>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};
