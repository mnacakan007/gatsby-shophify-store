import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.sectionHeading}>Credits</h3>
      <nav>
        <ul className={styles.nav}>
          <li>
            <strong className={styles.heading}>Most important link</strong>
            <Link className={styles.link} to="/pages/shipping-and-return-policy">
              Shipping & Returns policy
            </Link>
          </li>
          <li>
            <strong className={styles.heading}>Contact us</strong>
            <Link className={styles.link} to="mailto:contact@swag.netlify.com">
              contact@swag.netlify.com
            </Link>
          </li>
          <li>
            <strong className={styles.heading}>Click this link to keep us safe</strong>
            <Link className={styles.link} to="https://community-docs.netlify.com/code-of-conduct.html">
              Community Code of Conduct
            </Link>
          </li>
          <li>
            <strong className={styles.heading}>Executive Producer</strong>
            <Link className={styles.link} to="https://www.netlify.com/">
              Netlify
            </Link>
          </li>
          <li>
            <strong className={styles.heading}>Starring</strong>
            <Link className={styles.link} to="https://github.com/netlify/swag-site/graphs/contributors">
              Contributors
            </Link>
          </li>
        </ul>  
      </nav>
    </footer>
  );
}
