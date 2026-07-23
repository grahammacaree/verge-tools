import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FinalizeButton } from '../../components/FinalizeButton';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { assetUrl } from '../../lib/assetUrl';
import { MosaicCanvas } from './MosaicCanvas';
import { fetchMosaicTemplates, saveMosaicTemplate } from './sheets';
import { buildTemplateHtml, decodeTemplateHtml, encodeTemplateHtml } from './templateCodec';
import {
  allCells,
  canMerge,
  findNode,
  mergeCell,
  replaceRootFromHtml,
  splitCell,
  toggleCorner,
  updateCell,
  updateSplitRatio,
} from './treeOps';
import { tip } from '../../lib/content';
import {
  MOSAIC_BACKGROUNDS,
  MOSAIC_FILTERS,
  MOSAIC_SAVE_URL,
  createInitialLayout,
  type CornerFlags,
  type MosaicLayoutState,
  type MosaicStep,
  type MosaicTemplate,
} from './types';

const STEP_IDS: MosaicStep[] = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6'];

const STEPS: [MosaicStep, string][] = STEP_IDS.map((id) => [
  id,
  tip('image-mosaic', `steps.${id}`, id),
]);

const CORNERS: Array<{ key: keyof CornerFlags; className: string }> = [
  { key: 'topLeft', className: 'top-left' },
  { key: 'topRight', className: 'top-right' },
  { key: 'bottomLeft', className: 'bottom-left' },
  { key: 'bottomRight', className: 'bottom-right' },
];

function stepIndex(step: MosaicStep): number {
  return STEPS.findIndex(([s]) => s === step);
}

export function ImageMosaic() {
  const [step, setStep] = useState<MosaicStep>('step-1');
  const [unlockedThrough, setUnlockedThrough] = useState(0); // index into STEPS
  const [tab, setTab] = useState<'templates' | 'custom'>('templates');
  const [layout, setLayout] = useState<MosaicLayoutState>(() => createInitialLayout());
  const [templates, setTemplates] = useState<MosaicTemplate[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [encodedPreview, setEncodedPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cellSize, setCellSize] = useState({ w: Infinity, h: Infinity });
  const captureHostRef = useRef<HTMLDivElement>(null);
  const { state: captureState, capture, reset: resetCapture } = useCaptureDownload('mosaic.jpg', {
    cssScope: ['image-mosaic'],
  });

  useEffect(() => {
    fetchMosaicTemplates()
      .then(setTemplates)
      .catch((err) => console.error('Template load failed', err));
  }, []);

  // Auto-select sole root cell so split works without an extra click.
  useEffect(() => {
    if (!layout.selectedId && layout.root.kind === 'cell') {
      setLayout((prev) => ({ ...prev, selectedId: prev.root.id }));
    }
  }, [layout.selectedId, layout.root]);

  // Size-gate splitters (legacy: fade when cell ≤ 75px on that axis).
  useEffect(() => {
    const host = captureHostRef.current;
    if (!host) return;
    const el = host.querySelector('.upload-image.selected') as HTMLElement | null;
    if (!el) {
      setCellSize({ w: Infinity, h: Infinity });
      return;
    }
    const measure = () => setCellSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout.selectedId, layout.root, layout.padding, layout.gap, layout.cutout]);

  const unlockThrough = useCallback((s: MosaicStep) => {
    const idx = stepIndex(s);
    setUnlockedThrough((prev) => Math.max(prev, idx));
  }, []);

  const goToStep = useCallback(
    (next: MosaicStep) => {
      setStep(next);
      unlockThrough(next);
      resetCapture();
      setLayout((prev) => ({
        ...prev,
        layoutLocked: next !== 'step-1',
      }));
    },
    [resetCapture, unlockThrough],
  );

  const selectStep = (next: MosaicStep) => {
    if (stepIndex(next) > unlockedThrough) return;
    goToStep(next);
  };

  const onSelectCell = useCallback((id: string) => {
    setLayout((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const onUpdateCell = useCallback(
    (id: string, patch: Parameters<typeof updateCell>[2]) => {
      setLayout((prev) => updateCell(prev, id, patch));
      resetCapture();
    },
    [resetCapture],
  );

  const onDropFile = useCallback(
    (cellId: string, file: File) => {
      const url = URL.createObjectURL(file);
      let advance = false;
      setLayout((prev) => {
        const existing = allCells(prev.root).find((c) => c.id === cellId);
        if (existing?.imageUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(existing.imageUrl);
        }
        const next = updateCell(prev, cellId, {
          imageUrl: url,
          uploaded: true,
          zoom: 1,
          translateX: 0,
          translateY: 0,
          objectPosition: '50% 50%',
        });
        advance = allCells(next.root).every((c) => c.uploaded);
        return next;
      });
      if (advance) {
        goToStep('step-3');
      }
    },
    [goToStep],
  );

  const onFileInput = (file: File | undefined) => {
    if (!file) return;
    const id =
      layout.selectedId ?? (layout.root.kind === 'cell' ? layout.root.id : allCells(layout.root)[0]?.id);
    if (!id) return;
    onDropFile(id, file);
  };

  const lockLayout = () => {
    setLayout((prev) => ({ ...prev, layoutLocked: true }));
    goToStep('step-2');
    unlockThrough('step-3');
  };

  const loadTemplate = (encoded: string) => {
    try {
      const html = decodeTemplateHtml(encoded);
      setLayout((prev) => replaceRootFromHtml(prev, html));
      goToStep('step-2');
      unlockThrough('step-3');
    } catch (err) {
      console.error('Failed to load template', err);
    }
  };

  const handleSaveTemplate = async (event: React.FormEvent) => {
    event.preventDefault();
    const container = captureHostRef.current?.querySelector('#background-field');
    if (!container || !templateName.trim()) return;
    const html = buildTemplateHtml(container as HTMLElement);
    const encoded = encodeTemplateHtml(html);
    setEncodedPreview(encoded);
    setSubmitting(true);
    try {
      await saveMosaicTemplate(MOSAIC_SAVE_URL, templateName.trim(), encoded);
      setTemplates((prev) => [...prev, { name: templateName.trim(), string: encoded }]);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCell = useMemo(() => {
    if (layout.selectedId) {
      const node = findNode(layout.root, layout.selectedId);
      if (node?.kind === 'cell') return node;
    }
    return allCells(layout.root)[0];
  }, [layout]);

  const splitEnabled = Boolean(layout.selectedId) || layout.root.kind === 'cell';
  const splitHEnabled = splitEnabled && cellSize.w > 75;
  const splitVEnabled = splitEnabled && cellSize.h > 75;
  const mergeEnabled = canMerge(layout);

  return (
    <div className="tool polygon image-mosaic active" data-tool-name="image-mosaic">
      <div className={`step-holder ${step}-selected`}>
        <div className="left">
          <div className="inner">
            <h3>{tip('image-mosaic', 'wizardTitle', 'Image Background Generator')}</h3>
            <ul>
              {STEPS.map(([s, label], idx) => (
                <li
                  key={s}
                  className={`step-selector${idx <= unlockedThrough ? ' active' : ''}${step === s ? ' selected' : ''}`}
                  data-step={s}
                  onClick={() => selectStep(s)}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="animation-holder" ref={captureHostRef}>
            <MosaicCanvas
              state={layout}
              onSelectCell={onSelectCell}
              onDropFile={onDropFile}
              onSplitRatioChange={(splitId, ratio) => {
                setLayout((prev) => updateSplitRatio(prev, splitId, ratio));
                resetCapture();
              }}
              onUpdateCell={onUpdateCell}
            />
          </div>

          <p className="notes step-1 hiding">{tip('image-mosaic', 'notes.step-1')}</p>
          <div className="mosaic-layout step-1 hiding">
            <div className="tabs" data-hook="layout-tabs">
              <div className="select">
                <div className={`button${tab === 'templates' ? ' active' : ''}`} onClick={() => setTab('templates')}>
                  Templates
                </div>
                <div className={`button${tab === 'custom' ? ' active' : ''}`} onClick={() => setTab('custom')}>
                  Custom
                </div>
              </div>
              {tab === 'custom' ? (
                <div className="tab custom active">
                  <div className="cutout-box">
                    <input
                      type="checkbox"
                      checked={layout.cutout}
                      onChange={(e) => setLayout((prev) => ({ ...prev, cutout: e.target.checked }))}
                    />
                    <label>Cutout</label>
                  </div>
                  <div className="padding">
                    <label>Min padding</label>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={layout.padding}
                      className="padding-slider"
                      onChange={(e) => setLayout((prev) => ({ ...prev, padding: Number(e.target.value) }))}
                    />
                    <label>Max padding</label>
                  </div>
                  <div className="gap">
                    <label>Min gap</label>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={layout.gap}
                      className="gap-slider"
                      onChange={(e) => setLayout((prev) => ({ ...prev, gap: Number(e.target.value) }))}
                    />
                    <label>Max gap</label>
                  </div>
                  {CORNERS.map((c) => (
                    <div
                      key={c.key}
                      className={`button corners ${c.className}${selectedCell?.corners[c.key] ? ' active' : ''}${selectedCell ? '' : ' faded'}`}
                      onClick={() => {
                        if (!selectedCell) return;
                        setLayout((prev) => toggleCorner(prev, c.key));
                      }}
                    />
                  ))}
                  <div
                    className={`button splitter${splitHEnabled ? '' : ' faded'}`}
                    data-type="horizontal"
                    onClick={() => {
                      if (!splitHEnabled) return;
                      setLayout((prev) => splitCell(prev, 'horizontal'));
                    }}
                  >
                    Split Horizontal
                  </div>
                  <div
                    className={`button splitter${splitVEnabled ? '' : ' faded'}`}
                    data-type="vertical"
                    onClick={() => {
                      if (!splitVEnabled) return;
                      setLayout((prev) => splitCell(prev, 'vertical'));
                    }}
                  >
                    Split Vertical
                  </div>
                  <div
                    className={`button merge${mergeEnabled ? '' : ' faded'}`}
                    onClick={() => {
                      if (!mergeEnabled) return;
                      setLayout((prev) => mergeCell(prev));
                    }}
                  >
                    Merge Cells
                  </div>
                  <div className="button lock" data-step="step-2" onClick={lockLayout}>
                    Lock Layout
                  </div>
                  <div className={`submit${submitting ? ' submitting' : ''}`}>
                    <form name="rec" method="POST" action={MOSAIC_SAVE_URL} onSubmit={handleSaveTemplate}>
                      <label htmlFor="name">Template name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                      />
                      <label htmlFor="string" id="string-label">
                        string:
                      </label>
                      <input type="text" id="string" name="string" value={encodedPreview} readOnly />
                      <button type="submit" tabIndex={-1} className="active">
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="tab templates active">
                  {templates.map((t) => (
                    <div
                      key={t.name + t.string.slice(0, 12)}
                      className="template"
                      data-name={t.name}
                      onClick={() => loadTemplate(t.string)}
                    >
                      <span>{t.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="notes step-2 hiding">{tip('image-mosaic', 'notes.step-2')}</p>
          <div className="file-selector hiding step-2">
            <label htmlFor="image-background-input">
              <span>Select</span>
              <span>Change</span> image:
            </label>
            <input
              type="file"
              className="image-change"
              id="image-background-input"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                onFileInput(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </div>

          <p className="notes step-3 hiding">{tip('image-mosaic', 'notes.step-3')}</p>
          <div className="background-selector-container hiding step-3">
            <div
              className="background-selector"
              onClick={() => {
                setLayout((prev) => ({ ...prev, backgroundUrl: null }));
                goToStep('step-4');
              }}
            >
              <span>None</span>
            </div>
            {MOSAIC_BACKGROUNDS.map((bg) => (
              <div
                key={bg}
                className="background-selector"
                onClick={() => {
                  setLayout((prev) => ({ ...prev, backgroundUrl: assetUrl(bg) }));
                  goToStep('step-4');
                }}
              >
                <img src={assetUrl(bg)} alt="" />
              </div>
            ))}
          </div>

          <p className="notes step-4 hiding">{tip('image-mosaic', 'notes.step-4')}</p>
          <div className="filter-selector-container hiding step-4" data-classes="cC305A4 c66FF75 cE90C59 gradient">
            {MOSAIC_FILTERS.map((f) => (
              <div
                key={f.className}
                className="filter-selector"
                data-color={f.className}
                onClick={() => {
                  setLayout((prev) => ({ ...prev, filterClass: f.className }));
                  goToStep('step-5');
                  unlockThrough('step-6');
                }}
              >
                <div
                  className="color"
                  style={
                    f.color === 'gradient'
                      ? { background: 'linear-gradient(to bottom right, #E90C59 0%, #C305A4 100%)' }
                      : { backgroundColor: f.color }
                  }
                />
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <p className="notes step-5 hiding">{tip('image-mosaic', 'notes.step-5')}</p>
          <div className="image-adjustments hiding step-5">
            <div className="zoom">
              <label>−</label>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(((selectedCell?.zoom ?? 1) - 1) * 100)}
                className="mosaic-zoom-slider"
                onChange={(e) => {
                  if (!selectedCell) return;
                  const zoom = Number(e.target.value) / 100 + 1;
                  setLayout((prev) => updateCell(prev, selectedCell.id, { zoom }));
                  resetCapture();
                }}
              />
              <label>+</label>
            </div>
          </div>

          <div className="finalize hiding step-6">
            <FinalizeButton
              state={captureState}
              className="button"
              onClick={() =>
                capture(captureHostRef.current?.querySelector('#image-background-capture') as HTMLElement)
              }
            />
          </div>
          <div className="template-holder" />
        </div>
      </div>
    </div>
  );
}
