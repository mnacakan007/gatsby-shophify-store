import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { CollectionListings } from '../components/collection-listings';
import { HomeIntro } from '../components/home-intro';
/* import { PromotionalBanner } from '../components/promotional-banner'; */
import SEO from "../components/seo";

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
    }
    shopifyPage(handle: {eq: "netlify-swag-for-all"}) {
      body
      title
    }
  }
`;

const allProductsCollection = "netlify-swag-store";
const soldOutProductsCollection = "done-but-not-forgotten-a-netlify-swag-retrospective"

export default ({ data }) => {
  const soldOutProducts = data.allShopifyCollection.nodes.filter(
    (node) => {
      return node.handle === soldOutProductsCollection;
    }
  );
  
  const allProducts = data.allShopifyCollection.nodes.filter(
    (node) => {
      return node.handle === allProductsCollection;
    }
  );

  const { title, body } = data.shopifyPage;

  const productFilters = allProducts[0].products.map(product => product.productType);

  console.log(productFilters);
  
  return (
    <Layout home>
      <SEO />
      {/* <PromotionalBanner /> */}
      <HomeIntro title={title} body={body} />
      <CollectionListings collection={allProducts[0]} filters={productFilters} />

      <CollectionListings collection={soldOutProducts[0]} />
    </Layout>
  );
};
