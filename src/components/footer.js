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
            <a className={styles.link} href="mailto:contact@swag.netlify.com">
              contact@swag.netlify.com
            </a>
          </li>
          <li>
            <strong className={styles.heading}>Executive Producer</strong>
            <a className={styles.link} href="https://www.netlify.com/">
              Netlify
            </a>
          </li>
          <li>
            <strong className={styles.heading}>Starring</strong>
            <a className={styles.link} href="https://github.com/netlify/swag-site/graphs/contributors">
              Contributors
            </a>
          </li>
        </ul>  
      </nav>
    </footer>
  );
}
