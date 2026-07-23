import { useEffect, useState } from 'react';
import { navigateToTool, pathSegment, pathToToolId, toolIdToPath } from '../lib/routing';
import type { ToolId } from '../lib/tools';

/** Active tool synced to the path (`/verge-tools/<tool-id>`). */
export function useToolRoute(): [ToolId, (id: ToolId) => void] {
  const [active, setActive] = useState<ToolId>(() => pathToToolId());

  useEffect(() => {
    const sync = () => setActive(pathToToolId());

    const id = pathToToolId();
    // Unknown segments → home; also normalize `/verge-tools` vs trailing slash.
    if (pathSegment() && id === 'title') {
      navigateToTool('title', 'replace');
    } else {
      const expected = new URL(toolIdToPath(id), window.location.origin).pathname;
      if (window.location.pathname !== expected) {
        navigateToTool(id, 'replace');
      }
    }
    sync();

    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const select = (id: ToolId) => {
    // Update UI first so a history no-op can never leave the shell stuck.
    setActive(id);
    navigateToTool(id);
  };

  return [active, select];
}
