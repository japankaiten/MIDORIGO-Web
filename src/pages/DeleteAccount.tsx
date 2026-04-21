import { InfoCard, PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function DeleteAccount() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.deleteAccount.eyebrow}
        title={t.deleteAccount.title}
        intro={t.deleteAccount.intro}
      />
      <Section>
        <div className="legal-stack">
          <InfoCard title={t.deleteAccount.requestTitle}>
            <ol>
              {t.deleteAccount.requestSteps.map((step) => {
                if (!step.includes(t.common.supportEmail)) {
                  return <li key={step}>{step}</li>;
                }

                const [before, after] = step.split(t.common.supportEmail);
                return (
                  <li key={step}>
                    {before}
                    <a href={`mailto:${t.common.supportEmail}?subject=Account%20deletion%20request`}>{t.common.supportEmail}</a>
                    {after}
                  </li>
                );
              })}
            </ol>
          </InfoCard>

          {t.deleteAccount.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
