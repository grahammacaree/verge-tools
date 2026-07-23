import { globalStyle } from '@vanilla-extract/css';

globalStyle('.ai-label .story', {
  gap: '1rem',
});

globalStyle('.ai-label .input .edit .edit-inner label', {
  display: 'block',
});

globalStyle('.ai-label .input .edit .edit-inner label span', {
  display: 'none',
});

globalStyle('.ai-label .input .edit .edit-inner label span:first-child', {
  display: 'inline',
});

globalStyle('.ai-label .input .edit.selected .edit-inner label span', {
  display: 'inline',
});

globalStyle('.ai-label .input .edit.selected .edit-inner label span:first-child', {
  display: 'none',
});

globalStyle('.ai-label .input .edit input[type=file]', {
  color: 'transparent',
});

globalStyle('.ai-label .input .options', {
  display: 'none',
  margin: '0',
  padding: '0',
});

globalStyle('.ai-label .input .options.visible', {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
});

globalStyle('.ai-label .input .options.visible .download', {
  display: 'block',
  marginTop: '0',
});

globalStyle('.ai-label .input .options input[type="range"]', {
  accentColor: '#6600FF',
});

globalStyle('.ai-label .input .options .ratios', {
  width: '100%',
});

globalStyle('.ai-label .language_target', {
  display: 'inline-block',
});

globalStyle('.ai-label .language_target.generated:before', {
  content: '"generated"',
});

globalStyle('.ai-label .language_target.modified:before', {
  content: '"modified"',
});

globalStyle('.ai-label .input .image-container', {
  margin: '0',
  padding: '0',
  maxWidth: '500px',
  flex: '1',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  display: 'block',
  order: '0',
  backgroundColor: '#f9f9f9',
  overflow: 'hidden',
  position: 'relative',
});

globalStyle('.ai-label .input .image-container svg', {
  position: 'absolute',
  width: '100%',
  left: '50%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)',
});

globalStyle('.ai-label .input .image-container svg .ai-label-boxes', {
  WebkitTransformOrigin: 'center center',
  transformOrigin: 'center center',
});

globalStyle('.ai-label .input .image-container.auto', {
  maxWidth: '750px',
});

globalStyle('.ai-label .input .image-container.r1x1', {
  aspectRatio: '1 !important',
  maxWidth: '500px !important',
});

globalStyle('.ai-label .input .image-container.r1x1 .r1x1', {
  display: 'block',
});

globalStyle(
  '.ai-label .input .image-container.r1x1 .r3x2, .ai-label .input .image-container.r1x1 .r5x4, .ai-label .input .image-container.r1x1 .r16x9',
  {
    display: 'none',
  },
);

globalStyle('.ai-label .input .image-container.r2x3', {
  aspectRatio: '2/3 !important',
  maxWidth: '500px !important',
});

globalStyle('.ai-label .input .image-container.r3x2', {
  aspectRatio: '1.5 !important',
  maxWidth: '750px !important',
});

globalStyle(
  '.ai-label .input .image-container.r3x2 .r1x1, .ai-label .input .image-container.r3x2 .r5x4, .ai-label .input .image-container.r3x2 .r16x9',
  {
    display: 'none',
  },
);

globalStyle('.ai-label .input .image-container.r3x2 .r3x2', {
  display: 'block',
});

globalStyle('.ai-label .input .image-container.r5x4', {
  aspectRatio: '5/4 !important',
  maxWidth: '750px !important',
});

globalStyle(
  '.ai-label .input .image-container.r5x4 .r1x1, .ai-label .input .image-container.r5x4 .r3x2, .ai-label .input .image-container.r5x4 .r16x9',
  {
    display: 'none',
  },
);

globalStyle('.ai-label .input .image-container.r5x4 .r5x4', {
  display: 'block',
});

globalStyle('.ai-label .input .image-container.r16x9', {
  aspectRatio: '16/9 !important',
  maxWidth: '750px !important',
});

globalStyle(
  '.ai-label .input .image-container.r16x9 .r1x1, .ai-label .input .image-container.r16x9 .r3x2, .ai-label .input .image-container.r16x9 .r5x4',
  {
    display: 'none',
  },
);

globalStyle('.ai-label .input .image-container.r16x9 .r16x9', {
  display: 'block',
});

globalStyle('.ai-label .input .image-container.draggable', {
  border: '0.125rem dashed #6600FF',
  borderRadius: '0.5rem',
  position: 'relative',
});

globalStyle('.ai-label .input .image-container.draggable:after', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '90%',
  display: 'block',
  content: '"Drop image"',
  fontFamily: 'Poly Sans, Helvetica, Arial, sans-serif',
  fontWeight: '600',
  fontSize: '2.5rem',
  color: '#6600FF',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

globalStyle('.ai-label .input .image-container.draggable.dragging', {
  backgroundColor: 'rgba(102, 0, 255, 0.25)',
});

globalStyle('.ai-label .input .image-container.draggable div', {
  display: 'none',
});

globalStyle('.ai-label .input .image-container .image-inner', {
  position: 'absolute',
  inset: '0',
  overflow: 'hidden',
});

globalStyle('.ai-label .input .image-container .image-inner img.download', {
  display: 'none',
});

globalStyle('.ai-label .input .image-container .lockup', {
  fontFamily: 'Poly Sans, Helvetica, Arial, sans-serif',
  color: '#fff',
  position: 'absolute',
  inset: '0',
  zIndex: '1',
  overflow: 'hidden',
  cursor: 'move',
});

globalStyle('.ai-label .input .image-container .lockup .label', {
  position: 'absolute',
  left: '0',
  top: '0',
  zIndex: '1',
  backgroundColor: '#D6F31F',
  fontFamily: 'Poly Sans, Helvetica, Arial, sans-serif',
  color: '#000',
  padding: '8px 14px',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  fontSize: '15px',
  lineHeight: '18px',
});

globalStyle('.ai-label .input .image-container .lockup .picture', {
  position: 'absolute',
  inset: '0',
  margin: '0',
  height: '100%',
  width: '100%',
});

globalStyle('.ai-label .input .image-container .lockup .image', {
  position: 'absolute',
  inset: '0',
});

globalStyle('.ai-label .input .image-container .lockup .image .image-holder', {
  position: 'absolute',
  inset: '0',
});

globalStyle('.ai-label .input .image-container .lockup .image .image-holder .image-holder-inner', {
  width: '100%',
  height: '100%',
  textAlign: 'center',
});

globalStyle('.ai-label .input .image-container .lockup .image .image-holder .image-holder-inner img', {
  height: '100%',
  width: '100%',
  objectPosition: 'center center',
});

globalStyle('.ai-label .input .image-container .lockup .image img', {
  WebkitTransformOrigin: 'center center',
  transformOrigin: 'center center',
});

globalStyle('.ai-label .input .image-container .lockup .layer', {
  inset: '-1px',
  zIndex: '1',
  position: 'absolute',
  pointerEvents: 'none',
});
