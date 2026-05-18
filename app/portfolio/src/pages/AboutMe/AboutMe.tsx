import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './AboutMe.module.css';

const SKILL_KEYS = [
  'skills.typescript',
  'skills.react',
  'skills.nodejs',
  'skills.systemDesign',
  'skills.graphql',
  'skills.restApis',
  'skills.cicd',
  'skills.nxMonorepo',
  'skills.testing',
  'skills.performance',
] as const satisfies readonly MessageKey[];

export default function AboutMe() {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-labelledby="about-heading">
      <SectionHeader
        titleId="about-heading"
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        lead={t('about.lead')}
      />

      <div className={styles.displayLine} aria-hidden="true">
        <span className={styles.displayLineInner} />
      </div>

      <p className={styles.bio}>{t('about.bio')}</p>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{t('about.stats.impact')}</dt>
          <dd className={styles.statValue}>{t('about.stats.impactVal')}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{t('about.stats.focus')}</dt>
          <dd className={styles.statValue}>{t('about.stats.focusVal')}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{t('about.stats.style')}</dt>
          <dd className={styles.statValue}>{t('about.stats.styleVal')}</dd>
        </div>
      </dl>

      <div className={styles.skills}>
        <h2 className={styles.skillsTitle}>{t('about.skillsTitle')}</h2>
        <ul className={styles.tags} aria-label={t('a11y.skillsList')}>
          {SKILL_KEYS.map((key, index) => (
            <li
              key={key}
              className={styles.tag}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
