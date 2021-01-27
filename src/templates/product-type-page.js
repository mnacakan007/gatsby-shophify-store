import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { CollectionListings } from '../components/collection-listings';
import { HomeIntro } from '../components/home-intro';
/* import { PromotionalBanner } from '../components/promotional-banner'; */
import SEO from "../components/seo";

export const query = graphql`
  {
    shopifyCollection(handle: {eq: "netlify-swag-store"}) {
      descriptionHtml
      handle
      title
      products {
        id
        title
        slug
        productType
        description
        tags
        variants {
          shopifyId
          title
          availableForSale
          image {
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 900
                  maxHeight: 900
                  fit: COVER
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFluid
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
    shopifyPage(handle: {eq: "netlify-swag-for-all"}) {
      body
      title
    }
  }
`;

export default ({ data, pageContext }) => {

  const { productType } = pageContext;
  const { title, body } = data.shopifyPage;

  const products = data.shopifyCollection.products.filter(
    (product) => {
      return product.productType === productType;
    }
  );

  return (
    <Layout home>
      <SEO />
      <HomeIntro title={title} body={body} />
      <CollectionListings collection={products} collectionTitle={productType} />
    </Layout>
  );
};
