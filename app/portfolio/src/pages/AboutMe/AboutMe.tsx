import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './AboutMe.module.css';

const SKILLS_WELL_KNOWN_KEYS = [
  'skills.wellKnown.react',
  'skills.wellKnown.typescript',
  'skills.wellKnown.javascript',
  'skills.wellKnown.reactTestingLibrary',
  'skills.wellKnown.redux',
  'skills.wellKnown.html',
  'skills.wellKnown.css',
  'skills.wellKnown.git',
] as const satisfies readonly MessageKey[];

const SKILLS_WORKED_ON_KEYS = [
  'skills.workedOn.java',
  'skills.workedOn.springBoot',
  'skills.workedOn.lambda',
  'skills.workedOn.solidjs',
  'skills.workedOn.dynamodb',
  'skills.workedOn.cicd',
  'skills.workedOn.more',
] as const satisfies readonly MessageKey[];

function SkillTagList({
  keys,
  ariaLabel,
  delayOffset,
}: {
  keys: readonly MessageKey[];
  ariaLabel: MessageKey;
  delayOffset: number;
}) {
  const { t } = useI18n();

  return (
    <ul className={styles.tags} aria-label={t(ariaLabel)}>
      {keys.map((key, index) => (
        <li
          key={key}
          className={styles.tag}
          style={{ animationDelay: `${(delayOffset + index) * 55}ms` }}
        >
          {t(key)}
        </li>
      ))}
    </ul>
  );
}

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

      <div
        className={styles.skills}
        role="region"
        aria-labelledby="about-skills-title"
      >
        <h2 id="about-skills-title" className={styles.skillsTitle}>
          {t('about.skillsTitle')}
        </h2>
        <div className={styles.skillGroup}>
          <h3
            id="about-skills-well-known"
            className={styles.skillGroupTitle}
          >
            {t('about.skillsWellKnownHeading')}
          </h3>
          <SkillTagList
            keys={SKILLS_WELL_KNOWN_KEYS}
            ariaLabel="a11y.skillsWellKnown"
            delayOffset={0}
          />
        </div>
        <div className={styles.skillGroup}>
          <h3 id="about-skills-worked-on" className={styles.skillGroupTitle}>
            {t('about.skillsWorkedOnHeading')}
          </h3>
          <SkillTagList
            keys={SKILLS_WORKED_ON_KEYS}
            ariaLabel="a11y.skillsWorkedOn"
            delayOffset={SKILLS_WELL_KNOWN_KEYS.length}
          />
        </div>
      </div>
    </section>
  );
}