/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Header from './header';

// TODO make this use Gatsby stuff
import './layout.css';
import { Link } from 'gatsby';

const contributors = [
  'jlengstorf',
  'rafaelconde',
  'tzmanics',
  'philhawksworth',
  'sdras',
  'shortdiv',
  'marisamorby',
  'amarilisd',
  'ikristy',
];

const Layout = ({ children, home = false }) => (
  <Fragment>
    <Header />
    <div className="looney">
      <main className={home ? 'home' : ''}>{children}</main>
      <aside className="contributors">
        <div className="contributor-container">
          {contributors.map((contributor) => (
            <a
              href={`https://github.com/${contributor}`}
              className="contributor-avatar"
              key={contributor}
            >
              <img
                src={`https://github.com/${contributor}.png?size=200`}
                alt={contributor}
                sx={{
                  borderRadius: '50%',
                  display: 'block',
                  maxWidth: '100%',
                  width: '100%',
                }}
              />
            </a>
          ))}
        </div>
        <p
          sx={{
            position: 'absolute',
            bottom: '39%',
            color: 'white',
            left: 0,
            px: 'calc(50vw - 120px)',
            textAlign: 'center',
            textShadow: '0 1px 0 black',
            width: '100%',
          }}
        >
          built by a bunch of wonderful people and one total weirdo
        </p>
      </aside>
    </div>
    <footer
      sx={{
        alignItems: 'center',
        background: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        paddingBottom: '10rem',
        h4: {
          fontSize: 2,
          mb: 3,
        },
        a: {
          color: 'inherit',
          fontSize: 0,
          mb: 6,
        },
      }}
    >
      <h4>Most Clicked Link in the Footer</h4>
      <Link to="/shipping-returns">Shipping & Returns</Link>

      <h4>Click This Link to Keep Us Safe</h4>
      <a href="https://community-docs.netlify.com/code-of-conduct.html">
        Community Code of Conduct
      </a>

      <h4>Executive Producer</h4>
      <a href="https://www.netlify.com/">Netlify</a>

      <h4>Starring</h4>
      <a
        href="https://github.com/netlify/swag-site/graphs/contributors"
        sx={{ '&&': { mb: 3 } }}
      >
        Contributors
      </a>
      <a href="https://github.com/netlify/swag-site">You?</a>
    </footer>
  </Fragment>
);

export default Layout;
