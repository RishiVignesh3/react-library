import { Card, PageHeader, Section, Text } from '@org/ui';

import styles from './page-leadin.module.css';

export function HomePage() {
  return (
    <div>
      <PageHeader title="Today" />
      <Text variant="muted" className={styles.leadin}>
        Your daily view—priorities, habits, and quick links will land here as
        you build PKM Folio.
      </Text>
      <Section
        title="Getting started"
        description="Open Capture to add notes—data stays in this browser. Export JSON for a backup or to move to another device."
      >
        <Card>
          <Text>
            <strong>Phase 3 is live:</strong> <strong>Capture</strong> saves to
            IndexedDB (debounced) and supports JSON backup/restore. Next: search,
            library, and polish in Phase 4.
          </Text>
        </Card>
      </Section>
    </div>
  );
}
