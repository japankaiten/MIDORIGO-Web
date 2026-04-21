import { FaqList, PageHero, Section } from '../components/Page';
import { useLocale } from '../i18n';

export function Support() {
  const { t } = useLocale();
  const [before, after] = t.support.outro.split(t.common.supportEmail);

  return (
    <>
      <PageHero eyebrow={t.support.eyebrow} title={t.support.title} intro={t.support.intro} />
      <Section title={t.support.sectionTitle}>
        <FaqList items={t.support.faq} />
        <p className="support-note">
          {before}
          <a href={`mailto:${t.common.supportEmail}`}>{t.common.supportEmail}</a>
          {after}
        </p>
      </Section>
    </>
  );
}
