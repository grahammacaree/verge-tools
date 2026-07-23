/**
 * Side-effect imports for all vanilla-extract stylesheets.
 * Tools and shell import this once from main.
 * Deprecated tools (command-line, image-mosaic) keep CSS next to source but are not wired here.
 */
import './theme.css';
import './fonts.css';
import './keyframes.css';
import './base.css';
import './shared.css';
import './media.css';
import '../app/shell.css';
import '../tools/release-notes/releaseNotes.css';
import '../tools/decoder/decoder.css';
import '../tools/installer/installer.css';
import '../tools/verge-filter/vergeFilter.css';
import '../tools/ai-label/aiLabel.css';
