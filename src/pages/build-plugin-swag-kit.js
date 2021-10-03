import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import { CollectionListings } from '../components/collection-listings';
import { PasswordLock } from '../components/password-lock';
import SEO from '../components/seo';
import { useAccess } from '../context/access-context';

// export const query = graphql`
//   {
//     shopifyCollection(handle: { eq: "build-plugin-swag-kit" }) {
//       descriptionHtml
//       handle
//       title
//       products {
//         id
//         title
//         slug
//         productType
//         description
//         variants {
//           shopifyId
//           title
//           availableForSale
//           image {
//             localFile {
//               childImageSharp {
//                 fluid(
//                   maxWidth: 900
//                   maxHeight: 900
//                   fit: COVER
//                   cropFocus: CENTER
//                 ) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//           priceV2 {
//             amount
//             currencyCode
//           }
//           sku
//         }
//       }
//     }
//   }
// `;

export default ({ data }) => {
  const { access, updateAccess } = useAccess(data.shopifyCollection.handle);

  return (
    <Layout home>
      <SEO
        metadata={{
          title: 'Build Plugin Swag Kit',
          description: 'Swag that’s only available to Build Plugin Creators.',
        }}
      />

      {access ? (
        <>
          <CollectionListings collection={data.shopifyCollection} />
        </>
      ) : (
        <PasswordLock handleCorrectPassword={() => updateAccess(true)} passwordVariable='BUILD_PLUGIN_SWAG_KIT_PASSWORD' />
      )}
    </Layout>
  );
};
