import { useCallback, useEffect, useRef, useState } from 'react';
import { AdjustmentSliders } from '../../components/AdjustmentSliders';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageFileInput } from '../../components/ImageFileInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageIngest, useObjectUrl } from '../../hooks/useImageIngest';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import { assetUrl } from '../../lib/assetUrl';

const COLORS = ['#d6f31f', '#5200ff', '#f9f9f9'];
const svgCache = new Map<string, string>();

function randomizeCommandLineSvg(svgText: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const rotate = Math.floor(Math.random() * 4);
  doc.querySelectorAll('.command-line-boxes').forEach((group) => {
    (group as SVGElement).style.transform = `rotate(${rotate * 90}deg)`;
  });
  doc.querySelectorAll('.command-line-boxes rect, .command-line-boxes path').forEach((shape) => {
    shape.setAttribute('fill', COLORS[Math.floor(Math.random() * COLORS.length)]!);
  });
  return new XMLSerializer().serializeToString(doc.documentElement);
}

async function loadSvg(path: string): Promise<string> {
  const cached = svgCache.get(path);
  if (cached) return cached;
  const text = await fetch(path).then((r) => r.text());
  svgCache.set(path, text);
  return text;
}

export function CommandLine() {
  const [file, setFile] = useState<File | null>(null);
  const [ratio, setRatio] = useState('r1x1');
  const [frameMarkup, setFrameMarkup] = useState('');
  const [frameKey, setFrameKey] = useState(0);
  const url = useObjectUrl(file);
  const captureRef = useRef<HTMLDivElement>(null);
  const { state, capture, reset: resetCapture } = useCaptureDownload('command-line.jpg', {
    cssScope: ['command-line-image-generator', 'input'],
  });
  const { adj, setZoom, setBrightness, setContrast, pointerHandlers, elementRef } =
    useImageAdjustments();

  useEffect(() => {
    const path =
      ratio === 'r3x2'
        ? assetUrl('images/frames/command-line-3x2.svg')
        : assetUrl('images/frames/command-line-1x1.svg');
    let cancelled = false;
    loadSvg(path)
      .then(randomizeCommandLineSvg)
      .then((markup) => {
        if (!cancelled) setFrameMarkup(markup);
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [ratio, frameKey]);

  const onImage = useCallback(
    (next: File) => {
      setFile(next);
      setFrameKey((k) => k + 1);
      resetCapture();
    },
    [resetCapture],
  );

  const { dropProps } = useImageIngest(onImage);

  return (
    <div className="tool verge command-line-image-generator active" data-tool-name="command-line-image-generator">
      <form className="command-line-image-generator" onSubmit={(e) => e.preventDefault()}>
        <div className="story input">
          <ImageFileInput onFile={onImage} id="command-line-image" hasFile={Boolean(file)} />
          <div className={`image-container${file ? '' : ' draggable'} ${ratio}`} ref={captureRef} {...dropProps}>
            <div className="image-inner capture">
              <div className="lockup">
                <div className="layer" dangerouslySetInnerHTML={{ __html: frameMarkup }} />
                <div className="picture adjustment-target">
                  <div className="image">
                    <div className="image-holder">
                      <div
                        className="image-holder-inner pannable zooming"
                        data-zoom={adj.zoom}
                        ref={elementRef}
                        {...pointerHandlers}
                      >
                        {url ? (
                          <img src={url} alt="" />
                        ) : (
                          <img alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`options${file ? ' visible' : ''}`}>
            <div className="ratios toggle-group">
              <span className="label">Aspect Ratio:</span>
              <ToggleGroup
                label=""
                value={ratio}
                options={[
                  { className: 'r1x1', label: '1:1' },
                  { className: 'r3x2', label: '3:2' },
                ]}
                onChange={setRatio}
              />
              <div className="regen entry" onClick={() => setFrameKey((k) => k + 1)} role="button" tabIndex={0}>
                Regenerate boxes
              </div>
            </div>
            <AdjustmentSliders
              zoom={adj.zoom}
              brightness={adj.brightness}
              contrast={adj.contrast}
              onZoom={setZoom}
              onBrightness={setBrightness}
              onContrast={setContrast}
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
