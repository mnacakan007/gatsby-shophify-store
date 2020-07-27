import React, { Fragment, forwardRef, useRef, useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import CartIcon from '../assets/cart-dark.svg';
import { useCart } from '../context/cart-context';
import styles from '../styles/cart.module.css';

const TRANSITION_LENGTH = 200;

const cartMachine = Machine({
  id: 'cart',
  initial: 'closed',
  states: {
    closed: {
      on: {
        OPEN: 'opening',
      },
    },
    opening: {
      invoke: {
        src: 'openCartAnimation',
        onDone: 'open',
        onError: 'error',
      },
    },
    open: {
      on: {
        CLOSE: 'closing',
      },
    },
    closing: {
      invoke: {
        src: 'closeCartAnimation',
        onDone: 'closed',
        onError: 'error',
      },
    },
    error: {
      on: {
        RESET: 'closed',
      },
    },
  },
});

const format = (currencyCode) => (n) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(n);

const CartButton = ({ state, send }) => {
  const { checkout } = useCart();

  const handleClick = () => {
    if (state.matches('error')) {
      send('RESET');
    }

    if (state.matches('open')) {
      send('CLOSE');
    }

    if (state.matches('closed')) {
      send('OPEN');
    }
  };

  const count = checkout?.lineItems?.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  return (
    <button onClick={handleClick} className={styles.toggle}>
      <img src={CartIcon} alt="" className={styles.icon} />
      <span>{state.matches('open') ? <span>&times;</span> : count}</span>
    </button>
  );
};

const CartItems = ({ items }) => {
  const { removeItemFromCart } = useCart();

  if (!items) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <ul className={styles.items}>
      {items.map((item) => {
        const size =
          item.variant.title !== 'Default Title'
            ? ` (${item.variant.title})`
            : null;

        const unitPrice = format(item.variant.priceV2.currencyCode)(
          item.variant.priceV2.amount,
        );
        const subtotal = format(item.variant.priceV2.currencyCode)(
          item.variant.priceV2.amount * item.quantity,
        );

        return (
          <li key={item.id} className={styles.item}>
            <div>
              <img
                src={item.variant.image.src}
                alt={item.variant.image.altText}
              />
            </div>
            <div>
              <p className={styles.name}>
                {item.title}
                {size}
              </p>
              <p className={styles.priceline}>
                {unitPrice} &times; {item.quantity}
              </p>
            </div>
            <div>
              <p className={styles.subtotal}>{subtotal}</p>
            </div>
            <div className={styles.wrap}>
              <button
                onClick={() => removeItemFromCart(item.id)}
                title="Remove this item from your cart"
                className={styles.remove}
              >
                &times;
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const CartWrapper = forwardRef((_, ref) => {
  const { checkout } = useCart();

  if (!checkout) return null;

  return (
    <div ref={ref} className={styles.cart}>
      <h3 className={styles.heading}>Your Cart</h3>
      {checkout.lineItems.length < 1 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <Fragment>
          <CartItems items={checkout.lineItems} />
          <ul className={styles.totals}>
            <li className={styles.taxesAndShipping}>
              <span>Taxes and Shipping calculated at checkout</span>
            </li>
            <li className={styles.total}>
              <span>Subtotal:</span>
              <span>
                {format(checkout.totalPriceV2.currencyCode)(
                  checkout.totalPriceV2.amount,
                )}
              </span>
            </li>
          </ul>
          <a href={checkout.webUrl} className={styles.checkout}>
            Check Out
          </a>
        </Fragment>
      )}
    </div>
  );
});

const Cart = () => {
  const cartRef = useRef();
  const openCartAnimation = useCallback(
    () =>
      new Promise((resolve, reject) => {
        try {
          cartRef.current.style.transform = 'translateX(0)';
          setTimeout(() => resolve(true), TRANSITION_LENGTH);
        } catch (err) {
          reject(err);
        }
      }),
    [cartRef],
  );

  const closeCartAnimation = useCallback(
    () =>
      new Promise((resolve, reject) => {
        try {
          cartRef.current.style.transform = 'translateX(100%)';
          setTimeout(() => resolve(true), TRANSITION_LENGTH);
        } catch (err) {
          reject(err);
        }
      }),
    [cartRef],
  );

  const [state, send] = useMachine(cartMachine, {
    services: { openCartAnimation, closeCartAnimation },
  });

  if (state.matches('error')) {
    return (
      <p>
        error <button onClick={() => send('RESET')}>RESET</button>
      </p>
    );
  }

  return (
    <Fragment>
      <CartButton state={state} send={send} />
      <CartWrapper ref={cartRef} state={state.value} />
    </Fragment>
  );
};

export default Cart;
