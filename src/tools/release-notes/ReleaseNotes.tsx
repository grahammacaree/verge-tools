import { RELEASE_NOTES_MD } from '../../lib/content';
import { markdownToReact } from '../../lib/markdown';

export function ReleaseNotes() {
  return <div className="release-notes active">{markdownToReact(RELEASE_NOTES_MD)}</div>;
}
