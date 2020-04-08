/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Header from './header';

// TODO make this use Gatsby stuff
import './layout.css';

const Layout = ({ children, home = false }) => (
  <Fragment>
    <Header />
    <div className="looney">
      <main className={home ? 'home' : ''}>{children}</main>
      <aside className="contributors">
        <div className="contributor-container">
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/jlengstorf.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/rafaelconde.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/tzmanics.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/philhawksworth.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/sdras.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/shortdiv.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/marisamorby.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/amarilisd.png?size=200"
              alt="contributor avatar"
            />
          </a>
          <a href="#link" className="contributor-avatar">
            <img
              src="https://github.com/ikristy.png?size=200"
              alt="contributor avatar"
            />
          </a>
        </div>
      </aside>
    </div>
    <footer>
      <h3>Credits Go Here</h3>
    </footer>
  </Fragment>
);

export default Layout;
