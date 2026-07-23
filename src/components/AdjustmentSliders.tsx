type Props = {
  zoom?: number;
  brightness: number;
  contrast: number;
  onZoom?: (v: number) => void;
  onBrightness: (v: number) => void;
  onContrast: (v: number) => void;
  visible?: boolean;
  /** Default true. Set false for a second panel’s B/C-only row (Decoder invert). */
  showZoom?: boolean;
  brightnessLabel?: string;
  contrastLabel?: string;
};

/** Slider rows only — parent owns `.options` / `.options.visible` wrappers. */
export function AdjustmentSliders({
  zoom = 1,
  brightness,
  contrast,
  onZoom,
  onBrightness,
  onContrast,
  visible = true,
  showZoom = true,
  brightnessLabel = 'Brightness',
  contrastLabel = 'Contrast',
}: Props) {
  if (!visible) return null;
  return (
    <>
      {showZoom && onZoom ? (
        <div className="zoom-slider">
          <label>Zoom</label>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((zoom - 1) * 100)}
            onChange={(e) => onZoom(Number(e.target.value) / 100 + 1)}
          />
        </div>
      ) : null}
      <div className="brightness-slider">
        <label>{brightnessLabel}</label>
        <input
          type="range"
          min={50}
          max={150}
          value={brightness}
          onChange={(e) => onBrightness(Number(e.target.value))}
        />
      </div>
      <div className="contrast-slider">
        <label>{contrastLabel}</label>
        <input
          type="range"
          min={50}
          max={150}
          value={contrast}
          onChange={(e) => onContrast(Number(e.target.value))}
        />
      </div>
    </>
  );
}
