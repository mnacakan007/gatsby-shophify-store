import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query($pageHandle: String) {
    shopifyPage(handle: { eq: $pageHandle }) {
      bodySummary
      body
      title
    }
  }
`;

const Page = ({ data }) => {

  const page = data.shopifyPage;

  return (
    <Layout>
      <h1>{page.title}</h1>
    </Layout>
  );
};

export default Page;
