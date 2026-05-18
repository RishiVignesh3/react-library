import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import styles from './RandomStuff.module.css';

interface RandomCard {
  readonly id: string;
  readonly emoji: string;
  readonly title: string;
  readonly body: string;
  readonly size: 'sm' | 'md' | 'lg';
}

const CARDS: readonly RandomCard[] = [
  {
    id: 'music',
    emoji: '🎸',
    title: 'Music',
    body: 'Math rock, post-rock, odd meters on repeat.',
    size: 'md',
  },
  {
    id: 'reading',
    emoji: '📖',
    title: 'Reading',
    body: 'Philosophy of Software Design on the nightstand; Staff Engineer already dog-eared.',
    size: 'lg',
  },
  {
    id: 'keyboards',
    emoji: '⌨️',
    title: 'Mechanical keyboards',
    body: 'Oil Kings, tape mod, coiled cable—guilty as charged.',
    size: 'sm',
  },
  {
    id: 'photography',
    emoji: '📷',
    title: 'Street',
    body: 'X100VI. Film sims beat one-click presets.',
    size: 'sm',
  },
  {
    id: 'coffee',
    emoji: '☕',
    title: 'Coffee',
    body: 'Pour-over at 1:15, then a flat white on weekends.',
    size: 'md',
  },
  {
    id: 'tinkering',
    emoji: '🔧',
    title: 'Tinkering',
    body: 'Home automation, Pi projects, controlled chaos.',
    size: 'md',
  },
] as const;

export default function RandomStuff() {
  return (
    <section className={styles.page} aria-labelledby="random-heading">
      <SectionHeader
        titleId="random-heading"
        eyebrow="Beyond the desk"
        title="Random stuff"
        lead="Culture-fit matters. Here's what keeps me curious when I'm away from the terminal."
      />

      <ul className={styles.grid} aria-label="Interests and hobbies">
        {CARDS.map(({ id, emoji, title, body, size }, index) => (
          <li
            key={id}
            className={`${styles.card} ${styles[`size_${size}`]}`}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className={styles.cardEmoji} aria-hidden="true">
              {emoji}
            </span>
            <span className={styles.cardTitle}>{title}</span>
            <p className={styles.cardBody}>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
