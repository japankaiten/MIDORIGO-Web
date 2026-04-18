import { InfoCard, PageHero, Section } from '../components/Page';
import { SUPPORT_EMAIL, legalPlaceholders } from '../content';

export function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="How MIDORIGO handles data"
        intro="This policy explains the information MIDORIGO may collect to provide local circular economy listings, community communication, and municipality-oriented waste support."
      />
      <Section>
        <InfoCard title="Policy details" tone="notice">
          <p>
            Effective date: {legalPlaceholders.effectiveDate}. Operator: {legalPlaceholders.operatorName}.
          </p>
        </InfoCard>

        <div className="legal-stack">
          <article>
            <h2>Information we may collect</h2>
            <p>MIDORIGO may collect account email and profile information when you create or manage an account.</p>
            <p>
              We may collect selected city, ward, town, area, location setup data, and approximate location signals
              when you choose to use local discovery, facility search, pickup calendar, or disposal guidance features.
            </p>
            <p>
              If you use AI item identification, second-hand listings, jobs, real estate, events, help requests, cars,
              reports, or similar features, we may collect uploaded images and related text you choose to submit.
            </p>
            <p>
              Community listing, chat, report, and moderation content may be collected where those features are
              available. MIDORIGO does not process payments, but users may include trade details in listing or message
              content.
            </p>
            <p>
              Camera, photo library, notification, and location permissions may be requested by the app only when needed
              for features such as item scanning, listing photos, pickup reminders, local discovery, or facility search.
            </p>
            <p>
              Analytics, diagnostics, device information, notification preferences, and notification tokens may be
              collected to operate, secure, and improve the app.
            </p>
          </article>

          <article>
            <h2>How information is used</h2>
            <p>
              We use information to provide accounts, local setup, circular economy listings, community communication,
              pickup reminders, AI-assisted item guidance, recycling search, issue reporting, customer support, safety
              moderation, analytics, diagnostics, fraud prevention, and legal compliance.
            </p>
            <p>
              Location-related setup is used to personalize app content. MIDORIGO does not replace official local
              municipality rules.
            </p>
            <p>
              Images and text submitted for scanning may be used to return disposal suggestions, improve safety and
              diagnostics, investigate reports, and support moderation where permitted by law and app settings.
            </p>
          </article>

          <article>
            <h2>Third-party services</h2>
            <p>
              MIDORIGO may use Supabase for authentication, database, and storage. Expo or notification services may be
              used for push notifications. Mapping or location providers may be used when location or facility search
              features are available. No payment provider is listed here because MIDORIGO does not handle money,
              process marketplace payments, or hold funds.
            </p>
            <p>
              These providers process information according to their own terms and privacy policies. The provider list
              may be updated when MIDORIGO adds, removes, or changes service providers.
            </p>
          </article>

          <article>
            <h2>Sharing and processors</h2>
            <p>
              We may share information with service providers that help operate MIDORIGO, including hosting,
              authentication, storage, notifications, analytics, diagnostics, maps, customer support, security, and
              moderation tools. These providers are expected to process information for the services they provide to us.
            </p>
            <p>
              We may also disclose information when required by law, to protect users and the service, to investigate
              abuse or fraud, to respond to valid legal requests, or as part of a business transfer permitted by law.
            </p>
          </article>

          <article>
            <h2>Security</h2>
            <p>
              MIDORIGO uses reasonable administrative, technical, and organizational measures designed to protect user
              information against unauthorized access, loss, misuse, alteration, or disclosure. No online service can
              guarantee absolute security, so users should also protect their account credentials and use caution when
              sharing information in listings or messages.
            </p>
          </article>

          <article>
            <h2>User-generated content and visibility</h2>
            <p>
              Listings, events, jobs, real estate posts, help requests, car posts, profile details, and related messages
              may be visible to other users depending on the feature used and the settings available in the app.
            </p>
            <p>
              Reports and moderation records may be reviewed to protect users, enforce rules, prevent abuse, respond to
              legal requests, and maintain service integrity.
            </p>
          </article>

          <article>
            <h2>Retention, deletion, and contact</h2>
            <p>
              We keep information only as long as needed for the purposes described in this policy, unless a longer
              period is required for legal, security, dispute, moderation, or operational reasons.
            </p>
            <p>
              You may request access, correction, or deletion of your account information. Account deletion instructions
              are available at <a href="/delete-account">/delete-account</a>. Some records may be retained where
              required for legal, security, fraud prevention, abuse prevention, dispute handling, backup, or operational
              reasons.
            </p>
            <p>
              To request access, correction, deletion, or privacy support, contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </article>

          <article>
            <h2>Children</h2>
            <p>
              MIDORIGO is not intended for children under 13. Users who are under the age of majority in their location
              should use the app only with permission and supervision from a parent or legal guardian, especially for
              listings, messages, trades, jobs, real estate, events, help requests, and car-related posts.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
