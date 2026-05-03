import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function Contact() {
  const { t, language } = useLocale();
  const [category, setCategory] = useState(t.contact.categories[0]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCategory(t.contact.categories[0]);
  }, [language, t.contact.categories]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!categoryRef.current?.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`[MIDORIGO] ${category}`);
    const body = encodeURIComponent(`From: ${email}\nCategory: ${category}\n\n${message}`);
    return `mailto:${t.common.supportEmail}?subject=${subject}&body=${body}`;
  }, [category, email, message, t.common.supportEmail]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
  }

  const [before, after] = t.contact.supportBody.split(t.common.supportEmail);

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />
      <Section>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {t.contact.emailLabel}
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.contact.emailPlaceholder}
              />
            </label>
            <div className="contact-field">
              <span className="contact-field-label">{t.contact.categoryLabel}</span>
              <div className="custom-select" ref={categoryRef}>
                <button
                  className={`custom-select-trigger${isCategoryOpen ? ' open' : ''}`}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isCategoryOpen}
                  onClick={() => setIsCategoryOpen((current) => !current)}
                >
                  <span>{category}</span>
                  <span className="custom-select-caret" aria-hidden="true">
                    ▾
                  </span>
                </button>
                {isCategoryOpen ? (
                  <div className="custom-select-menu" role="listbox" aria-label={t.contact.categoryLabel}>
                    {t.contact.categories.map((item) => (
                      <button
                        key={item}
                        className={`custom-select-option${item === category ? ' active' : ''}`}
                        type="button"
                        role="option"
                        aria-selected={item === category}
                        onClick={() => {
                          setCategory(item);
                          setIsCategoryOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <label>
              {t.contact.messageLabel}
              <textarea
                required
                rows={7}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t.contact.messagePlaceholder}
              />
            </label>
            <button className="button primary" type="submit">
              {t.contact.submit}
            </button>
          </form>
          <aside className="support-box">
            <h2>{t.contact.supportTitle}</h2>
            <p>
              {before}
              <a href={`mailto:${t.common.supportEmail}`}>{t.common.supportEmail}</a>
              {after}
            </p>
            <h3>{t.contact.companyDetailsTitle}</h3>
            <p>{t.common.operator}</p>
            <p>{`法人番号 / Corporate number: ${t.common.corporateNumber}`}</p>
            <p>{t.common.address}</p>
            <p>{`TEL: ${t.common.phone}`}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
