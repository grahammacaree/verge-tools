import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react';
import { isValidImageFile } from '../lib/tools';

function pickImageFile(files: FileList | File[] | null): File | undefined {
  if (!files) return undefined;
  return Array.from(files).find(isValidImageFile);
}

/** Drop-target props for `.image-container.draggable` (adds `.dragging` while hovered). */
export function useDropZone(onImage: (file: File) => void, enabled = true) {
  return useMemo(() => {
    if (!enabled) return {};

    const onDragEnter = (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.currentTarget.classList.add('dragging');
    };
    const onDragOver = (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    };
    const onDragLeave = (event: DragEvent<HTMLElement>) => {
      const next = event.relatedTarget as Node | null;
      if (next && event.currentTarget.contains(next)) return;
      event.currentTarget.classList.remove('dragging');
    };
    const onDrop = (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove('dragging');
      const image = pickImageFile(event.dataTransfer.files);
      if (image) onImage(image);
    };

    return { onDragEnter, onDragOver, onDragLeave, onDrop };
  }, [enabled, onImage]);
}

export function useImageIngest(onImage: (file: File) => void, enabled = true) {
  const handleFiles = useCallback(
    (files: FileList | File[] | null) => {
      if (!enabled) return;
      const image = pickImageFile(files);
      if (image) onImage(image);
    },
    [enabled, onImage],
  );

  useEffect(() => {
    if (!enabled) return;

    const onPaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && isValidImageFile(file)) {
            onImage(file);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [enabled, onImage]);

  const dropProps = useDropZone(onImage, enabled);

  return { handleFiles, dropProps };
}

export function useObjectUrl(file: File | null): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);

  return url;
}
