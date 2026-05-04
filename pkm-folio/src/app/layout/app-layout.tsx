import { NavLink, Outlet } from 'react-router-dom';

import { Shell, Text } from '@org/ui';

import styles from './app-layout.module.css';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

export function AppLayout() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden>
              ◈
            </span>
            <div>
              <div className={styles.brandTitle}>PKM Folio</div>
              <Text variant="muted" className={styles.brandTagline}>
                Personal knowledge & productivity
              </Text>
            </div>
          </div>
          <nav className={styles.nav} aria-label="Main">
            <NavLink to="/" end className={navLinkClass}>
              Today
            </NavLink>
            <NavLink to="/capture" className={navLinkClass}>
              Capture
            </NavLink>
            <NavLink to="/library" className={navLinkClass}>
              Library
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Shell>
          <Outlet />
        </Shell>
      </main>
    </div>
  );
}
