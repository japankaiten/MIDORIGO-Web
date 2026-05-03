import { FormEvent, useEffect, useMemo, useState } from 'react';
import { PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function Contact() {
  const { t, language } = useLocale();
  const [category, setCategory] = useState(t.contact.categories[0]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setCategory(t.contact.categories[0]);
  }, [language, t.contact.categories]);

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
            <label>
              {t.contact.categoryLabel}
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {t.contact.categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
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
