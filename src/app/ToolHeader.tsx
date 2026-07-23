import type { MouseEvent } from 'react';
import { HOME } from '../lib/content';
import { markdownInline } from '../lib/markdown';
import { toolIdToPath } from '../lib/routing';
import { TOOLS, type ToolId } from '../lib/tools';

type Props = {
  active: ToolId;
  onSelect?: (id: ToolId) => void;
};

function navClick(e: MouseEvent, id: ToolId, onSelect?: (id: ToolId) => void) {
  if (!onSelect || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  onSelect(id);
}

export function ToolHeader({ active, onSelect }: Props) {
  if (active === 'release-notes') return null;
  if (active === 'title') {
    return (
      <div className="text-container title active">
        <h1 className="verge">{HOME.title}</h1>
        {HOME.paragraphs.map((paragraph, i) => (
          <p key={i}>{markdownInline(paragraph)}</p>
        ))}
        {onSelect ? (
          <ul className="tool-selector">
            {TOOLS.map((tool) => (
              <li key={tool.id} className="select-tool verge">
                <a href={toolIdToPath(tool.id)} onClick={(e) => navClick(e, tool.id, onSelect)}>
                  <span>{tool.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
  const tool = TOOLS.find((t) => t.id === active);
  if (!tool) return null;
  return (
    <div className={`text-container verge ${tool.id} active`}>
      <h2>{tool.label}</h2>
      <p>{tool.description}</p>
    </div>
  );
}
