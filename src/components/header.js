/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Cart from './cart';
import logo from '../assets/netlify-swag-logo.svg';

const Header = () => {
  return (
    <header
      sx={{
        bg: 'background',
        display: 'flex',
        m: 0,
        width: '100vw',
        overflow: 'hidden',
        position: 'sticky',
        pb: '2px',
        pt: 12,
        px: '5vw',
        top: 0,
        zIndex: 900,
      }}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Netlify Swag"
          sx={{
            maxWidth: 180,
          }}
        />
      </Link>
      <Cart />
    </header>
  );
};

export default Header;
