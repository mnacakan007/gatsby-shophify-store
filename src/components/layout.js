import React from 'react';
import { Fragment } from 'react';
import Header from './header';
// import AnnouncementBar from "./announcement-bar";
import { Contributors } from './contributors';
import styles from '../styles/layout.module.css';

import '../styles/global.css';
import { Footer } from './footer';

const Layout = ({ children, home = false }) => (
  <Fragment>
    {/* <AnnouncementBar /> */}
    <Header />
    <div className={styles.container}>
      <main className={home ? 'home' : ''}>{children}</main>
      <Contributors />
    </div>
    <Footer />
  </Fragment>
);

export default Layout;
