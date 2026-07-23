import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AdjustmentSliders } from '../../components/AdjustmentSliders';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageFileInput } from '../../components/ImageFileInput';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageIngest, useObjectUrl } from '../../hooks/useImageIngest';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import { assetUrl } from '../../lib/assetUrl';

const GLYPHS = ['x', 'square', 'filled', 'slash'] as const;
const ALIGNMENTS = ['even', 'between', 'around'] as const;

type Glyph = (typeof GLYPHS)[number];
type Alignment = (typeof ALIGNMENTS)[number];
type Panel = 'main' | 'invert';

type Column = {
  alignment: Alignment;
  glyphs: Glyph[];
  offsetRem: number;
};

function randomColumns(): Column[] {
  return Array.from({ length: 3 }, () => ({
    alignment: ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)]!,
    glyphs: Array.from(
      { length: Math.floor(Math.random() * 5) },
      () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!,
    ),
    offsetRem: Math.random() * 4 - 2,
  }));
}

export function Decoder() {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<Column[]>(() => randomColumns());
  const [activePanel, setActivePanel] = useState<Panel>('main');
  const url = useObjectUrl(file);
  const captureRef = useRef<HTMLDivElement>(null);
  const { state, capture, reset: resetCapture } = useCaptureDownload('decoder.jpg', {
    cssScope: ['decoder-image-generator', 'input'],
  });
  const main = useImageAdjustments();
  const invert = useImageAdjustments({
    initial: { objectPosition: '100% 50%' },
  });
  const active = activePanel === 'main' ? main : invert;

  const logoSrc = assetUrl('images/decoder/logo.png');

  // Zoom stays shared; brightness/contrast apply to the last-selected panel (main default).
  const setZoom = useCallback(
    (zoom: number) => {
      main.setZoom(zoom);
      invert.setZoom(zoom);
    },
    [main.setZoom, invert.setZoom],
  );

  const selectPanel = useCallback(
    (panel: Panel, handlers: typeof main.pointerHandlers) =>
      (event: ReactPointerEvent<HTMLElement>) => {
        setActivePanel(panel);
        handlers.onPointerDown?.(event);
      },
    [],
  );

  const onImage = useCallback(
    (next: File) => {
      setFile(next);
      setColumns(randomColumns());
      setActivePanel('main');
      resetCapture();
    },
    [resetCapture],
  );

  const { dropProps } = useImageIngest(onImage);

  return (
    <div className="tool verge decoder-image-generator active" data-tool-name="decoder-image-generator">
      <form className="decoder-image-generator" onSubmit={(e) => e.preventDefault()}>
        <div className="story input">
          <ImageFileInput onFile={onImage} id="decoder-image" hasFile={Boolean(file)} />
          <div className={`image-container${file ? '' : ' draggable'}`} ref={captureRef} {...dropProps}>
            <div className="image-inner capture">
              <div className="lockup">
                <div className="layer">
                  <div className="big">
                    <img src={logoSrc} alt="" />
                  </div>
                  <div className="small">
                    {columns.map((col, i) => (
                      <div
                        key={i}
                        className={`col ${col.alignment}`}
                        style={{ transform: `translate(0,${col.offsetRem}rem)` }}
                      >
                        {col.glyphs.map((glyph, j) => (
                          <div key={j} className={`column ${glyph}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="picture adjustment-target">
                  <div className="image">
                    <div className="image-holder">
                      <div
                        className="image-holder-inner pannable zooming"
                        data-zoom={main.adj.zoom}
                        ref={main.elementRef}
                        {...main.pointerHandlers}
                        onPointerDown={selectPanel('main', main.pointerHandlers)}
                      >
                        {/* transform / filter / object-position painted by useImageAdjustments */}
                        {url ? <img src={url} alt="" /> : <img alt="" />}
                      </div>
                    </div>
                    <div className="invert-holder">
                      <div
                        className="invert-holder-inner pannable zooming"
                        data-zoom={invert.adj.zoom}
                        ref={invert.elementRef}
                        {...invert.pointerHandlers}
                        onPointerDown={selectPanel('invert', invert.pointerHandlers)}
                      >
                        {url ? (
                          <img className={`inverse${url ? ' loaded' : ''}`} src={url} alt="" />
                        ) : (
                          <img className="inverse" alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`options${file ? ' visible' : ''}`}>
            <div className="regen" onClick={() => setColumns(randomColumns())} role="button" tabIndex={0}>
              Regenerate glyphs
            </div>
            <AdjustmentSliders
              zoom={main.adj.zoom}
              brightness={active.adj.brightness}
              contrast={active.adj.contrast}
              onZoom={setZoom}
              onBrightness={active.setBrightness}
              onContrast={active.setContrast}
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
