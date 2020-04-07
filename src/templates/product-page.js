/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  query($productID: String) {
    shopifyProduct(id: { eq: $productID }) {
      title
      description
      images {
        localFile {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
      variants {
        availableForSale
        priceV2 {
          amount
          currencyCode
        }
        sku
        title
      }
      productType
    }
  }
`;

const ProductPage = ({ data }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};

export default ProductPage;
