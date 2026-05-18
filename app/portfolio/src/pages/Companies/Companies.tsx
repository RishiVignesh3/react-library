import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import styles from './Companies.module.css';

interface WorkEntry {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly description: string;
}

const WORK_HISTORY: readonly WorkEntry[] = [
  {
    id: 'company-a',
    company: 'Acme Corp',
    role: 'Staff Engineer',
    period: '2022 — Present',
    description:
      'Leading frontend platform initiatives across 20+ product squads. Architected the monorepo migration to Nx, cutting CI time dramatically and enabling incremental builds at scale.',
  },
  {
    id: 'company-b',
    company: 'BuildIt Inc',
    role: 'Senior Frontend Engineer',
    period: '2019 — 2022',
    description:
      'Built a design system adopted by eight product teams. Introduced module federation to support a deliberate micro-frontend rollout without sacrificing coherence.',
  },
  {
    id: 'company-c',
    company: 'StartupXYZ',
    role: 'Frontend Engineer',
    period: '2017 — 2019',
    description:
      'Early engineer on a B2B SaaS product. Led the React migration, implemented OAuth 2.0 PKCE, and set patterns the codebase still follows today.',
  },
] as const;

export default function Companies() {
  return (
    <section className={styles.page} aria-labelledby="companies-heading">
      <SectionHeader
        titleId="companies-heading"
        eyebrow="Experience"
        title="Companies & work"
        lead="A track record of platform bets, product delivery, and turning complexity into something teams can actually maintain."
      />

      <ol className={styles.timeline} aria-label="Work history">
        {WORK_HISTORY.map(({ id, company, role, period, description }, index) => (
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
                    <span className={styles.company}>{company}</span>
                    <span className={styles.role}>{role}</span>
                  </div>
                  <span className={styles.period}>{period}</span>
                </div>
                <p className={styles.description}>{description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
