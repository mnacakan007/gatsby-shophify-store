const slugify = require('slugify');

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    ShopifyProduct: {
      slug: {
        type: 'String',
        resolve(source) {
          return slugify(source.title, { lower: true });
        },
      },
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allShopifyProduct {
        nodes {
          id
          slug
          images {
            localFile {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  `);

  const pagesResult = await graphql(`
    {
      allShopifyPage {
        edges {
          node {
            id
            handle
            title
            body
            bodySummary
          }
        }
      }
    }
  `);
  const products = result.data.allShopifyProduct.nodes;

  products.forEach((product) => {
    if (
      !product ||
      !product.images ||
      !product.images[0] ||
      !product.images[0].localFile
    ) {
      return;
    }

    actions.createPage({
      path: `/product/${product.slug}`,
      component: require.resolve('./src/templates/product-page.js'),
      context: {
        productID: product.id,
      },
    });
  });

  const pages = pagesResult.data.allShopifyPage.edges;

  pages.forEach(page => {
    actions.createPage({
      path: `/pages/${page.node.handle}`,
      component: require.resolve("./src/templates/page.js"),
      context: {
        pageHandle: page.node.handle,
      },
    });
  })

};
