import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AdjustmentSliders } from '../../components/AdjustmentSliders';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageFileInput } from '../../components/ImageFileInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageIngest, useObjectUrl, useDropZone } from '../../hooks/useImageIngest';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import {
  DEFAULT_ADJUSTMENTS,
  type ImageAdjustments,
  clampPanTranslate,
  filterStyle,
  transformStyle,
} from '../../lib/imageAdjust';
import { assetUrl } from '../../lib/assetUrl';

type ImageCount = 'one' | 'two' | 'three' | 'four';

const IMAGE_COUNTS: Array<{ className: ImageCount; label: string }> = [
  { className: 'one', label: 'One' },
  { className: 'two', label: 'Two' },
  { className: 'three', label: 'Three' },
  { className: 'four', label: 'Four' },
];

const BACKGROUNDS = [
  { className: 'background-1', preview: assetUrl('images/installer/background-1.svg') },
  { className: 'background-2', preview: assetUrl('images/installer/background-2.svg') },
  { className: 'background-3', preview: assetUrl('images/installer/background-3.svg') },
];

const COUNT_MAP: Record<ImageCount, number> = { one: 1, two: 2, three: 3, four: 4 };

const svgCache = new Map<string, string>();

async function loadSvg(path: string): Promise<string> {
  const cached = svgCache.get(path);
  if (cached) return cached;
  const text = await fetch(path).then((r) => r.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  const svg = doc.documentElement;
  // `slice` ≈ object-fit: cover (default `meet` ≈ contain).
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  const normalized = new XMLSerializer().serializeToString(svg);
  svgCache.set(path, normalized);
  return normalized;
}

type Slot = { file: File | null; adj: ImageAdjustments };

function emptySlot(): Slot {
  return { file: null, adj: { ...DEFAULT_ADJUSTMENTS } };
}

export function Installer() {
  const [imageCount, setImageCount] = useState<ImageCount>('one');
  const [background, setBackground] = useState('background-1');
  const [altColor, setAltColor] = useState(false);
  const [slots, setSlots] = useState<Slot[]>(() => Array.from({ length: 4 }, emptySlot));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [decorationMarkup, setDecorationMarkup] = useState('');
  const captureRef = useRef<HTMLDivElement>(null);
  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const { state, capture, reset: resetCapture } = useCaptureDownload('installer.jpg', {
    cssScope: ['installer-image-generator'],
  });

  // slots[] is the single store; hook is a controlled view of the selected slot.
  const selectedAdj = slots[selectedIndex]?.adj ?? DEFAULT_ADJUSTMENTS;
  const updateSelectedAdj = useCallback((next: ImageAdjustments) => {
    const index = selectedIndexRef.current;
    setSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, adj: next } : slot)),
    );
  }, []);

  const {
    adj,
    setZoom,
    setBrightness,
    setContrast,
    pointerHandlers,
    elementRef,
    reclampToHolder,
  } = useImageAdjustments({
    value: selectedAdj,
    onChange: updateSelectedAdj,
  });

  // Inline SVGs so CSS can show/hide + recolor paths (legacy targeted `.decoration svg`).
  useEffect(() => {
    let cancelled = false;
    Promise.all(BACKGROUNDS.map((bg) => loadSvg(bg.preview)))
      .then((svgs) => {
        if (!cancelled) setDecorationMarkup(svgs.join(''));
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, []);

  // Size-gate: CSS hides slots; keep selection inside the visible set.
  useEffect(() => {
    const max = COUNT_MAP[imageCount] - 1;
    setSelectedIndex((i) => (i > max ? max : i));
  }, [imageCount]);

  // When the mosaic layout changes (one→two, …), clamp every slot to its new box.
  useLayoutEffect(() => {
    const root = captureRef.current;
    if (!root) return;
    const holders = root.querySelectorAll<HTMLElement>(
      '.image-group .image-container .image-holder-inner',
    );
    setSlots((prev) => {
      let changed = false;
      const next = prev.map((slot, i) => {
        const el = holders[i];
        if (!el || el.clientWidth <= 0 || el.clientHeight <= 0) return slot;
        const clamped = clampPanTranslate(
          slot.adj.translateX,
          slot.adj.translateY,
          slot.adj.zoom,
          el.clientWidth,
          el.clientHeight,
        );
        if (clamped.x === slot.adj.translateX && clamped.y === slot.adj.translateY) return slot;
        changed = true;
        return {
          ...slot,
          adj: { ...slot.adj, translateX: clamped.x, translateY: clamped.y },
        };
      });
      return changed ? next : prev;
    });
    reclampToHolder();
  }, [imageCount, reclampToHolder]);

  const assignFile = useCallback(
    (index: number, file: File) => {
      setSelectedIndex(index);
      setSlots((prev) =>
        prev.map((slot, i) =>
          i === index ? { ...slot, file, adj: { ...DEFAULT_ADJUSTMENTS } } : slot,
        ),
      );
      resetCapture();
    },
    [resetCapture],
  );

  const onPasteFile = useCallback(
    (file: File) => assignFile(selectedIndex, file),
    [assignFile, selectedIndex],
  );

  useImageIngest(onPasteFile);

  const containerClass = `installer-container capture ${background}${altColor ? ' alt-color' : ''}`;

  const renderSlot = (idx: number) => (
    <InstallerSlot
      key={idx}
      slot={slots[idx]!}
      active={selectedIndex === idx}
      liveZoom={adj.zoom}
      pointerHandlers={pointerHandlers}
      elementRef={selectedIndex === idx ? elementRef : undefined}
      onSelect={() => setSelectedIndex(idx)}
      onFile={(file) => assignFile(idx, file)}
    />
  );

  return (
    <div className="tool verge installer-image-generator active" data-tool-name="installer-image-generator">
      <form className="installer-image-generator" onSubmit={(e) => e.preventDefault()}>
        <div className="story input">
          <div className="options-top">
            <ToggleGroup
              className="images"
              label="Number of Images:"
              value={imageCount}
              options={IMAGE_COUNTS}
              onChange={(v) => setImageCount(v as ImageCount)}
            />
            <div className="patterns toggle-group">
              <span className="label">
                Background:
                <span className="swap">
                  <label>Swap colors:</label>
                  <input
                    type="checkbox"
                    className="check-toggle"
                    checked={altColor}
                    onChange={(e) => setAltColor(e.target.checked)}
                  />
                </span>
              </span>
              {BACKGROUNDS.map((bg) => (
                <div
                  key={bg.className}
                  className={`pattern entry toggle${background === bg.className ? ' selected' : ''}`}
                  onClick={() => setBackground(bg.className)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={`inner${background === bg.className ? ' selected' : ''}`}>
                    <img src={bg.preview} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frame only — `cssScope: installer-image-generator` restores tool CSS for the off-screen clone. */}
          <div className={containerClass} ref={captureRef}>
            {/* Always mount all four slots — legacy CSS hides extras via `.one`/`.two`/… */}
            <div
              className="decoration"
              dangerouslySetInnerHTML={decorationMarkup ? { __html: decorationMarkup } : undefined}
            />
            <div className="mosaic">
              <div className="top-bar" />
              <div className="bottom-bar" />
              <div className={`image-group ${imageCount}`}>
                <div className="left">
                  {renderSlot(0)}
                  {renderSlot(1)}
                </div>
                <div className="right">
                  {renderSlot(2)}
                  {renderSlot(3)}
                </div>
              </div>
            </div>
          </div>

          <ImageFileInput
            onFile={(file) => assignFile(selectedIndex, file)}
            id="installer-image"
            hasFile={Boolean(slots[selectedIndex]?.file)}
          />

          <div className="options options-bottom visible">
            <AdjustmentSliders
              zoom={adj.zoom}
              brightness={adj.brightness}
              contrast={adj.contrast}
              onZoom={(v) => {
                setZoom(v);
                resetCapture();
              }}
              onBrightness={(v) => {
                setBrightness(v);
                resetCapture();
              }}
              onContrast={(v) => {
                setContrast(v);
                resetCapture();
              }}
            />
            <FinalizeButton
              state={state}
              onClick={() => capture(captureRef.current)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function InstallerSlot({
  slot,
  active,
  liveZoom,
  pointerHandlers,
  elementRef,
  onSelect,
  onFile,
}: {
  slot: Slot;
  active: boolean;
  liveZoom: number;
  pointerHandlers: ReturnType<typeof useImageAdjustments>['pointerHandlers'];
  elementRef?: React.Ref<HTMLDivElement | null>;
  onSelect: () => void;
  onFile: (file: File) => void;
}) {
  const url = useObjectUrl(slot.file);
  // Active: paint-only via useImageAdjustments. Inactive: React styles from stored adj.
  // Filter lives on the holder so it can stack with any CSS look on the <img>.
  const holderStyle = active ? undefined : { filter: filterStyle(slot.adj) };
  const imgStyle = active
    ? undefined
    : {
        objectPosition: slot.adj.objectPosition,
        transform: transformStyle(slot.adj),
      };
  const zoom = active ? liveZoom : slot.adj.zoom;
  const dropProps = useDropZone(onFile);

  return (
    <div
      className={`image-container${slot.file ? '' : ' draggable'} selectable${active ? ' active image-selected' : ''}`}
      onClick={onSelect}
      {...dropProps}
    >
      <div className="image-inner">
        <div className="picture adjustment-target">
          <div className="image">
            <div className="image-holder">
              <div
                className="image-holder-inner pannable zooming"
                data-zoom={zoom}
                ref={elementRef}
                style={holderStyle}
                {...(active ? pointerHandlers : {})}
              >
                <img src={url ?? assetUrl('images/placeholder.png')} alt="" style={imgStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
