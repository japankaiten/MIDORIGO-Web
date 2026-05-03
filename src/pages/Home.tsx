import { Link } from 'react-router-dom';
import { FaqList, InfoCard, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function Home() {
  const { t } = useLocale();
  const coreAreaImages = [
    {
      src: '/assets/homepage/Second-hand%20goods%20and%20local%20posts.webp',
      alt: 'Second-hand goods and local posts',
    },
    {
      src: '/assets/homepage/Garbage%20calendar%20and%20AI%20item%20checks.webp',
      alt: 'Garbage calendar and AI item checks',
    },
    {
      src: '/assets/homepage/bulletin.webp',
      alt: 'Jobs, events, help, real estate, and cars',
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-logo-lockup" aria-label="MIDORIGO ミドリゴ">
              <img src="/assets/midorigo-logo-white.png" alt="" width="58" height="58" />
              <div>
                <span>MIDORIGO</span>
                <span lang="ja">{t.common.appNameJa}</span>
              </div>
            </div>
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1>{t.home.title}</h1>
            <p className="tagline">{t.home.tagline}</p>
            <p>{t.home.intro}</p>
            <div className="hero-actions">
              <Link className="button primary" to="/early-access">
                {t.home.ctaAvailability}
              </Link>
            </div>
          </div>
          <div className="hero-image-showcase" aria-label={t.home.previewLabel}>
            <img
              className="hero-image"
              src="/assets/midorigoweb-hero-image.png"
              alt={t.home.previewLabel}
              width="900"
              height="900"
            />
          </div>
        </div>
      </section>

      <Section title={t.home.sections.features} className="surface-band">
        <div className="feature-grid">
          {t.home.features.map((feature) => (
            <InfoCard key={feature.title} title={feature.title} icon={feature.icon}>
              <p>{feature.text}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section title={t.home.sections.marketplace}>
        <div className="category-strip" aria-label="MIDORIGO marketplace categories">
          {t.home.marketplaceCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <p className="section-lead">{t.home.marketplaceLead}</p>
      </Section>

      <Section title={t.home.sections.platform} className="surface-band">
        <div className="feature-grid">
          {t.home.appAspects.map((aspect) => (
            <InfoCard key={aspect.title} title={aspect.title} icon={aspect.icon}>
              <p>{aspect.text}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section title={t.home.sections.boundaries}>
        <ul className="boundary-list">
          {t.home.platformBoundaries.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={t.home.sections.residents}>
        <div className="split-panel">
          <div>
            {t.home.residentsParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="check-list">
            {t.home.residentsChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title={t.home.sections.coreAreas}>
        <div className="screenshot-grid" aria-label="MIDORIGO core app areas">
          {t.home.appAreas.map((item, index) => (
            <div key={item.title} className="screenshot-card">
              <div className="screenshot-visual">
                <img
                  src={coreAreaImages[index]?.src}
                  alt={coreAreaImages[index]?.alt ?? item.title}
                  loading="lazy"
                />
                <div className="screenshot-overlay" aria-hidden="true" />
              </div>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.home.sections.faq}>
        <FaqList items={t.home.faq} />
      </Section>
    </>
  );
}
