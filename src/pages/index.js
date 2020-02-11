import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';

export const query = graphql`
  {
    allShopifyProduct(
      filter: { variants: { elemMatch: { availableForSale: { eq: true } } } }
    ) {
      nodes {
        title
        productType
        description
        tags
        variants {
          title
          image {
            localFile {
              childImageSharp {
                fixed(
                  width: 100
                  height: 100
                  fit: COVER
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
`;

const Product = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.productType}</p>
      <p>{product.description}</p>
      <ul>
        {product.tags.map(tag => (
          <li key={`tag-${tag}`}>{tag}</li>
        ))}
      </ul>
      <Image
        fixed={product.variants[0].image.localFile.childImageSharp.fixed}
        alt={product.title}
      />
      {product.variants.length > 1 &&
        product.variants.map(variant => <p>Option: {variant.title}</p>)}
    </div>
  );
};

export default ({ data }) => (
  <>
    <h1>Hello world!</h1>
    {data.allShopifyProduct.nodes.map(product => (
      <Product key={product.id} product={product} />
    ))}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>
);
