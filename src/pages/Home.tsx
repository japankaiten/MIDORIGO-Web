import { FaqList, InfoCard, Section } from '../components/Page';
import { appAspects, features, homeFaqs, marketplaceCategories, platformBoundaries } from '../content';

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-logo-lockup" aria-label="MIDORIGO ミドリゴ">
              <img src="/assets/midorigo-logo-white.png" alt="" width="58" height="58" />
              <div>
                <span>MIDORIGO</span>
                <span lang="ja">ミドリゴ</span>
              </div>
            </div>
            <p className="eyebrow">Circular economy platform for residents in Japan</p>
            <h1>Local access layer for circular communities.</h1>
            <p className="tagline">Trade locally, reuse more, and stay aligned with municipal waste rules.</p>
            <p>
              MIDORIGO connects local residents through second-hand listings, jobs, real estate, events, help requests,
              cars, and community trade. A municipality layer supports garbage calendars, AI item identification,
              disposal guidance, recycling facilities, and local issue reports.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#availability">
                App availability
              </a>
              <a className="button secondary" href="/support">
                Get support
              </a>
            </div>
          </div>
          <div className="phone-showcase" aria-label="MIDORIGO app preview">
            <div className="phone-frame">
              <div className="phone-status" />
              <div className="app-card primary-card">
                <span>Local marketplace</span>
                <strong>Dining table</strong>
                <small>Reuse before disposal</small>
              </div>
              <div className="scan-row">
                <div>
                  <span className="mini-label">Municipality layer</span>
                  <strong>Plastic bottles</strong>
                  <small>Pickup tomorrow</small>
                </div>
                <span className="scan-icon" aria-hidden="true">
                  M
                </span>
              </div>
              <div className="mini-list">
                <span>Jobs near you</span>
                <span>Events this week</span>
                <span>AI disposal check</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="What MIDORIGO helps with" className="surface-band">
        <div className="feature-grid">
          {features.map((feature) => (
            <InfoCard key={feature.title} title={feature.title} icon={feature.icon}>
              <p>{feature.text}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section title="Community marketplace categories">
        <div className="category-strip" aria-label="MIDORIGO marketplace categories">
          {marketplaceCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <p className="section-lead">
          MIDORIGO does not handle money or act as a payment provider. The app is a platform for posting, discovery,
          communication, and local coordination. Users are responsible for safe arrangements, legal compliance, and any
          trade terms they make with each other.
        </p>
      </Section>

      <Section title="How the platform fits together" className="surface-band">
        <div className="feature-grid">
          {appAspects.map((aspect) => (
            <InfoCard key={aspect.title} title={aspect.title} icon={aspect.icon}>
              <p>{aspect.text}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section title="Important platform boundaries">
        <ul className="boundary-list">
          {platformBoundaries.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="For residents in Japan">
        <div className="split-panel">
          <div>
            <p>
              MIDORIGO is designed for long-term residents, new movers, international residents, students, families,
              local workers, and community members who want practical neighborhood information in one place.
            </p>
            <p>
              The municipal layer helps with local disposal rules, AI-assisted item identification, pickup calendars,
              recycling facilities, and reports. The app is independent unless separately stated. Municipality websites,
              printed guides, and official contact points remain the final source for current garbage and recycling
              rules.
            </p>
          </div>
          <ul className="check-list">
            <li>Post reusable goods, jobs, homes, cars, events, and help requests</li>
            <li>Coordinate directly without MIDORIGO handling payment</li>
            <li>Save city or area settings</li>
            <li>Review bilingual municipal disposal guidance</li>
            <li>Report unclear listings or outdated waste information</li>
          </ul>
        </div>
      </Section>

      <Section title="Core app areas">
        <div className="screenshot-grid" aria-label="MIDORIGO core app areas">
          <div className="screenshot-card">
            <span>Marketplace</span>
            <strong>Second-hand goods and local posts</strong>
          </div>
          <div className="screenshot-card">
            <span>Municipality Layer</span>
            <strong>Garbage calendar and AI item checks</strong>
          </div>
          <div className="screenshot-card">
            <span>Community</span>
            <strong>Jobs, events, help, real estate, and cars</strong>
          </div>
        </div>
      </Section>

      <Section title="Coming soon" className="surface-band">
        <div id="availability" className="store-panel">
          {/* TODO: Replace placeholders with final App Store and Google Play URLs after store approval. */}
          <span className="store-badge">Coming soon on the App Store</span>
          <span className="store-badge">Coming soon on Google Play</span>
        </div>
      </Section>

      <Section title="FAQ">
        <FaqList items={homeFaqs} />
      </Section>
    </>
  );
}
