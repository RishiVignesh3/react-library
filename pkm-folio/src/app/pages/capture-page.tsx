import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Alert, Button, Card, Divider, PageHeader, Text } from '@org/ui';

import { useCapture } from '../../features/capture/CaptureProvider';
import {
  downloadCaptureJsonFile,
  parseCaptureImportJson,
} from '../../lib/capture-backup';
import { formatCaptureTime } from '../../lib/format-time';

import styles from './capture-page.module.css';
import leadin from './page-leadin.module.css';

function backupFilename() {
  const d = new Date();
  const stamp = d.toISOString().slice(0, 10);
  return `pkm-folio-capture-${stamp}.json`;
}

export function CapturePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const composeId = useId();
  const detailId = useId();
  const importId = useId();
  const importInputRef = useRef<HTMLInputElement>(null);
  const {
    state,
    dispatch,
    persistenceReady,
    persistenceError,
    clearPersistenceError,
  } = useCapture();
  const [inbox, setInbox] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  const selected = state.items.find((i) => i.id === state.selectedId) ?? null;
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!persistenceReady) {
      return;
    }
    const raw = searchParams.get('item');
    if (raw === null || raw === '') {
      return;
    }
    const id = decodeURIComponent(raw);
    const exists = state.items.some((i) => i.id === id);
    if (exists) {
      dispatch({ type: 'SELECT', id });
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('item');
        return next;
      },
      { replace: true },
    );
  }, [
    persistenceReady,
    searchParams,
    state.items,
    dispatch,
    setSearchParams,
  ]);

  useEffect(() => {
    setDraft(selected?.body ?? '');
  }, [state.selectedId, selected?.id, selected?.body]);

  const addCapture = () => {
    if (!inbox.trim()) {
      return;
    }
    dispatch({ type: 'ADD', body: inbox });
    setInbox('');
  };

  const saveDetail = () => {
    if (!state.selectedId) {
      return;
    }
    dispatch({ type: 'UPDATE', id: state.selectedId, body: draft });
  };

  const onExport = () => {
    clearPersistenceError();
    setImportError(null);
    downloadCaptureJsonFile(state, backupFilename());
  };

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) {
      return;
    }
    setImportError(null);
    clearPersistenceError();
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = parseCaptureImportJson(String(reader.result));
        dispatch({
          type: 'HYDRATE',
          items: data.items,
          selectedId: data.selectedId,
        });
      } catch (err) {
        setImportError(
          err instanceof Error ? err.message : 'Failed to read backup file.',
        );
      }
    };
    reader.onerror = () => {
      setImportError('Could not read the file.');
    };
    reader.readAsText(file, 'utf-8');
  };

  return (
    <div>
      <PageHeader title="Capture" />
      <Text variant="muted" className={leadin.leadin}>
        Inbox and edits are saved in <strong>IndexedDB</strong> in this browser
        (debounced). Use backup JSON to copy data between profiles or devices.
      </Text>

      {!persistenceReady ? (
        <Text variant="muted">Loading saved captures…</Text>
      ) : null}

      {persistenceError ? (
        <Alert style={{ marginTop: '0.75rem' }}>
          {persistenceError}{' '}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearPersistenceError}
          >
            Dismiss
          </Button>
        </Alert>
      ) : null}
      {importError ? (
        <Alert style={{ marginTop: '0.75rem' }}>
          {importError}{' '}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setImportError(null)}
          >
            Dismiss
          </Button>
        </Alert>
      ) : null}

      <div className={styles.grid}>
        <div>
          <Card>
            <h2 className={styles.listTitle} style={{ marginBottom: '0.65rem' }}>
              Backup
            </h2>
            <Text variant="small">
              v1 JSON includes <code>items</code>, <code>selectedId</code>, and
              timestamps. Import replaces the current inbox in this browser.
            </Text>
            <div className={styles.backupRow}>
              <Button type="button" variant="secondary" onClick={onExport}>
                Download JSON
              </Button>
              <input
                ref={importInputRef}
                id={importId}
                className={styles.fileInput}
                type="file"
                accept="application/json,.json"
                onChange={onImportFile}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => importInputRef.current?.click()}
              >
                Import JSON…
              </Button>
            </div>
          </Card>

          <Card style={{ marginTop: '1rem' }}>
            <label className={styles.composeLabel} htmlFor={composeId}>
              New capture
            </label>
            <textarea
              id={composeId}
              className={styles.composeArea}
              value={inbox}
              onChange={(e) => setInbox(e.target.value)}
              placeholder="Type something, then add to the inbox…"
              rows={4}
            />
            <div className={styles.composeActions}>
              <Button type="button" variant="primary" onClick={addCapture}>
                Add to inbox
              </Button>
            </div>
          </Card>

          <Card style={{ marginTop: '1rem' }}>
            <h2 className={styles.listTitle}>Inbox</h2>
            {state.items.length === 0 ? (
              <Text variant="muted">No captures yet.</Text>
            ) : (
              <ul className={styles.list} role="listbox" aria-label="Captures">
                {state.items.map((item) => {
                  const isSelected = item.id === state.selectedId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={
                          isSelected
                            ? `${styles.row} ${styles.rowSelected}`
                            : styles.row
                        }
                        role="option"
                        aria-selected={isSelected}
                        onClick={() =>
                          dispatch({ type: 'SELECT', id: item.id })
                        }
                      >
                        <span className={styles.rowPreview}>{item.body}</span>
                        <span className={styles.rowMeta}>
                          {formatCaptureTime(item.createdAt)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>

        <Card>
          <h2 className={styles.listTitle}>Detail</h2>
          {selected ? (
            <>
              <label className={styles.composeLabel} htmlFor={detailId}>
                Edit
              </label>
              <textarea
                id={detailId}
                className={styles.detailArea}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                aria-label="Edit capture"
              />
              <div className={styles.detailActions}>
                <Button
                  type="button"
                  variant="primary"
                  onClick={saveDetail}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => dispatch({ type: 'SELECT', id: null })}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    dispatch({ type: 'DELETE', id: selected.id });
                  }}
                >
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <p className={styles.emptyDetail}>
              Select a capture from the inbox to edit or delete it.
            </p>
          )}
        </Card>
      </div>

      <Divider style={{ marginTop: '1.5rem' }} />
      <Text variant="small" style={{ marginTop: '0.75rem' }}>
        Persistence: IndexedDB (<code>src/storage/capture-db.ts</code>), JSON
        backup in <code>src/lib/capture-backup.ts</code>. Library search:{' '}
        <code>src/lib/filter-captures.ts</code>.
      </Text>
    </div>
  );
}
