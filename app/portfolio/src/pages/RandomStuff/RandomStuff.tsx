import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './RandomStuff.module.css';

interface RandomCard {
  readonly id: string;
  readonly emoji: string;
  readonly titleKey: MessageKey;
  readonly bodyKey: MessageKey;
  readonly size: 'sm' | 'md' | 'lg';
}

const CARDS: readonly RandomCard[] = [
  {
    id: 'music',
    emoji: '🎸',
    titleKey: 'random.music.title',
    bodyKey: 'random.music.body',
    size: 'md',
  },
  {
    id: 'reading',
    emoji: '📖',
    titleKey: 'random.reading.title',
    bodyKey: 'random.reading.body',
    size: 'lg',
  },
  {
    id: 'keyboards',
    emoji: '⌨️',
    titleKey: 'random.keyboards.title',
    bodyKey: 'random.keyboards.body',
    size: 'sm',
  },
  {
    id: 'photography',
    emoji: '📷',
    titleKey: 'random.photography.title',
    bodyKey: 'random.photography.body',
    size: 'sm',
  },
  {
    id: 'coffee',
    emoji: '☕',
    titleKey: 'random.coffee.title',
    bodyKey: 'random.coffee.body',
    size: 'md',
  },
  {
    id: 'tinkering',
    emoji: '🔧',
    titleKey: 'random.tinkering.title',
    bodyKey: 'random.tinkering.body',
    size: 'md',
  },
] as const;

export default function RandomStuff() {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-labelledby="random-heading">
      <SectionHeader
        titleId="random-heading"
        eyebrow={t('random.eyebrow')}
        title={t('random.title')}
        lead={t('random.lead')}
      />

      <ul className={styles.grid} aria-label={t('a11y.interestsGrid')}>
        {CARDS.map(({ id, emoji, titleKey, bodyKey, size }, index) => (
          <li
            key={id}
            className={`${styles.card} ${styles[`size_${size}`]}`}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className={styles.cardEmoji} aria-hidden="true">
              {emoji}
            </span>
            <span className={styles.cardTitle}>{t(titleKey)}</span>
            <p className={styles.cardBody}>{t(bodyKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
