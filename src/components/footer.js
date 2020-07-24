import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h4 className={styles.heading}>Most Clicked Link in the Footer</h4>
      <Link className={styles.link} to="/pages/shipping-and-return-policy">
        Shipping & Returns policy
      </Link>

      <h4 className={styles.heading}>Click This Link to Keep Us Safe</h4>
      <a
        className={styles.link}
        href="https://community-docs.netlify.com/code-of-conduct.html"
      >
        Community Code of Conduct
      </a>

      <h4 className={styles.heading}>Executive Producer</h4>
      <a className={styles.link} href="https://www.netlify.com/">
        Netlify
      </a>

      <h4 className={styles.heading}>Starring</h4>
      <a
        className={styles.link}
        href="https://github.com/netlify/swag-site/graphs/contributors"
      >
        Contributors
      </a>
      <a className={styles.link} href="https://github.com/netlify/swag-site">
        You?
      </a>
    </footer>
  );
}
