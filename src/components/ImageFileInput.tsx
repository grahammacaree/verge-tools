import { useEffect, useId, useRef, useState } from 'react';
import { fileFromImageUrl } from '../lib/imageUrl';

export type ImageSourceMode = 'file' | 'url';

type ControlsProps = {
  onFile: (file: File) => void;
  /** id for the file input (and base for the URL field). */
  id?: string;
};

/** File | URL mode toggle + the active ingest control. */
export function ImageSourceControls({ onFile, id = 'image-upload' }: ControlsProps) {
  const autoId = useId();
  const fileId = id;
  const urlFieldId = `${id}-url`;
  const errorId = `${urlFieldId}-error-${autoId}`;
  const urlInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<ImageSourceMode>('file');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== 'url') return;
    urlInputRef.current?.focus();
  }, [mode]);

  const loadFromUrl = async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const file = await fileFromImageUrl(url);
      onFile(file);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-source-controls">
      <div className="image-source-mode" role="tablist" aria-label="Image source">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'file'}
          className={mode === 'file' ? 'selected' : undefined}
          onClick={() => {
            setMode('file');
            setError(null);
          }}
        >
          File
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'url'}
          className={mode === 'url' ? 'selected' : undefined}
          onClick={() => setMode('url')}
        >
          URL
        </button>
      </div>

      <div className="image-source-panels">
        <div
          className={`image-source-panel${mode === 'file' ? '' : ' is-inactive'}`}
          role="tabpanel"
          aria-hidden={mode !== 'file'}
        >
          <input
            type="file"
            className="image-change"
            id={fileId}
            tabIndex={mode === 'file' ? 0 : -1}
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = '';
            }}
          />
        </div>

        <div
          className={`image-source-panel${mode === 'url' ? '' : ' is-inactive'}`}
          role="tabpanel"
          aria-hidden={mode !== 'url'}
        >
          <div className="url-container">
            <input
              ref={urlInputRef}
              id={urlFieldId}
              name={urlFieldId}
              type="url"
              inputMode="url"
              autoComplete="off"
              placeholder="Enter URL"
              value={url}
              tabIndex={mode === 'url' ? 0 : -1}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void loadFromUrl();
                }
              }}
            />
            <button
              type="button"
              className={`url-fetcher${url.trim() && !loading ? ' active' : ''}`}
              disabled={!url.trim() || loading || mode !== 'url'}
              tabIndex={mode === 'url' ? 0 : -1}
              onClick={() => void loadFromUrl()}
            >
              {loading ? 'Loading…' : 'Load'}
            </button>
          </div>
          {error ? (
            <p className="url-error" id={errorId} role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type Props = {
  onFile: (file: File) => void;
  id?: string;
  /** When true, label switches Select → Change (legacy `.edit.selected`). */
  hasFile?: boolean;
};

/** Shared choose-image control: File | URL mode toggle. */
export function ImageFileInput({ onFile, id = 'image-upload', hasFile = false }: Props) {
  return (
    <div className={`edit visible${hasFile ? ' selected' : ''}`}>
      <div className="edit-inner">
        <div className="edit-type-image">
          <label htmlFor={id}>
            <span>Select</span>
            <span>Change</span> image:
          </label>
          <ImageSourceControls onFile={onFile} id={id} />
        </div>
      </div>
    </div>
  );
}
