import { FormEvent, useMemo, useState } from 'react';
import { PageHero, Section } from '../components/Page';
import { SUPPORT_EMAIL } from '../content';

const categories = [
  'App support',
  'Marketplace listing/report',
  'Data/privacy request',
  'Municipality/content correction',
  'Business/partner inquiry',
];

export function Contact() {
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`[MIDORIGO] ${category}`);
    const body = encodeURIComponent(`From: ${email}\nCategory: ${category}\n\n${message}`);
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [category, email, message]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with MIDORIGO"
        intro="Use the form to prepare an email to support. No backend is connected on this static website."
      />
      <Section>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea
                required
                rows={7}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what happened, your city or area if relevant, and the account email if different."
              />
            </label>
            <button className="button primary" type="submit">
              Open email
            </button>
          </form>
          <aside className="support-box">
            {/* TODO: Replace support email if the public support inbox changes. */}
            <h2>Support email</h2>
            <p>
              Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> for app support, privacy requests,
              municipality content corrections, and partner inquiries.
            </p>
            <p className="note">
              A production contact form backend can be added later. Until then, this form opens the user&apos;s email app.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
