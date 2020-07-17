import React from 'react';
import { Link } from 'gatsby';
import Cart from './cart';
import logo from '../assets/netlify-swag-logo.svg';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Netlify Swag" className={styles.logo} />
      </Link>
      <Cart />
    </header>
  );
};

export default Header;
