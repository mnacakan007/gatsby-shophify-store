import React from 'react';
import { Link } from 'gatsby';
import Cart from './cart';
import Logo from '../components/logo';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <Cart />
    </header>
  );
};

export default Header;
