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

  console.log(metadata);
  
  const defaults = data.site.siteMetadata;

  const title = metadata.title ? `${metadata.title} - ${defaults.title}` : defaults.title;
  const description = metadata.description ? `${metadata.description} Check this product and more at the Netlify Swag Store` : defaults.description;
  const ogimage = metadata.images ? metadata.images[0].localFile.childImageSharp.fluid.src : defaults.ogimage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta itemprop="name" content={title} />
      <meta itemprop="description" content={description} />
      <meta itemprop="image" content={ogimage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@netlify" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@netlify" />
      <meta name="twitter:image" content={ogimage} />
      <meta name="og:image" content={ogimage} />
      <meta name="og:image:secure_url" content={ogimage} />
      <meta name="image" property="og:image" content={ogimage} />
      <meta property="og:site_name" content="Netlify Swag Store" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default SEO