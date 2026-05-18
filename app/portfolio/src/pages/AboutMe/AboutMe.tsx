import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import styles from './AboutMe.module.css';

const SKILLS = [
  'TypeScript',
  'React',
  'Node.js',
  'System Design',
  'GraphQL',
  'REST APIs',
  'CI/CD',
  'Nx Monorepo',
  'Testing',
  'Performance',
] as const;

export default function AboutMe() {
  return (
    <section className={styles.page} aria-labelledby="about-heading">
      <SectionHeader
        titleId="about-heading"
        eyebrow="Staff engineer · portfolio"
        title="I craft frontends that scale—and teams that ship."
        lead="Frontend platform, monrepo architecture, and developer experience. Calm systems, sharp execution."
      />

      <div className={styles.displayLine} aria-hidden="true">
        <span className={styles.displayLineInner} />
      </div>

      <p className={styles.bio}>
        I lead technical direction where product velocity and platform health meet. My
        work sits at the intersection of React architecture, build systems, and the
        human side of engineering: mentoring, alignment, and standards that stick.
      </p>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Impact</dt>
          <dd className={styles.statValue}>Platform</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Focus</dt>
          <dd className={styles.statValue}>DX + UX</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Style</dt>
          <dd className={styles.statValue}>Pragmatic</dd>
        </div>
      </dl>

      <div className={styles.skills}>
        <h2 className={styles.skillsTitle}>Stack &amp; craft</h2>
        <ul className={styles.tags} aria-label="Skills and technologies">
          {SKILLS.map((skill, index) => (
            <li
              key={skill}
              className={styles.tag}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
