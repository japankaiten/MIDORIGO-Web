import { InfoCard, PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

function renderParagraph(paragraph: string) {
  if (paragraph.includes('/delete-account')) {
    const [before, after] = paragraph.split('/delete-account');
    return (
      <>
        {before}
        <a href="/delete-account">/delete-account</a>
        {after}
      </>
    );
  }

  if (paragraph.includes('japankaiten@gmail.com')) {
    const [before, after] = paragraph.split('japankaiten@gmail.com');
    return (
      <>
        {before}
        <a href="mailto:japankaiten@gmail.com">japankaiten@gmail.com</a>
        {after}
      </>
    );
  }

  return paragraph;
}

export function Privacy() {
  const { t } = useLocale();

  return (
    <>
      <PageHero eyebrow={t.privacy.eyebrow} title={t.privacy.title} intro={t.privacy.intro} />
      <Section>
        <InfoCard title={t.common.policyDetails} tone="notice">
          <p>{`Effective date: ${t.common.effectiveDate}. Operator: ${t.common.operator}.`}</p>
          <p>{`Corporate number: ${t.common.corporateNumber}.`}</p>
          <p>{`Address: ${t.common.address}.`}</p>
          <p>{`Phone: ${t.common.phone}.`}</p>
        </InfoCard>

        <div className="legal-stack">
          {t.privacy.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
