import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../router/navItems';
import { PATHS } from '../../router/paths';
import styles from './NavBar.module.css';

export function NavBar() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.inner}>
        <NavLink to={PATHS.ROOT} end className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true">
            RV
          </span>
          <span className={styles.logoText}>Portfolio</span>
        </NavLink>
        <div className={styles.links}>
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
