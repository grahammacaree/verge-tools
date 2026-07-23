import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FinalizeButton } from '../../components/FinalizeButton';
import { ImageSourceControls } from '../../components/ImageFileInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { VergeWordmark } from '../../components/VergeLogos';
import { tip } from '../../lib/content';
import { useCaptureDownload } from '../../hooks/useCaptureDownload';
import { useImageAdjustments } from '../../hooks/useImageAdjustments';
import { useObjectUrl } from '../../hooks/useImageIngest';
import { imageUrlToObjectUrl } from '../../lib/imageUrl';
import {
  fetchVergeArticle,
  formatBylines,
  formatEyebrows,
} from '../../lib/scraper';

type PictureProps = {
  heroUrl: string | null;
  credit: string;
  zoom: number;
  elementRef: ReturnType<typeof useImageAdjustments>['elementRef'];
  pointerHandlers: ReturnType<typeof useImageAdjustments>['pointerHandlers'];
};

function ScraperPicture({ heroUrl, credit, zoom, elementRef, pointerHandlers }: PictureProps) {
  return (
    <div className="picture">
      <div className="image">
        <div className="image-holder">
          <div
            className="image-holder-inner pannable zooming"
            data-zoom={zoom}
            ref={elementRef}
            {...pointerHandlers}
          >
            {heroUrl ? <img src={heroUrl} alt="" /> : <img alt="" />}
          </div>
        </div>
      </div>
      <div className="credit">{credit}</div>
    </div>
  );
}

export function ArticleScraper() {
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('c000000');
  const [ratio, setRatio] = useState('r1x1');
  const [headline, setHeadline] = useState('Sample Headline');
  const [eyebrow, setEyebrow] = useState('Eyebrow');
  const [byline, setByline] = useState('Byline');
  const [date, setDate] = useState('Tk.Tk.Tk');
  const [credit, setCredit] = useState('Image by TKTKTKTK');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [remoteImageUrl, setRemoteImageUrl] = useState<string | null>(null);
  const [hideBg, setHideBg] = useState(false);
  const [headlineScale, setHeadlineScale] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStory, setHasStory] = useState(false);

  const fileUrl = useObjectUrl(imageFile);
  const heroUrl = fileUrl ?? remoteImageUrl;
  const captureRef = useRef<HTMLDivElement>(null);
  const remoteBlobRef = useRef<string | null>(null);
  const { state, capture, reset: resetCapture } = useCaptureDownload('article.jpg');
  const { adj, setZoom, pointerHandlers, elementRef, reset: resetAdjustments } =
    useImageAdjustments();

  useEffect(() => {
    return () => {
      if (remoteBlobRef.current?.startsWith('blob:')) {
        URL.revokeObjectURL(remoteBlobRef.current);
      }
    };
  }, []);

  // New crop box when aspect changes — start from a clean frame.
  useEffect(() => {
    resetAdjustments();
  }, [ratio, resetAdjustments]);

  const setRemoteBlob = useCallback((next: string | null) => {
    if (remoteBlobRef.current?.startsWith('blob:') && remoteBlobRef.current !== next) {
      URL.revokeObjectURL(remoteBlobRef.current);
    }
    remoteBlobRef.current = next?.startsWith('blob:') ? next : null;
    setRemoteImageUrl(next);
  }, []);

  const fetchStory = useCallback(async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const article = await fetchVergeArticle(url.trim());
      setHeadline(article.headline || 'Sample Headline');
      setEyebrow(formatEyebrows(article.eyebrows) || 'Eyebrow');
      setByline(formatBylines(article.bylines) || 'Byline');
      setDate(article.date || 'Tk.Tk.Tk');
      setCredit(article.credit || 'Image by TKTKTKTK');
      if (article.imageUrl) {
        try {
          const objectUrl = await imageUrlToObjectUrl(article.imageUrl);
          setRemoteBlob(objectUrl);
          setImageFile(null);
        } catch {
          // <img> can still load cross-origin even when blob fetch is blocked.
          setRemoteBlob(article.imageUrl);
          setImageFile(null);
        }
      }
      setHasStory(true);
      resetAdjustments();
      resetCapture();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [url, loading, resetCapture, resetAdjustments, setRemoteBlob]);

  const onImageChange = useCallback(
    (file: File) => {
      setImageFile(file);
      setRemoteBlob(null);
      resetAdjustments();
      resetCapture();
    },
    [resetCapture, resetAdjustments, setRemoteBlob],
  );

  const pictureProps: PictureProps = {
    heroUrl,
    credit,
    zoom: adj.zoom,
    elementRef,
    pointerHandlers,
  };

  return (
    <div className="tool verge article-scraper active" data-tool-name="article-scraper">
      <form
        className="verge-article-scraper"
        onSubmit={(e) => {
          e.preventDefault();
          void fetchStory();
        }}
      >
        <div className="story input">
          <div className="options">
            <ToggleGroup
              className="colors"
              label="Color:"
              value={color}
              options={[
                { className: 'c000000', label: 'Black' },
                { className: 'c6600FF', label: 'Blurple' },
                { className: 'cffffff', label: 'White' },
              ]}
              onChange={setColor}
            />
            <ToggleGroup
              className="ratios"
              label="Aspect Ratio:"
              value={ratio}
              options={[
                { className: 'r1x1', label: '1:1' },
                { className: 'r9x16', label: '9:16' },
                { className: 'r16x9', label: '16:9' },
              ]}
              onChange={setRatio}
            />
          </div>
          <div className="url-container">
            <input
              name="url"
              id="url"
              type="url"
              placeholder={tip('article-scraper', 'placeholder.url', 'Enter URL')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div
              className={`url-fetcher${url.trim() ? ' active' : ''}`}
              data-site="verge"
              onClick={() => void fetchStory()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  void fetchStory();
                }
              }}
            >
              {loading ? 'Fetching…' : tip('article-scraper', 'action.fetch', 'Fetch Story')}
            </div>
          </div>
          {error ? <p className="url-error">{error}</p> : null}
          <div className={`bottom ${ratio} ${color}`}>
            <div className={`image-container${hasStory ? ' visible' : ''}`}>
              <div className={`image-inner capture${hideBg ? ' hide-bg' : ''}`} ref={captureRef}>
                <div className="logo">
                  <VergeWordmark />
                </div>
                <div className="lockup">
                  <div className="eyebrow">{eyebrow}</div>
                  <div
                    className="headline"
                    style={{ '--slider-percent': headlineScale } as CSSProperties}
                  >
                    {headline}
                  </div>
                  <div className="byline">{byline}</div>
                  <div className="date">{date}</div>
                  {/* Tall layouts keep the photo in-flow inside the padded lockup (legacy 9:16). */}
                  {ratio === 'r9x16' || ratio === 'r1x1' ? (
                    <ScraperPicture {...pictureProps} />
                  ) : null}
                </div>
                {/* 16:9 photo is a sibling so absolute positioning covers the full frame, not the 80% text box. */}
                {ratio === 'r16x9' ? <ScraperPicture {...pictureProps} /> : null}
              </div>
            </div>
            <div className="right">
              <div className="sticky">
                <div className={`edit${hasStory ? ' visible' : ''}`}>
                  <div className="edit-label">
                    <div className="inner">
                      Edit details <span />
                    </div>
                  </div>
                  <div className="edit-inner">
                    <div className="edit-type-eyebrow">
                      <label htmlFor="eyebrow">Eyebrow:</label>
                      <input className="scraper-update" type="text" id="eyebrow" value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
                    </div>
                    <div className="edit-type-headline">
                      <label htmlFor="headline">Headline:</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        className="font-slider"
                        aria-label="Font size"
                        value={headlineScale}
                        onChange={(e) => setHeadlineScale(Number(e.target.value))}
                      />
                      <span className="font-slider-label">Font size</span>
                      <input className="scraper-update" type="text" id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                    </div>
                    <div className="edit-type-byline">
                      <label htmlFor="byline">Byline:</label>
                      <input className="scraper-update" type="text" id="byline" value={byline} onChange={(e) => setByline(e.target.value)} />
                    </div>
                    <div className="edit-type-date">
                      <label htmlFor="date">Date: </label>
                      <input className="scraper-update" type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="edit-type-credit">
                      <label htmlFor="credit">Credit: </label>
                      <input className="scraper-update" type="text" id="credit" value={credit} onChange={(e) => setCredit(e.target.value)} />
                    </div>
                    <div className="edit-type-image">
                      <label htmlFor="article-scaper-image">
                        Change image:
                        <span className="background">
                          <label>Hide background</label>
                          <input
                            type="checkbox"
                            className="check-toggle"
                            checked={hideBg}
                            onChange={(e) => setHideBg(e.target.checked)}
                          />
                        </span>
                      </label>
                      <ImageSourceControls onFile={onImageChange} id="article-scaper-image" />
                      {heroUrl ? (
                        <div className="zoom-slider">
                          <label htmlFor="article-scraper-zoom">Zoom</label>
                          <input
                            id="article-scraper-zoom"
                            type="range"
                            min={0}
                            max={100}
                            value={Math.round((adj.zoom - 1) * 100)}
                            onChange={(e) => setZoom(Number(e.target.value) / 100 + 1)}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <FinalizeButton
                  visible={hasStory}
                  state={state}
                  onClick={() =>
                    capture(captureRef.current, {
                      // `.image-container` is `display:none` until `.visible` — required for off-screen capture.
                      cssScope: ['input', `bottom ${ratio} ${color}`, 'image-container visible'],
                      backgroundColor:
                        color === 'cffffff' ? '#ffffff' : color === 'c6600FF' ? '#6600FF' : '#000000',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
