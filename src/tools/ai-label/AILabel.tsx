import { useCallback, useRef, useState } from 'react';
import { AdjustmentSliders } from '../../components/AdjustmentSliders';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageFileInput } from '../../components/ImageFileInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageIngest, useObjectUrl } from '../../hooks/useImageIngest';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import {
  ASPECT_RATIO_OPTIONS,
  useNaturalAspectRatio,
} from '../../hooks/useNaturalAspectRatio';

const LANGUAGE_OPTIONS = [
  { className: 'generated', label: '“Generated”' },
  { className: 'modified', label: '“Modified”' },
];

export function AILabel() {
  const [file, setFile] = useState<File | null>(null);
  const [ratio, setRatio] = useState('auto');
  const [language, setLanguage] = useState('generated');
  const url = useObjectUrl(file);
  const naturalAspect = useNaturalAspectRatio(url);
  const captureRef = useRef<HTMLDivElement>(null);
  const { state, capture, reset: resetCapture } = useCaptureDownload('ai-label.jpg', {
    cssScope: ['ai-label', 'input'],
  });
  const { adj, setZoom, setBrightness, setContrast, pointerHandlers, elementRef } =
    useImageAdjustments();

  const onImage = useCallback(
    (next: File) => {
      setFile(next);
      resetCapture();
    },
    [resetCapture],
  );

  const { dropProps } = useImageIngest(onImage);

  const containerClass = `image-container${file ? '' : ' draggable'} ${ratio}`;
  // Absolute children need a defined box — auto inherits the image’s natural ratio.
  const containerStyle =
    ratio === 'auto' ? { aspectRatio: naturalAspect ?? '3 / 2' } : undefined;

  return (
    <div className="tool verge ai-label active" data-tool-name="ai-label">
      <form className="ai-label" onSubmit={(e) => e.preventDefault()}>
        <div className="story input">
          <ImageFileInput onFile={onImage} id="ai-label" hasFile={Boolean(file)} />
          <div className={containerClass} style={containerStyle} ref={captureRef} {...dropProps}>
            <div className="image-inner capture">
              <div className="lockup">
                <div className="picture adjustment-target">
                  <div className="label">
                    AI-<span className={`language_target ${language}`} /> image
                  </div>
                  <div className="image">
                    <div className="image-holder">
                      <div
                        className="image-holder-inner pannable zooming"
                        data-zoom={adj.zoom}
                        ref={elementRef}
                        {...pointerHandlers}
                      >
                        {url ? <img src={url} alt="" /> : <img alt="" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`options${file ? ' visible' : ''}`}>
            <ToggleGroup
              className="languages"
              label="Language:"
              value={language}
              options={LANGUAGE_OPTIONS}
              onChange={setLanguage}
            />
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
