/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import { Fragment, forwardRef, useRef, useCallback } from 'react';
import CartIcon from '../assets/cart-dark.svg';
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
    <button
      onClick={handleClick}
      sx={{
        bg: 'white',
        border: 'none',
        borderRadius: 20,
        color: 'link',
        fontSize: 2,
        fontWeight: 600,
        height: 40,
        position: 'fixed',
        px: 3,
        right: 4,
        top: 2,
        zIndex: 1000,
      }}
    >
      <img src={CartIcon} alt="" sx={{ mr: 2 }} />
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
              gridTemplateColumns: '35px 1fr 70px 20px',
              py: 2,
              px: 1,
              ':first-of-type': {
                borderTop: 'none',
              },
              textAlign: 'left',
              ':hover button': {
                opacity: 1,
              },
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
              <p sx={{ fontSize: 0, fontWeight: 300, m: 0 }}></p>
            </div>
            <div>
              <p sx={{ fontSize: 1, m: 0, textAlign: 'right' }}>{subtotal}</p>
            </div>
            <div
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => removeItemFromCart(item.id)}
                title="Remove this item from your cart"
                sx={{
                  border: 0,
                  background: 'transparent',
                  color: 'link',
                  fontSize: 1,
                  opacity: 0.25,
                  transition: 'opacity 200ms linear',
                }}
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
        overflowY: 'scroll',
        pb: 3,
        pt: 5,
        px: 2,
        position: 'fixed',
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
      {checkout.lineItems.length < 1 ? (
        <p sx={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <Fragment>
          <CartItems items={checkout.lineItems} />
          <ul
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              pr: '30px',
              li: {
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: '1fr 100px',
                fontSize: 0,
                fontWeight: 200,
                m: 0,
              },
            }}
          >
            <li>
              <span>Subtotal:</span>
              <span>
                {format(checkout.subtotalPriceV2.currencyCode)(
                  checkout.subtotalPriceV2.amount,
                )}
              </span>
            </li>
            <li>
              <span>Tax:</span>
              <span>
                {format(checkout.totalTaxV2.currencyCode)(
                  checkout.totalTaxV2.amount,
                )}
              </span>
            </li>
            <li>
              <span sx={{ fontSize: 2, fontWeight: 600, m: 0, pt: 1 }}>
                Total:
              </span>
              <span sx={{ fontSize: 2, fontWeight: 600, m: 0, pt: 1 }}>
                {format(checkout.totalPriceV2.currencyCode)(
                  checkout.totalPriceV2.amount,
                )}
              </span>
            </li>
          </ul>
          <a
            href={checkout.webUrl}
            sx={{
              bg: 'teal',
              border: '2px solid',
              borderColor: 'teal',
              borderRadius: 6,
              color: 'white',
              display: 'inline-block',
              fontSize: 2,
              fontWeight: 600,
              mt: 3,
              mr: 20,
              p: 2,
              textDecoration: 'none',
            }}
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

  return (
    <Fragment>
      <CartButton state={state} send={send} />
      <CartWrapper ref={cartRef} state={state.value} />
    </Fragment>
  );

  // if (state.matches('opening')) {
  //   return (
  //     <Fragment>
  //       <p>opening</p>
  //       <CartWrapper ref={cartRef} state={state.value} />
  //     </Fragment>
  //   );
  // }

  // if (state.matches('open')) {
  //   return (
  //     <Fragment>
  //       <p>
  //         <button onClick={() => send('CLOSE')}>CLOSE</button>
  //       </p>
  //       <CartWrapper ref={cartRef} state={state.value} />
  //     </Fragment>
  //   );
  // }

  // if (state.matches('closing')) {
  //   return (
  //     <Fragment>
  //       <p>closing</p>
  //       <CartWrapper ref={cartRef} state={state.value} />
  //     </Fragment>
  //   );
  // }

  // if (state.matches('closed')) {
  //   return (
  //     <Fragment>
  //       <p>
  //         <button onClick={() => send('OPEN')}>OPEN</button>
  //       </p>
  //       <CartWrapper ref={cartRef} state={state.value} />
  //     </Fragment>
  //   );
  // }

  // return null;
};

export default Cart;
