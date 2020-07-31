import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/announcement-bar.module.css';

const Header = () => {
  return (
    <div className={styles.announcementBar}>
      Free <Link className={styles.link} to="/product/netlify-1-million-devs-sticker">1 Million Devs sticker</Link> for the first 100 people with promo code: <span className={styles.promo}>MILLION</span> 🎉
    </div>
  );
};

export default Header;
