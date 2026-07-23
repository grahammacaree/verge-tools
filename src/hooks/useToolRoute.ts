import { useEffect, useState } from 'react';
import { navigateToTool, pathSegment, pathToToolId, toolIdToPath } from '../lib/routing';
import type { ToolId } from '../lib/tools';

/** Active tool synced to the path (`/verge-tools/<tool-id>`). */
export function useToolRoute(): [ToolId, (id: ToolId) => void] {
  const [active, setActive] = useState<ToolId>(() => pathToToolId());

  useEffect(() => {
    const id = pathToToolId();
    // Unknown segments → home; also normalize `/verge-tools` vs trailing slash.
    if (pathSegment() && id === 'title') {
      navigateToTool('title', 'replace');
    } else if (window.location.pathname !== new URL(toolIdToPath(id), window.location.origin).pathname) {
      navigateToTool(id, 'replace');
    }
    setActive(id);

    const onPop = () => setActive(pathToToolId());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const select = (id: ToolId) => {
    navigateToTool(id);
    setActive(id);
  };

  return [active, select];
}
