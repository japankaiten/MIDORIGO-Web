import { InfoCard, PageHero, Section } from '../components/Page';
import { SUPPORT_EMAIL } from '../content';

export function DeleteAccount() {
  return (
    <>
      <PageHero
        eyebrow="Account and data deletion"
        title="Request deletion of your MIDORIGO account"
        intro="You can request account deletion by email. This page explains what to include and what data may be deleted, anonymized, or retained where required."
      />
      <Section>
        <div className="legal-stack">
          <InfoCard title="How to request deletion">
            <ol>
              <li>Email <a href={`mailto:${SUPPORT_EMAIL}?subject=Account%20deletion%20request`}>{SUPPORT_EMAIL}</a> from your account email.</li>
              <li>Use the subject line: Account deletion request.</li>
              <li>Include your user ID if it is available in the app.</li>
            </ol>
          </InfoCard>

          <article>
            <h2>What is deleted or anonymized</h2>
            <p>
              Account profile information, saved location setup, notification preferences, uploaded images, reports,
              second-hand listings, jobs, real estate posts, event posts, help requests, car listings, messages, and
              related user content may be deleted or anonymized where technically and legally possible.
            </p>
          </article>

          <article>
            <h2>What may be retained</h2>
            <p>
              Some records may be retained where required for legal, security, fraud prevention, abuse prevention,
              dispute handling, backup, or operational reasons. Retained records will be limited to what is necessary
              for those purposes. MIDORIGO does not process marketplace payments.
            </p>
          </article>

          <article>
            <h2>Timing</h2>
            <p>
              MIDORIGO will review deletion requests and may ask for verification before processing. You will receive a
              response at the account email when the request has been reviewed.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
