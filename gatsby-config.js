require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: 'src/pages',
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'netlify',
        // get this: https://netlify.myshopify.com/admin/apps/private
        accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_API_TOKEN,
        apiVersion: "2020-01",
        includeCollections: ["shop", "content"],
      },
    },
  ],
};
