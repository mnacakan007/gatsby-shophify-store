import React from 'react';
import { CartProvider } from './src/context/cart-context';

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);
