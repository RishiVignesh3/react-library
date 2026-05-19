import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './Companies.module.css';

interface WorkRow {
  readonly id: string;
  readonly companyKey: MessageKey;
  readonly roleKey: MessageKey;
  readonly productKey: MessageKey;
  readonly bulletKeys: readonly MessageKey[];
  readonly period: PeriodSpec;
}

type PeriodSpec =
  | { readonly kind: 'range'; readonly startKey: MessageKey; readonly endKey: MessageKey }
  | { readonly kind: 'toPresent'; readonly startKey: MessageKey };

const WORK: readonly WorkRow[] = [
  {
    id: 'company-trimble',
    companyKey: 'companies.trimble.company',
    roleKey: 'companies.trimble.role',
    productKey: 'companies.trimble.product',
    bulletKeys: [
      'companies.trimble.bullets.mission',
      'companies.trimble.bullets.delivery',
      'companies.trimble.bullets.stackUpgrades',
      'companies.trimble.bullets.testing',
      'companies.trimble.bullets.webComponents',
      'companies.trimble.bullets.reviews',
    ],
    period: {
      kind: 'toPresent',
      startKey: 'companies.trimble.periodStart',
    },
  },
  {
    id: 'company-anthology',
    companyKey: 'companies.anthology.company',
    roleKey: 'companies.anthology.role',
    productKey: 'companies.anthology.product',
    bulletKeys: [
      'companies.anthology.bullets.mission',
      'companies.anthology.bullets.features',
      'companies.anthology.bullets.react',
      'companies.anthology.bullets.migration',
      'companies.anthology.bullets.reviews',
    ],
    period: {
      kind: 'range',
      startKey: 'companies.anthology.periodStart',
      endKey: 'companies.anthology.periodEnd',
    },
  },  
  {
    id: 'company-cognizant',
    companyKey: 'companies.cognizant.company',
    roleKey: 'companies.cognizant.role',
    productKey: 'companies.cognizant.product',
    bulletKeys: [
      'companies.cognizant.bullets.scope',
      'companies.cognizant.bullets.engineering',
      'companies.cognizant.bullets.observability',
    ],
    period: {
      kind: 'range',
      startKey: 'companies.cognizant.periodStart',
      endKey: 'companies.cognizant.periodEnd',
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
        {WORK.map(
          ({ id, companyKey, roleKey, productKey, bulletKeys, period }, index) => (
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
                  <div className={styles.detail}>
                    <div className={styles.productBlock}>
                      <span className={styles.productLabel}>
                        {t('companies.productLabel')}
                      </span>
                      <span className={styles.productName}>{t(productKey)}</span>
                    </div>
                    <ul className={styles.bullets}>
                      {bulletKeys.map((key) => (
                        <li key={key} className={styles.bullet}>
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ),
        )}
      </ol>
    </section>
  );
}
