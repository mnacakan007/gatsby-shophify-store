import React, { createContext, useContext, useReducer } from 'react';
import Shopify from 'shopify-buy';

const client = Shopify.buildClient({
  domain: process.env.GATSBY_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_API_TOKEN,
});

let SHOPIFY_CHECKOUT;

async function initializeCheckout() {
  return new Promise((resolve, reject) => {
    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const setCheckoutInState = (checkout) => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      SHOPIFY_CHECKOUT = checkout;
      resolve(checkout);
    };

    if (existingCheckoutID && existingCheckoutID !== 'null') {
      client.checkout
        .fetch(existingCheckoutID)
        .then((checkout) => {
          if (!checkout.completedAt) {
            setCheckoutInState(checkout);
          }
        })
        .catch((err) => {
          console.error('something went wrong; bailing');
          localStorage.removeItem('shopify_checkout_id');
          reject('error creating a checkout');
        });
    }

    console.log('creating a new checkout');

    client.checkout
      .create()
      .then((checkout) => setCheckoutInState(checkout))
      .catch((e) => console.error(e));
  });
}

const reducer = async (cart, action) => {
  console.log({ cart, action });
  if (!SHOPIFY_CHECKOUT) {
    console.log('no checkout found');
    await initializeCheckout();
  }

  switch (action.type) {
    case 'ADD_CART_ITEM':
      const updated = await client.checkout.addLineItems(SHOPIFY_CHECKOUT.id, [
        {
          variantId: action.id,
          quantity: parseInt(action.quantity, 10),
        },
      ]);

      console.log(updated.lineItems);
    // return cart.concat({
    //   sku: action.sku,
    //   quantity: action.quantity,
    // });

    // case 'DELETE_CART_ITEM':
    //   return cart.filter((item) => item.sku !== action.sku);

    // case 'UPDATE_ITEM_QUANTITY':
    //   return cart.map((item) => {
    //     if (item.sku !== action.sku) return item;

    //     return {
    //       sku: item.sku,
    //       quantity: action.quantity,
    //     };
    //   });
    default:
      return cart;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => (
  <CartContext.Provider value={useReducer(reducer, [])}>
    {children}
  </CartContext.Provider>
);

export const useCart = () => {
  const [cart, dispatch] = useContext(CartContext);

  const addItem = (item) => dispatch({ type: 'ADD_CART_ITEM', ...item });
  // const updateQuantity = (item) =>
  //   dispatch({ type: 'UPDATE_ITEM_QUANTITY', item });
  // const deleteItem = (sku) => dispatch({ type: 'DELETE_ITEM', sku });

  return { cart, addItem /* updateQuantity, deleteItem */ };
};
