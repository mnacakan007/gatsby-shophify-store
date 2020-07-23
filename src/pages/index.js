import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { ProductListings } from '../components/product-listings';
import { HomeIntro } from '../components/home-intro';

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
    shopifyPage(handle: {eq: "netlify-swag-for-all"}) {
    body
    title
  }
  }
`;

export default ({ data }) => {
  const products = data?.allShopifyCollection?.nodes[0]?.products ?? [];

  const { title, body } = data.shopifyPage;
  return (
    <Layout home>
      <HomeIntro title={title} body={body} />
      <ProductListings products={products} />
    </Layout>
  );
};
