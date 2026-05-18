import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';
import styles from './RootLayout.module.css';

function PageFallback() {
  return (
    <div className={styles.loading}>
      <span className={styles.spinner} aria-hidden="true" />
      Loading
    </div>
  );
}

export default function RootLayout() {
  return (
    <div className={styles.shell}>
      <div className={styles.meshOverlay} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <NavBar />
      <main className={styles.main}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
