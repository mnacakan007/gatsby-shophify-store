/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import logo from '../assets/netlify-swag-logo.svg';
import Cart from './cart';

const Layout = ({ children }) => (
  <Fragment>
    <header sx={{ mx: 'auto', mt: '10vw', maxWidth: '90vw' }}>
      <img src={logo} alt="Netlify Swag" />
      <Cart />
    </header>
    <main>{children}</main>
  </Fragment>
);

export default Layout;
