import { Suspense, lazy } from 'react';
import { LeftNav } from './LeftNav';
import { ToolHeader } from './ToolHeader';
import { useToolRoute } from '../hooks/useToolRoute';
import type { ToolId } from '../lib/tools';
import { ReleaseNotes } from '../tools/release-notes/ReleaseNotes';

const AILabel = lazy(() => import('../tools/ai-label/AILabel').then((m) => ({ default: m.AILabel })));
const ArticleScraper = lazy(() =>
  import('../tools/article-scraper/ArticleScraper').then((m) => ({ default: m.ArticleScraper })),
);
const Decoder = lazy(() => import('../tools/decoder/Decoder').then((m) => ({ default: m.Decoder })));
const Installer = lazy(() => import('../tools/installer/Installer').then((m) => ({ default: m.Installer })));
const VergeFilter = lazy(() =>
  import('../tools/verge-filter/VergeFilter').then((m) => ({ default: m.VergeFilter })),
);

function ActiveTool({ id }: { id: ToolId }) {
  switch (id) {
    case 'ai-label':
      return <AILabel />;
    case 'verge-filter':
      return <VergeFilter />;
    case 'decoder-image-generator':
      return <Decoder />;
    case 'installer-image-generator':
      return <Installer />;
    case 'article-scraper':
      return <ArticleScraper />;
    case 'title':
    default:
      return null;
  }
}

export function App() {
  const [active, setActive] = useToolRoute();
  const showingNotes = active === 'release-notes';

  // Soft gate removed for this public portfolio freeze. Gate code remains under
  // `PasswordGate.tsx` / `lib/gate.ts` for the staff-hosted copy.
  return (
    <div className="flex-container verge unlocked">
      <LeftNav active={active} onSelect={setActive} />
      <main>
        <header className={showingNotes ? 'hide' : undefined}>
          <div className="lockup">
            <ToolHeader active={active} onSelect={setActive} />
          </div>
        </header>
        <article>
          <section className="left">
            <div className={`tools${showingNotes ? ' hide' : ''}`}>
              <Suspense fallback={<p className="tool-loading">Loading tool…</p>}>
                <ActiveTool id={active} />
              </Suspense>
            </div>
            {showingNotes ? <ReleaseNotes /> : null}
          </section>
        </article>
      </main>
    </div>
  );
}
