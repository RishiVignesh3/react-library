import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './Companies.module.css';

interface WorkRow {
  readonly id: string;
  readonly companyKey: MessageKey;
  readonly roleKey: MessageKey;
  readonly descriptionKey: MessageKey;
  readonly period: PeriodSpec;
}

type PeriodSpec =
  | { readonly kind: 'range'; readonly startKey: MessageKey; readonly endKey: MessageKey }
  | { readonly kind: 'toPresent'; readonly startKey: MessageKey };

const WORK: readonly WorkRow[] = [
  {
    id: 'company-a',
    companyKey: 'companies.acme.company',
    roleKey: 'companies.acme.role',
    descriptionKey: 'companies.acme.description',
    period: {
      kind: 'toPresent',
      startKey: 'companies.acme.periodStart',
    },
  },
  {
    id: 'company-b',
    companyKey: 'companies.buildit.company',
    roleKey: 'companies.buildit.role',
    descriptionKey: 'companies.buildit.description',
    period: {
      kind: 'range',
      startKey: 'companies.buildit.periodStart',
      endKey: 'companies.buildit.periodEnd',
    },
  },
  {
    id: 'company-c',
    companyKey: 'companies.startup.company',
    roleKey: 'companies.startup.role',
    descriptionKey: 'companies.startup.description',
    period: {
      kind: 'range',
      startKey: 'companies.startup.periodStart',
      endKey: 'companies.startup.periodEnd',
    },
  },
] as const;

export default function Companies() {
  const { t } = useI18n();

  function formatPeriod(spec: PeriodSpec): string {
    if (spec.kind === 'toPresent') {
      return `${t(spec.startKey)} — ${t('companies.present')}`;
    }
    return `${t(spec.startKey)} — ${t(spec.endKey)}`;
  }

  return (
    <section className={styles.page} aria-labelledby="companies-heading">
      <SectionHeader
        titleId="companies-heading"
        eyebrow={t('companies.eyebrow')}
        title={t('companies.title')}
        lead={t('companies.lead')}
      />

      <ol className={styles.timeline} aria-label={t('a11y.workHistory')}>
        {WORK.map(({ id, companyKey, roleKey, descriptionKey, period }, index) => (
          <li
            key={id}
            className={styles.entry}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={styles.card}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.cardInner}>
                <div className={styles.meta}>
                  <div className={styles.titles}>
                    <span className={styles.company}>{t(companyKey)}</span>
                    <span className={styles.role}>{t(roleKey)}</span>
                  </div>
                  <span className={styles.period}>{formatPeriod(period)}</span>
                </div>
                <p className={styles.description}>{t(descriptionKey)}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
