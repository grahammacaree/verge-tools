import type { ReactNode } from 'react';
import { createElement, Fragment } from 'react';

/** Minimal markdown → React for the subset we use in `content/*.md`. */
export function markdownToReact(md: string): ReactNode {
  const blocks = md.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);
  return blocks.map((block, i) => <Fragment key={i}>{renderBlock(block.trim())}</Fragment>);
}

/** Inline-only (for a paragraph already wrapped by the caller). */
export function markdownInline(text: string): ReactNode {
  return renderInline(text.replace(/\n/g, ' ').trim());
}

function renderBlock(block: string): ReactNode {
  const heading = /^(#{1,5})\s+(.+)$/.exec(block);
  if (heading && !block.includes('\n')) {
    const level = heading[1].length;
    const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    return createElement(tag, null, renderInline(heading[2]));
  }

  if (block.startsWith('- ') || block.startsWith('* ')) {
    const items = block.split('\n').filter((l) => /^[-*]\s+/.test(l));
    return (
      <ul>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item.replace(/^[-*]\s+/, ''))}</li>
        ))}
      </ul>
    );
  }

  return <p>{renderInline(block.replace(/\n/g, ' '))}</p>;
}

function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /(`[^`]+`|\*[^*]+\*|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('`')) {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}
