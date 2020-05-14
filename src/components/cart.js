/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import { Fragment, forwardRef, useRef, useCallback } from 'react';
import { useCart } from '../context/cart-context';

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

const CartItems = ({ items }) => {
  if (!items) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <ul sx={{ listStyle: 'none', p: 0 }}>
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
          <li
            key={item.id}
            sx={{
              alignItems: 'top',
              borderBottom: '1px solid',
              borderBottomColor: 'grayLight',
              display: 'grid',
              gap: '0.5rem',
              gridTemplateColumns: '35px 1fr 70px',
              py: 2,
              px: 1,
              ':first-of-type': {
                borderTop: 'none',
              },
              textAlign: 'left',
            }}
          >
            <div>
              <img
                src={item.variant.image.src}
                alt={item.variant.image.altText}
                sx={{
                  display: 'block',
                  width: '100%',
                }}
              />
            </div>
            <div>
              <p sx={{ fontSize: 1, fontWeight: 600, m: 0 }}>
                {item.title}
                {size}
              </p>
              <p sx={{ fontSize: 0, fontWeight: 300, m: 0 }}>
                {unitPrice} &times; {item.quantity}
              </p>
            </div>
            <div>
              <p sx={{ fontSize: 1, m: 0, textAlign: 'right' }}>{subtotal}</p>
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
    <div
      ref={ref}
      sx={{
        bg: 'white',
        boxShadow: (t) => `
          0 0 0 1px ${t.colors.grayDarkAlpha},
          0 4px 4px ${t.colors.grayDarkAlpha},
          -4px 4px 8px ${t.colors.grayDarkAlpha}
        `,
        color: 'text',
        display: 'block',
        height: '100vh',
        px: 2,
        py: 3,
        position: 'absolute',
        right: 0,
        textAlign: 'right',
        top: 0,
        transform: 'translateX(320px)',
        transition: `transform ${TRANSITION_LENGTH}ms ease-in-out`,
        width: 320,
        zIndex: 100,
      }}
    >
      <h3 sx={{ m: 0, textAlign: 'left' }}>Cart</h3>
      <CartItems items={checkout.lineItems} />
      <p>
        subtotal:{' '}
        {format(checkout.subtotalPriceV2.currencyCode)(
          checkout.subtotalPriceV2.amount,
        )}
      </p>
      <p>
        tax:{' '}
        {format(checkout.totalTaxV2.currencyCode)(checkout.totalTaxV2.amount)}
      </p>
      <p>
        total:{' '}
        {format(checkout.totalPriceV2.currencyCode)(
          checkout.totalPriceV2.amount,
        )}
      </p>
      <a
        href={checkout.webUrl}
        sx={{
          bg: 'teal',
          border: '2px solid',
          borderColor: 'teal',
          borderRadius: 6,
          color: 'white',
          fontSize: 2,
          fontWeight: 600,
          p: 2,
          textDecoration: 'none',
        }}
      >
        Check Out
      </a>
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
          cartRef.current.style.transform = 'translateX(320px)';
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

  if (state.matches('opening')) {
    return (
      <Fragment>
        <p>opening</p>
        <CartWrapper ref={cartRef} state={state.value} />
      </Fragment>
    );
  }

  if (state.matches('open')) {
    return (
      <Fragment>
        <p>
          <button onClick={() => send('CLOSE')}>CLOSE</button>
        </p>
        <CartWrapper ref={cartRef} state={state.value} />
      </Fragment>
    );
  }

  if (state.matches('closing')) {
    return (
      <Fragment>
        <p>closing</p>
        <CartWrapper ref={cartRef} state={state.value} />
      </Fragment>
    );
  }

  if (state.matches('closed')) {
    return (
      <Fragment>
        <p>
          <button onClick={() => send('OPEN')}>OPEN</button>
        </p>
        <CartWrapper ref={cartRef} state={state.value} />
      </Fragment>
    );
  }

  return null;
};

export default Cart;
