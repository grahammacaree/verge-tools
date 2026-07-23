import type { MouseEvent } from 'react';
import { TOOLS, type ToolId } from '../lib/tools';
import { toolIdToPath } from '../lib/routing';
import { VergeWordmark } from '../components/VergeLogos';

type Props = {
  active: ToolId;
  onSelect: (id: ToolId) => void;
};

function navClick(e: MouseEvent, id: ToolId, onSelect: (id: ToolId) => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  onSelect(id);
}

export function LeftNav({ active, onSelect }: Props) {
  return (
    <div className="left-column">
      <div className="inner">
        <div className="top">
          <a
            className="rn"
            href={toolIdToPath('release-notes')}
            onClick={(e) => navClick(e, 'release-notes', onSelect)}
          >
            release notes
          </a>
        </div>
        <a
          className="home verge"
          href={toolIdToPath('title')}
          onClick={(e) => navClick(e, 'title', onSelect)}
        >
          <VergeWordmark />
          <span className="sr-only">Verge Tools home</span>
        </a>
        <ul className="tool-selector">
          <li className={active === 'title' ? 'active' : undefined}>
            <a
              className="select-tool"
              href={toolIdToPath('title')}
              onClick={(e) => navClick(e, 'title', onSelect)}
            >
              Home
            </a>
          </li>
          {TOOLS.map((tool) => (
            <li key={tool.id} className={active === tool.id ? 'active' : undefined}>
              <a
                className="select-tool verge"
                href={toolIdToPath(tool.id)}
                onClick={(e) => navClick(e, tool.id, onSelect)}
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
