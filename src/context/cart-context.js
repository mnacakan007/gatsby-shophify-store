import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { buildClient } from 'shopify-buy';

const client = buildClient({
  domain: process.env.GATSBY_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_API_TOKEN,
});

const IS_BROWSER = typeof window !== 'undefined';

const reducer = (checkout, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT':
      return action.checkout;

    default:
      return checkout;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [checkout, dispatch] = useReducer(reducer, false);
  return (
    <CartContext.Provider value={{ checkout, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const { checkout, dispatch } = useContext(CartContext);

  const setCheckout = useCallback(
    (checkout) => dispatch({ type: 'SET_CHECKOUT', checkout }),
    [dispatch],
  );

  useEffect(() => {
    async function getCheckout() {
      if (checkout) return;

      if (!IS_BROWSER) {
        setCheckout({});
      }

      // check if we already have a cart stored for this browser
      const existingCheckoutID = localStorage.getItem('shopify_checkout_id');
      if (existingCheckoutID && existingCheckoutID !== 'null') {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID,
          );

          // if this cart was already purchased, clear it and start fresh
          if (!existingCheckout.completedAt) {
            setCheckout(existingCheckout);
            return;
          }
        } catch (error) {
          localStorage.removeItem('shopify_checkout_id');
        }
      }

      // if we get here, we need to create a new checkout session
      const newCheckout = await client.checkout.create();
      localStorage.setItem('shopify_checkout_id', newCheckout.id);
      setCheckout(newCheckout);
    }

    getCheckout();
  }, [checkout, setCheckout]);

  const prepItem = ({ variantId, quantity }) => [
    {
      variantId,
      quantity: parseInt(quantity, 10),
    },
  ];

  const addItemToCart = async (item) => {
    dispatch({ type: 'PENDING' });

    try {
      const updatedCheckout = await client.checkout.addLineItems(
        checkout.id,
        prepItem(item),
      );
      setCheckout(updatedCheckout);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemFromCart = async (variantId) => {
    dispatch({ type: 'PENDING' });

    try {
      const updatedCheckout = await client.checkout.removeLineItems(
        checkout.id,
        [variantId],
      );
      setCheckout(updatedCheckout);
    } catch (error) {
      console.error(error);
    }
  };

  return { checkout, addItemToCart, removeItemFromCart };
};
