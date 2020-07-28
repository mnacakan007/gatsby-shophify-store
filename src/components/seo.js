import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ metadata }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  console.log(metadata);
  
  const defaults = data.site.siteMetadata;

  const title = metadata?.title ? `${metadata?.title} - ${defaults.title}` : defaults.title;
  const description = metadata?.description ? `${metadata?.description} Check this product and more at the Netlify Swag Store` : defaults.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta itemprop="name" content={title} />
      <meta itemprop="description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default SEO