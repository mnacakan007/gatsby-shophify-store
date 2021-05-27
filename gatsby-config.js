require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
            };
          }),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "src/pages",
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: "netlify",
        // get this: https://netlify.myshopify.com/admin/apps/private
        accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_API_TOKEN,
        apiVersion: "2020-01",
        includeCollections: ["shop", "content"],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-42258181-24",
      },
    },
  ],
  siteMetadata: {
    title: "Netlify Store - Awesome Apparel, Stickers, and Other Swag",
    description:
      "Netlify socks, stickers, shirts, mugs, and much more! Check out the store for official Netliswag and Jamstack gear. PS - plz share with other devs.",
    ogimage: "/ogimage.png",
    siteUrl: "https://swag.netlify.com",
  },
};
