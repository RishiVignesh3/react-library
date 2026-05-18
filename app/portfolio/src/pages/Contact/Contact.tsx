import type { ReactElement } from 'react';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './Contact.module.css';

interface ContactLink {
  readonly id: string;
  readonly href: string;
  readonly display: string;
  readonly ariaKey: MessageKey;
  readonly Icon: () => ReactElement;
}

function IconGithub() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.95c-5.52 0-10 4.56-10 10.2 0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34s1.7.11 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.15c0-5.64-4.48-10.2-10-10.2Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.84v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.04c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.73V23h-4V8Z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  );
}

const CONTACT_LINKS: readonly ContactLink[] = [
  {
    id: 'github',
    href: 'https://github.com/rvignes',
    display: 'github.com/rvignes',
    ariaKey: 'contact.github',
    Icon: IconGithub,
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/rvignes',
    display: 'linkedin.com/in/rvignes',
    ariaKey: 'contact.linkedin',
    Icon: IconLinkedIn,
  },
  {
    id: 'email',
    href: 'mailto:hello@rvignes.dev',
    display: 'hello@rvignes.dev',
    ariaKey: 'contact.email',
    Icon: IconMail,
  },
] as const;

export default function Contact() {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-labelledby="contact-heading">
      <SectionHeader
        titleId="contact-heading"
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        lead={t('contact.lead')}
      />

      <ul className={styles.links} aria-label={t('a11y.contactLinks')}>
        {CONTACT_LINKS.map(({ id, href, display, ariaKey, Icon }) => {
          const external = !href.startsWith('mailto:');
          const aria = `${t(ariaKey)} · ${display}`;
          return (
            <li key={id}>
              <a
                className={styles.link}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={aria}
                title={aria}
              >
                <span className={styles.linkIconWrap} aria-hidden="true">
                  <Icon />
                </span>
                <span className={styles.linkLabel}>{display}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
