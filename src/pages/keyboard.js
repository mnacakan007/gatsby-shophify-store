import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { CollectionListings } from '../components/collection-listings';
import { PasswordLock } from '../components/password-lock';
import SEO from '../components/seo';

export const query = graphql`
  {
    allShopifyCollection(filter: { handle: { eq: "netlify-exclusive" } }) {
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
  }
`;

const exclusiveCollection = 'netlify-exclusive';

export default ({ data }) => {
  const [secret, setSecret] = useState();
  const exclusive = data.allShopifyCollection.nodes.filter((node) => {
    return node.handle === exclusiveCollection;
  });

  return (
    <Layout home>
      <SEO />
      {secret ? (
        <CollectionListings collection={exclusive[0]} />
      ) : (
        <PasswordLock handleCorrectPassword={() => setSecret(true)} />
      )}
    </Layout>
  );
};
