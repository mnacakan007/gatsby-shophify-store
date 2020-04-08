import React, { createContext, /* useContext, */ useReducer } from 'react';
import Shopify from 'shopify-buy';

const client = Shopify.buildClient({
  domain: process.env.GATSBY_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_API_TOKEN,
});

let SHOPIFY_CHECKOUT;

async function initializeCheckout() {
  return new Promise((resolve, reject) => {
    if (SHOPIFY_CHECKOUT) resolve(SHOPIFY_CHECKOUT);

    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    console.log({ existingCheckoutID });

    const setCheckoutInState = (checkout) => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      SHOPIFY_CHECKOUT = checkout;
      resolve(checkout);
    };

    if (existingCheckoutID && existingCheckoutID !== 'null') {
      console.log('loading existing checkout');
      client.checkout
        .fetch(existingCheckoutID)
        .then((checkout) => {
          if (!checkout.completedAt) {
            console.log('existing checkout found!');
            setCheckoutInState(checkout);
          }
        })
        .catch((err) => {
          console.error('something went wrong; bailing');
          console.error(err);
          localStorage.removeItem('shopify_checkout_id');
          reject('error creating a checkout');
        });
      return;
    }

    console.log('creating a new checkout');

    client.checkout
      .create()
      .then((checkout) => setCheckoutInState(checkout))
      .catch((e) => reject(e));
  });
}

const reducer = (cart, action) => {
  console.log({ cart, action });

  // const prepItem = ({ id, quantity }) => [
  //   {
  //     variantId: id,
  //     quantity: parseInt(quantity, 10),
  //   },
  // ];

  switch (action.type) {
    case 'UPDATE_CART':
      return cart;

    case 'DELETE_CART_ITEM':
      return cart;

    case 'UPDATE_ITEM_QUANTITY':
      return cart;

    default:
      return cart;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => (
  <CartContext.Provider value={useReducer(reducer, new Map())}>
    {children}
  </CartContext.Provider>
);

export const useCart = async () => {
  if (!SHOPIFY_CHECKOUT) {
    console.log('no checkout found');
    await initializeCheckout();
  }
  // const [cartSet, dispatch] = useContext(CartContext);

  // const updateCart = (item) => dispatch({ type: 'UPDATE_CART', ...item });
  // const deleteItem = (sku) => dispatch({ type: 'DELETE_ITEM', sku });

  return { checkout: SHOPIFY_CHECKOUT /* , updateCart, deleteItem  */ };
};
