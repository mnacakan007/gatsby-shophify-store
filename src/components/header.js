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
        px: '5vw',
        py: 4,
      }}
    >
      <Link to="/">
        <img src={logo} alt="Netlify Swag" />
      </Link>
      <Cart />
    </header>
  );
};

export default Header;
