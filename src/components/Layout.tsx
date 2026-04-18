import { NavLink, Outlet } from 'react-router-dom';
import { APP_NAME, routes } from '../content';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="MIDORIGO home">
          <img className="brand-logo" src="/assets/midorigo-logo.png" alt="" width="34" height="34" />
          <span className="brand-text">
            <span>{APP_NAME}</span>
            <span lang="ja">ミドリゴ</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {routes.slice(1, 5).map((route) => (
            <NavLink key={route.href} to={route.href}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-main">
            <div className="footer-about">
              <a className="footer-brand" href="/">
                <img className="footer-logo" src="/assets/midorigo-logo.png" alt="" width="28" height="28" />
                <span className="brand-text">
                  <span>{APP_NAME}</span>
                  <span lang="ja">ミドリゴ</span>
                </span>
              </a>
              <p>
                Circular economy listings, local trade, neighborhood information, and municipality-oriented waste
                support for residents in Japan.
              </p>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <div>
                <h2>Legal and support</h2>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/support">Support</a>
                <a href="/contact">Contact</a>
              </div>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 MIDORIGO</span>
            <span>Independent platform unless separately stated.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
