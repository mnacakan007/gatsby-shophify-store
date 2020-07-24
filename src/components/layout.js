import React from 'react';
import { Fragment } from 'react';
import Header from './header';
import { Contributors } from './contributors';
import styles from '../styles/layout.module.css';

import '../styles/global.css';
import { Footer } from './footer';
import SEO from './seo.js';

const Layout = ({ children, home = false }) => (
  <Fragment>
    <SEO />
    <Header />
    <div className={styles.container}>
      <main className={home ? 'home' : ''}>{children}</main>
      <Contributors />
    </div>
    <Footer />
  </Fragment>
);

export default Layout;
