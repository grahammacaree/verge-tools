import { TOOLS, type ToolId } from '../lib/tools';
import { VergeWordmark } from '../components/VergeLogos';

type Props = {
  active: ToolId;
  onSelect: (id: ToolId) => void;
};

export function LeftNav({ active, onSelect }: Props) {
  return (
    <div className="left-column">
      <div className="inner">
        <div className="top">
          <div className="rn" onClick={() => onSelect('release-notes')} role="button" tabIndex={0}>
            release notes
          </div>
        </div>
        <a className="home verge" href="#" onClick={(e) => { e.preventDefault(); onSelect('title'); }}>
          <VergeWordmark />
          <span className="sr-only">Verge Tools home</span>
        </a>
        <ul className="tool-selector">
          <li
            className={`select-tool${active === 'title' ? ' active' : ''}`}
            onClick={() => onSelect('title')}
          >
            Home
          </li>
          {TOOLS.map((tool) => (
            <li
              key={tool.id}
              className={`select-tool verge${active === tool.id ? ' active' : ''}`}
              onClick={() => onSelect(tool.id)}
            >
              {tool.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
