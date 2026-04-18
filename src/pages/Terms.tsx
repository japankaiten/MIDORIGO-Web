import { InfoCard, PageHero, Section } from '../components/Page';
import { SUPPORT_EMAIL, legalPlaceholders } from '../content';

export function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="Rules for using MIDORIGO"
        intro="These terms explain the basic responsibilities for using MIDORIGO as a local circular economy platform with municipality-oriented waste support."
      />
      <Section>
        <InfoCard title="Terms details" tone="notice">
          <p>
            Effective date: {legalPlaceholders.effectiveDate}. Operator: {legalPlaceholders.operatorName}. Address:
            {legalPlaceholders.legalAddress}.
          </p>
        </InfoCard>

        <div className="legal-stack">
          <article>
            <h2>Eligibility and accounts</h2>
            <p>
              You must be able to use MIDORIGO lawfully in your location. MIDORIGO is not intended for children under
              13. If you are under the age of majority where you live, you should use marketplace, messaging, job, real
              estate, event, help request, and car-related features only with permission and supervision from a parent
              or legal guardian. You are responsible for the accuracy of your account information and for keeping your
              sign-in method secure.
            </p>
          </article>

          <article>
            <h2>Acceptable use</h2>
            <p>
              Do not misuse the app, interfere with service operation, upload harmful content, impersonate others,
              violate laws, harass users, or submit false reports. MIDORIGO may suspend or remove accounts, listings,
              messages, or reports that appear abusive, unsafe, illegal, or inconsistent with these terms.
            </p>
          </article>

          <article>
            <h2>Prohibited content and behavior</h2>
            <p>
              Do not post or promote illegal goods or services, weapons, controlled substances, stolen goods, recalled
              products, fraudulent offers, scams, sexual or exploitative content, human trafficking, hate or
              discriminatory content, threats, harassment, bullying, doxxing, malware, spam, or content that infringes
              another person&apos;s rights. MIDORIGO may use filtering, review, reporting, blocking, and moderation tools
              to reduce unsafe or objectionable content.
            </p>
          </article>

          <article>
            <h2>User-generated content</h2>
            <p>
              Users are responsible for the listings, messages, images, reports, and other content they submit. Content
              must be accurate enough not to mislead others and must not infringe rights, expose private information
              without permission, or promote unsafe, fraudulent, discriminatory, illegal, or abusive activity.
            </p>
          </article>

          <article>
            <h2>Community marketplace rules</h2>
            <p>
              Listings should describe goods, jobs, real estate, events, help requests, cars, and other supported
              categories honestly. Users are responsible for safe communication, lawful posts, handoff arrangements,
              and avoiding prohibited, dangerous, recalled, illegal, misleading, or restricted items and services.
            </p>
            <p>
              Job, real estate, vehicle, event, and help-request posts must follow applicable laws, licenses, permits,
              employment rules, housing rules, consumer protection rules, and platform listing requirements.
            </p>
          </article>

          <article>
            <h2>Waste guidance and municipality rules</h2>
            <p>
              MIDORIGO helps organize disposal information but does not guarantee that guidance is complete, current, or
              applicable to every building or neighborhood. Users should verify final disposal decisions with local
              municipality rules, official notices, or local contact points.
            </p>
            <p>No official municipality endorsement is implied unless separately stated by MIDORIGO and that authority.</p>
          </article>

          <article>
            <h2>AI-assisted results</h2>
            <p>
              AI-assisted item identification may be incomplete or incorrect. Users should treat scan results as a
              starting point, review the item condition and local rules, and verify uncertain disposal decisions with
              official municipal sources.
            </p>
          </article>

          <article>
            <h2>No payment handling</h2>
            <p>
              MIDORIGO is a platform for posting, discovery, communication, and local coordination. MIDORIGO does not
              process marketplace payments, hold funds, escrow trades, guarantee transactions, or act as a broker.
              Users are responsible for any trade terms, taxes, legal requirements, safety checks, and payment
              arrangements they make outside the app.
            </p>
          </article>

          <article>
            <h2>Reports and moderation</h2>
            <p>
              MIDORIGO may review reports, remove content, limit visibility, restrict accounts, or preserve records
              where needed for safety, abuse prevention, service integrity, legal compliance, or dispute review.
              Moderation actions may be taken without prior notice when necessary.
            </p>
            <p>
              Users should be able to report objectionable listings, messages, and users from within the app where those
              features are available. MIDORIGO aims to review safety reports and take appropriate action in a timely
              manner.
            </p>
          </article>

          <article>
            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent allowed by law, MIDORIGO is not liable for indirect, incidental, special,
              consequential, or punitive damages, or for losses caused by reliance on incomplete local disposal
              information, user-generated marketplace content, user-arranged trades, service interruption, or
              third-party services.
            </p>
          </article>

          <article>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
