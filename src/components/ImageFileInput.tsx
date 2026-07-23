import { useRef } from 'react';

type Props = {
  onFile: (file: File) => void;
  id?: string;
  /** When true, label switches Select → Change (legacy `.edit.selected`). */
  hasFile?: boolean;
};

/** Matches live markup so shared `.edit` / `::file-selector-button` styles apply. */
export function ImageFileInput({ onFile, id = 'image-upload', hasFile = false }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={`edit visible${hasFile ? ' selected' : ''}`}>
      <div className="edit-inner">
        <div className="edit-type-image">
          <label htmlFor={id}>
            <span>Select</span>
            <span>Change</span> image:
          </label>
          <input
            ref={ref}
            type="file"
            className="image-change"
            id={id}
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>
    </div>
  );
}
