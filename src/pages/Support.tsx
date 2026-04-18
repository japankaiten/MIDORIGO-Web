import { FaqList, PageHero, Section } from '../components/Page';
import { SUPPORT_EMAIL, supportFaqs } from '../content';

export function Support() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Help using MIDORIGO"
        intro="Find quick answers for marketplace listings, language settings, location setup, camera access, notifications, account help, and reporting incorrect information."
      />
      <Section title="Troubleshooting">
        <FaqList items={supportFaqs} />
        <p className="support-note">
          Need more help? Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and include your device,
          app version if available, selected city or area, and a short description of the issue.
        </p>
      </Section>
    </>
  );
}
