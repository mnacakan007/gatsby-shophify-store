import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ metadata }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description,
          ogimage
        }
      }
    }
  `);
  
  const defaults = data.site.siteMetadata;

  const title = metadata?.title ? `${metadata.title} - Netlify Store` : defaults.title;
  const description = metadata?.description ? `${metadata.description} Check this product and more at the Netlify Store` : defaults.description;
  const ogimage = metadata?.images ? metadata.images[0].localFile.childImageSharp.fluid.src : defaults.ogimage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta itemprop="name" content={title} />
      <meta itemprop="description" content={description} />
      <meta itemprop="image" content={`https://swag.netlify.com${ogimage}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@netlify" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@netlify" />
      <meta name="twitter:image" content={`https://swag.netlify.com${ogimage}`} />
      <meta name="og:image" content={`https://swag.netlify.com${ogimage}`} />
      <meta name="og:image:secure_url" content={`https://swag.netlify.com${ogimage}`} />
      <meta name="image" property="og:image" content={`https://swag.netlify.com${ogimage}`} />
      <meta property="og:site_name" content="Netlify Store" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="google-site-verification" content="RMV-cjpAWkM-B69Nn0Pc-3hqjZzD8rKr6zpzm0Zhlak" />

      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
    </Helmet>
  );
};

export default SEO