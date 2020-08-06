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
      {state.matches('open') ? (
        <Fragment>
          <span className="sr-only">Close cart</span>
          <span aria-hidden="true">&times;</span>
        </Fragment>
        ) : (
          <Fragment>
            <span className="sr-only">Open cart, </span> {count} <span className="sr-only">items</span>
          </Fragment>
        )
      }
    </button>
  );
};

const CartItems = ({ items, state }) => {
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
                alt={
                  item.variant.image.altText ? item.variant.image.altText : ""
                }
              />
            </div>
            <div>
              <p className={styles.name}>
                {item.title}
                {size}
              </p>
              <p className={styles.priceline}>
                <span className="sr-only">Item price: </span>
                {unitPrice} &times; <span className="sr-only">Quantity: </span>
                {item.quantity}
              </p>
            </div>
            <div>
              <p className={styles.subtotal}>
                <span className="sr-only">Item total price: </span>
                {subtotal}
              </p>
            </div>
            <div className={styles.wrap}>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className={styles.remove}
                tabIndex={state === "closed" ? "-1" : 0}
              >
                <span className="sr-only">
                  Remove {item.title} from your cart
                </span>
                <span aria-hidden="true">&times;</span>
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
  const { state } = _;

  if (!checkout) return null;

  return (
    <div
      ref={ref}
      className={styles.cart}
      aria-hidden={state === "closed" ? "true" : false}
    >
      <h3 className={styles.heading}>Your Cart</h3>
      {checkout.lineItems.length < 1 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <Fragment>
          <CartItems items={checkout.lineItems} state={state} />
          <ul className={styles.totals}>
            <li className={styles.taxesAndShipping}>
              <span>Taxes calculated at checkout</span>
            </li>
            <li>
              <span>Shipping:</span>
              <span>Free</span>
            </li>
            <li className={styles.total}>
              <span>Subtotal:</span>
              <span>
                {format(checkout.totalPriceV2.currencyCode)(
                  checkout.totalPriceV2.amount
                )}
              </span>
            </li>
          </ul>
          <a
            href={checkout.webUrl}
            className={styles.checkout}
            tabIndex={state === "closed" ? "-1" : 0}
          >
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
