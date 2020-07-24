import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { CollectionListings } from '../components/collection-listings';
import { HomeIntro } from '../components/home-intro';

export const query = graphql`
  {
    allShopifyCollection {
      nodes {
        descriptionHtml
        handle
        title
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
    }
    shopifyPage(handle: {eq: "netlify-swag-for-all"}) {
    body
    title
  }
  }
`;

const promoProductsCollection = "1-million-devs-swag";
const allProductsCollection = "netlify-swag-store";

export default ({ data }) => {
  const promotionalProducts = data.allShopifyCollection.nodes.filter(
    (node) => {
      return node.handle === promoProductsCollection;
    }
  );
  
  const allProducts = data.allShopifyCollection.nodes.filter(
    (node) => {
      return node.handle === allProductsCollection;
    }
  );

  const { title, body } = data.shopifyPage;
  return (
    <Layout home>
      <HomeIntro title={title} body={body} />
      <CollectionListings collection={promotionalProducts[0]} />
      <CollectionListings collection={allProducts[0]} />
    </Layout>
  );
};
