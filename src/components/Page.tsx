import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro: string;
};

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container narrow">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container">
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

export function InfoCard({
  title,
  children,
  icon,
  tone = 'default',
}: {
  title: string;
  children: ReactNode;
  icon?: IconName;
  tone?: 'default' | 'notice';
}) {
  return (
    <article className={`info-card ${tone}`}>
      <div className="card-heading">
        {icon ? (
          <span className="icon-box">
            <Icon name={icon} />
          </span>
        ) : null}
        <h3>{title}</h3>
      </div>
      <div>{children}</div>
    </article>
  );
}

export function FaqList({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
