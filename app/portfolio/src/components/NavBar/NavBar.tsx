import { NavLink } from 'react-router-dom';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useI18n } from '../../i18n/I18nProvider';
import { NAV_ROUTES } from '../../router/navConfig';
import { PATHS } from '../../router/paths';
import styles from './NavBar.module.css';

export function NavBar() {
  const { t } = useI18n();

  return (
    <nav className={styles.nav} aria-label={t('a11y.mainNav')}>
      <div className={styles.inner}>
        <NavLink to={PATHS.ROOT} end className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true">
            RV
          </span>
          <span className={styles.logoText}>{t('portfolio.wordmark')}</span>
        </NavLink>
        <div className={styles.links}>
          {NAV_ROUTES.map(({ path, messageKey }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
              }
            >
              {t(messageKey)}
            </NavLink>
          ))}
        </div>
        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
