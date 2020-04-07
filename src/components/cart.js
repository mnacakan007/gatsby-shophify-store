/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import { Fragment, forwardRef, useRef, useCallback } from 'react';

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

const CartWrapper = forwardRef(({ state }, ref) => (
  <div
    ref={ref}
    sx={{
      bg: 'white',
      color: 'text',
      display: 'block',
      height: '100vh',
      position: 'absolute',
      right: 0,
      top: 0,
      transform: 'translateX(300px)',
      transition: `transform ${TRANSITION_LENGTH}ms ease-in-out`,
      width: 300,
      zIndex: 100,
    }}
  >
    Cart! {state}
  </div>
));

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
          cartRef.current.style.transform = 'translateX(300px)';
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
          open <button onClick={() => send('CLOSE')}>CLOSE</button>
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
          closed <button onClick={() => send('OPEN')}>OPEN</button>
        </p>
        <CartWrapper ref={cartRef} state={state.value} />
      </Fragment>
    );
  }

  return null;
};

export default Cart;
