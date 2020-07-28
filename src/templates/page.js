import React from "react";
import { graphql } from 'gatsby';
import styles from "../styles/page.module.css";
import parse from "html-react-parser";

import Layout from '../components/layout';

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
  const body = parse(page.body);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>{page.title}</h1>
        {body}
      </div>
    </Layout>
  );
};

export default Page;
