import { InfoCard, PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

function renderParagraph(paragraph: string) {
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

export function Terms() {
  const { t } = useLocale();

  return (
    <>
      <PageHero eyebrow={t.terms.eyebrow} title={t.terms.title} intro={t.terms.intro} />
      <Section>
        <InfoCard title={t.common.termsDetails} tone="notice">
          <p>{`Effective date: ${t.common.effectiveDate}. Operator: ${t.common.operator}.`}</p>
          <p>{`Corporate number: ${t.common.corporateNumber}.`}</p>
          <p>{`Address: ${t.common.address}.`}</p>
          <p>{`Phone: ${t.common.phone}.`}</p>
        </InfoCard>

        <div className="legal-stack">
          {t.terms.sections.map((section) => (
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
