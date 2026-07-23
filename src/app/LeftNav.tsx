import type { MouseEvent } from 'react';
import { TOOLS, type ToolId } from '../lib/tools';
import { toolIdToPath } from '../lib/routing';
import { VergeWordmark } from '../components/VergeLogos';

type Props = {
  active: ToolId;
  onSelect: (id: ToolId) => void;
};

function isModifiedClick(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

export function LeftNav({ active, onSelect }: Props) {
  return (
    <div className="left-column">
      <div className="inner">
        <div className="top">
          <a
            className="rn"
            href={toolIdToPath('release-notes')}
            onClick={(e) => {
              if (isModifiedClick(e)) return;
              e.preventDefault();
              onSelect('release-notes');
            }}
          >
            release notes
          </a>
        </div>
        <a
          className="home verge"
          href={toolIdToPath('title')}
          onClick={(e) => {
            if (isModifiedClick(e)) return;
            e.preventDefault();
            onSelect('title');
          }}
        >
          <VergeWordmark />
          <span className="sr-only">Verge Tools home</span>
        </a>
        <ul className="tool-selector">
          <li
            className={active === 'title' ? 'active' : undefined}
            onClick={(e) => {
              if (isModifiedClick(e)) return;
              onSelect('title');
            }}
          >
            <a
              className="select-tool"
              href={toolIdToPath('title')}
              onClick={(e) => {
                if (isModifiedClick(e)) return;
                e.preventDefault();
                e.stopPropagation();
                onSelect('title');
              }}
            >
              Home
            </a>
          </li>
          {TOOLS.map((tool) => (
            <li
              key={tool.id}
              className={active === tool.id ? 'active' : undefined}
              onClick={(e) => {
                if (isModifiedClick(e)) return;
                onSelect(tool.id);
              }}
            >
              <a
                className="select-tool verge"
                href={toolIdToPath(tool.id)}
                onClick={(e) => {
                  if (isModifiedClick(e)) return;
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(tool.id);
                }}
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
