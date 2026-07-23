import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { AdjustmentSliders } from '../../components/AdjustmentSliders';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageFileInput } from '../../components/ImageFileInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageIngest, useObjectUrl } from '../../hooks/useImageIngest';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import {
  ASPECT_RATIO_OPTIONS,
  ASPECT_RATIO_VIEWBOX,
  useNaturalAspectRatio,
} from '../../hooks/useNaturalAspectRatio';

export function VergeFilter() {
  const [file, setFile] = useState<File | null>(null);
  const [ratio, setRatio] = useState('auto');
  const url = useObjectUrl(file);
  const naturalAspect = useNaturalAspectRatio(url);
  const filterId = useId().replace(/:/g, '');
  const captureRef = useRef<HTMLDivElement>(null);
  const { state, capture, reset: resetCapture } = useCaptureDownload('verge-filter.jpg', {
    cssScope: ['verge-filter-generator', 'input'],
  });
  const { adj, setZoom, setBrightness, setContrast, pointerHandlers, elementRef } =
    useImageAdjustments({ coverPan: false });

  const onImage = useCallback(
    (next: File) => {
      setFile(next);
      resetCapture();
    },
    [resetCapture],
  );

  const { dropProps } = useImageIngest(onImage);

  const containerClass = `image-container${file ? '' : ' draggable'} ${ratio}`;
  const containerStyle =
    ratio === 'auto' ? { aspectRatio: naturalAspect ?? '3 / 2' } : undefined;

  const viewBox = useMemo(() => {
    if (ratio === 'auto' && naturalAspect) {
      const [w, h] = naturalAspect.split('/').map((p) => p.trim());
      if (w && h) return `0 0 ${w} ${h}`;
    }
    return ASPECT_RATIO_VIEWBOX[ratio] ?? ASPECT_RATIO_VIEWBOX.auto;
  }, [ratio, naturalAspect]);

  return (
    <div className="tool verge verge-filter active" data-tool-name="verge-filter">
      <form className="verge-filter-generator" onSubmit={(e) => e.preventDefault()}>
        <div className="story input">
          <ImageFileInput onFile={onImage} id="verge-filter" hasFile={Boolean(file)} />
          <div className={containerClass} style={containerStyle} ref={captureRef} {...dropProps}>
            <div className="image-inner capture">
              <div className="lockup">
                <div className="picture">
                  <div className="image">
                    <div className="image-holder">
                      <div
                        className="image-holder-inner pannable zooming"
                        data-zoom={adj.zoom}
                        ref={elementRef}
                        {...pointerHandlers}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="verge-filter-svg"
                          viewBox={viewBox}
                        >
                          <defs>
                            <filter
                              id={`verge-filter-source-${filterId}`}
                              x="-10%"
                              y="-10%"
                              width="120%"
                              height="120%"
                              filterUnits="objectBoundingBox"
                              primitiveUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feColorMatrix
                                type="matrix"
                                values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
                                in="SourceGraphic"
                                result="colormatrix"
                              />
                              <feComponentTransfer in="colormatrix" result="componentTransfer">
                                <feFuncR type="table" tableValues="0.4 0.24" />
                                <feFuncG type="table" tableValues="0 1" />
                                <feFuncB type="table" tableValues="0.88 0.82" />
                                <feFuncA type="table" tableValues="0 1" />
                              </feComponentTransfer>
                              <feBlend mode="normal" in="componentTransfer" in2="SourceGraphic" result="blend" />
                            </filter>
                          </defs>
                          <g filter={`url(#verge-filter-source-${filterId})`}>
                            {url ? (
                              <image
                                x="0%"
                                y="0%"
                                width="100%"
                                height="100%"
                                preserveAspectRatio="xMidYMid meet"
                                href={url}
                                className="image-filtered load adjustment-target"
                              />
                            ) : null}
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`options${file ? ' visible' : ''}`}>
            <ToggleGroup
              className="ratios"
              label="Aspect Ratio:"
              value={ratio}
              options={[...ASPECT_RATIO_OPTIONS]}
              onChange={setRatio}
            />
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
