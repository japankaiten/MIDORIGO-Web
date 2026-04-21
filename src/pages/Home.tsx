import { FaqList, InfoCard, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function Home() {
  const { t } = useLocale();

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
              <a className="button primary" href="#availability">
                {t.home.ctaAvailability}
              </a>
              <a className="button secondary" href="/support">
                {t.home.ctaSupport}
              </a>
            </div>
          </div>
          <div className="phone-showcase" aria-label={t.home.previewLabel}>
            <div className="phone-frame">
              <div className="phone-status" />
              <div className="app-card primary-card">
                <span>{t.home.previewCardLabel}</span>
                <strong>{t.home.previewCardTitle}</strong>
                <small>{t.home.previewCardNote}</small>
              </div>
              <div className="scan-row">
                <div>
                  <span className="mini-label">{t.home.previewScanLabel}</span>
                  <strong>{t.home.previewScanTitle}</strong>
                  <small>{t.home.previewScanNote}</small>
                </div>
                <span className="scan-icon" aria-hidden="true">
                  M
                </span>
              </div>
              <div className="mini-list">
                {t.home.previewPills.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
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
          {t.home.appAreas.map((item) => (
            <div key={item.title} className="screenshot-card">
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.home.sections.comingSoon} className="surface-band">
        <div id="availability" className="store-panel">
          {/* TODO: Replace placeholders with final App Store and Google Play URLs after store approval. */}
          <span className="store-badge">{t.home.storeBadges.appStore}</span>
          <span className="store-badge">{t.home.storeBadges.playStore}</span>
        </div>
      </Section>

      <Section title={t.home.sections.faq}>
        <FaqList items={t.home.faq} />
      </Section>
    </>
  );
}
