import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { APP_NAME, routes } from '../content';
import { languages, useLocale } from '../i18n';

const languageFlags: Record<string, string> = {
  en: 'GB',
  ja: 'JP',
  ko: 'KR',
  zh: 'CN',
  id: 'ID',
  hi: 'IN',
  my: 'MM',
  vi: 'VN',
  es: 'ES',
};

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
}

export function Layout() {
  const { language, setLanguage, t } = useLocale();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const localizedRoutes = [
    { ...routes[0], label: t.routes.home },
    { ...routes[1], label: t.routes.privacy },
    { ...routes[2], label: t.routes.terms },
    { ...routes[3], label: t.routes.contact },
    { ...routes[4], label: t.routes.support },
    { ...routes[5], label: t.routes.deleteAccount },
  ];
  const mobileMenuLinks = [
    { href: '/early-access', label: t.home.ctaAvailability },
    ...localizedRoutes.slice(1, 5).map((route) => ({ href: route.href, label: route.label })),
  ];

  useEffect(() => {
    document.body.style.overflow = isLanguageOpen || isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLanguageOpen, isMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 621px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="MIDORIGO home">
          <img className="brand-logo" src="/assets/midorigo-logo.png" alt="" width="34" height="34" />
          <span className="brand-text">
            <span>{APP_NAME}</span>
            <span lang="ja">{t.common.appNameJa}</span>
          </span>
        </a>
        <div className="header-actions">
          <nav className="site-nav" aria-label="Primary navigation">
            {localizedRoutes.slice(1, 5).map((route) => (
              <NavLink key={route.href} to={route.href}>
                {route.label}
              </NavLink>
            ))}
          </nav>
          <button
            className={`menu-trigger${isMenuOpen ? ' open' : ''}`}
            type="button"
            aria-label={t.common.menu ?? 'Menu'}
            aria-controls="mobile-site-menu"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsLanguageOpen(false);
              setIsMenuOpen((current) => !current);
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <button
            className="language-trigger"
            type="button"
            aria-label={t.common.language}
            aria-expanded={isLanguageOpen}
            onClick={() => {
              setIsMenuOpen(false);
              setIsLanguageOpen(true);
            }}
          >
            <span className="flag-badge" aria-hidden="true">
              {countryFlag(languageFlags[language])}
            </span>
          </button>
        </div>
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
                  <span lang="ja">{t.common.appNameJa}</span>
                </span>
              </a>
              <p>{t.common.footerAbout}</p>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <div>
                <h2>{t.common.legalAndSupport}</h2>
                <a href="/privacy">{t.routes.privacy}</a>
                <a href="/terms">{t.routes.terms}</a>
                <a href="/support">{t.routes.support}</a>
                <a href="/contact">{t.routes.contact}</a>
              </div>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>{t.common.copyright}</span>
            <span>{t.common.independent}</span>
          </div>
        </div>
      </footer>

      {isLanguageOpen ? (
        <div className="language-overlay" role="dialog" aria-modal="true" aria-label={t.common.language}>
          <div className="language-modal">
            <div className="language-modal-header">
              <h2>{t.common.language}</h2>
              <button className="language-close" type="button" onClick={() => setIsLanguageOpen(false)}>
                ×
              </button>
            </div>
            <div className="language-list">
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={`language-option${language === item.code ? ' active' : ''}`}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setIsLanguageOpen(false);
                  }}
                >
                  <span className="flag-badge" aria-hidden="true">
                    {countryFlag(languageFlags[item.code])}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`mobile-menu-overlay${isMenuOpen ? ' open' : ''}`}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          id="mobile-site-menu"
          className={`mobile-menu-panel${isMenuOpen ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={t.common.menu ?? 'Menu'}
          onClick={(event) => event.stopPropagation()}
        >
          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            {mobileMenuLinks.map((route) => (
              <NavLink key={route.href} to={route.href} onClick={() => setIsMenuOpen(false)}>
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
