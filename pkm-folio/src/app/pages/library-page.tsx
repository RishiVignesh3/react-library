import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Input, PageHeader, Text } from '@org/ui';

import { useCapture } from '../../features/capture/CaptureProvider';
import { filterCapturesByQuery } from '../../lib/filter-captures';
import { formatCaptureTime } from '../../lib/format-time';

import styles from './library-page.module.css';
import leadin from './page-leadin.module.css';

export function LibraryPage() {
  const searchId = useId();
  const { state, persistenceReady } = useCapture();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterCapturesByQuery(state.items, query),
    [state.items, query],
  );

  const total = state.items.length;
  const subtitle =
    query.trim().length === 0
      ? `${total} capture${total === 1 ? '' : 's'}`
      : `${filtered.length} match${filtered.length === 1 ? '' : 'es'} of ${total}`;

  return (
    <div>
      <PageHeader title="Library" />
      <Text variant="muted" className={leadin.leadin}>
        Search everything in your inbox. Open a row in Capture to edit or delete.
      </Text>

      {!persistenceReady ? (
        <Text variant="muted">Loading captures…</Text>
      ) : (
        <>
          <label className={styles.searchLabel} htmlFor={searchId}>
            Search
          </label>
          <Input
            id={searchId}
            className={styles.searchField}
            type="search"
            placeholder="Filter by text in capture body…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            aria-describedby={`${searchId}-hint`}
          />
          <p id={`${searchId}-hint`} className={styles.countLine}>
            <Text variant="small" as="span">
              {subtitle}
            </Text>
          </p>

          <Card style={{ marginTop: '1rem' }}>
            {total === 0 ? (
              <Text variant="muted">
                No captures yet. Add some from{' '}
                <Link to="/capture">Capture</Link>.
              </Text>
            ) : filtered.length === 0 ? (
              <Text variant="muted">No captures match this search.</Text>
            ) : (
              <ul className={styles.list} role="list">
                {filtered.map((item) => (
                  <li key={item.id}>
                    <Link
                      className={styles.rowLink}
                      to={`/capture?item=${encodeURIComponent(item.id)}`}
                    >
                      <span className={styles.rowPreview}>{item.body}</span>
                      <span className={styles.rowMeta}>
                        {formatCaptureTime(item.createdAt)}
                      </span>
                      <span className={styles.rowHint}>Open in Capture →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
