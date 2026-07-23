import { HOME } from '../lib/content';
import { markdownInline } from '../lib/markdown';
import { TOOLS, type ToolId } from '../lib/tools';

type Props = {
  active: ToolId;
  onSelect?: (id: ToolId) => void;
};

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
              <li key={tool.id} className="select-tool verge" onClick={() => onSelect(tool.id)}>
                <span>{tool.label}</span>
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
