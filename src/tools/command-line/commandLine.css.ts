import { globalStyle } from '@vanilla-extract/css';

globalStyle(".command-line-image-generator .story", {
  gap: "1rem",
});

globalStyle(".command-line-image-generator .input .edit .edit-inner label", {
  display: "block",
});

globalStyle(".command-line-image-generator .input .edit .edit-inner label span", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .edit .edit-inner label span:first-child", {
  display: "inline",
});

globalStyle(".command-line-image-generator .input .edit.selected .edit-inner label span", {
  display: "inline",
});

globalStyle(".command-line-image-generator .input .edit.selected .edit-inner label span:first-child", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .edit input[type=file]", {
  color: "transparent",
});

globalStyle(".command-line-image-generator .input .options", {
  display: "none",
  margin: "0",
  padding: "0",
});

globalStyle(".command-line-image-generator .input .options.visible", {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

globalStyle(".command-line-image-generator .input .options.visible .download", {
  display: "block",
  marginTop: "0",
});

globalStyle(".command-line-image-generator .input .options input[type=\"range\"]", {
  accentColor: "#6600FF",
});

globalStyle(".command-line-image-generator .input .options .regen", {
  backgroundColor: "#6600FF",
  padding: "0.25rem 0.75rem",
  textTransform: "uppercase",
  color: "#fff",
  fontStyle: "normal",
  fontSize: "0.75rem",
  cursor: "pointer",
  border: "2px solid #6600FF",
  flex: "1 1 0",
  borderRadius: "0.125rem",
  whiteSpace: "nowrap",
  fontWeight: "600",
  letterSpacing: "0.05rem",
  fontFamily: "Poly Sans Mono, Courier New, Courier, monospace",
  textAlign: "center",
  pointerEvents: "auto",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  width: "25%",
});

globalStyle(".command-line-image-generator .input .options .regen:hover", {
  backgroundColor: "transparent",
  color: "#6600FF",
});

globalStyle(".command-line-image-generator .input .options .ratios", {
  width: "100%",
});

globalStyle(".command-line-image-generator .input .image-container", {
  margin: "0",
  padding: "0",
  aspectRatio: "1",
  maxWidth: "500px",
  flex: "1",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  display: "block",
  order: "0",
  backgroundColor: "#f9f9f9",
});

globalStyle(".command-line-image-generator .input .image-container svg", {
  position: "absolute",
  width: "100%",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

globalStyle(".command-line-image-generator .input .image-container svg .command-line-boxes", {
  WebkitTransformOrigin: "center center",
  transformOrigin: "center center",
});

globalStyle(".command-line-image-generator .input .image-container.r1x1", {
  aspectRatio: "1",
});

globalStyle(".command-line-image-generator .input .image-container.r1x1 .r1x1", {
  display: "block",
});

globalStyle(".command-line-image-generator .input .image-container.r1x1 .r3x2", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .image-container.r3x2", {
  aspectRatio: "1.5",
  maxWidth: "750px",
});

globalStyle(".command-line-image-generator .input .image-container.r3x2 .r1x1", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .image-container.r3x2 .r3x2", {
  display: "block",
});

globalStyle(".command-line-image-generator .input .image-container.r3x2 .lockup", {
  aspectRatio: "1.5",
});

globalStyle(".command-line-image-generator .input .image-container.r3x2 .lockup .image", {
  inset: "7% 21%",
});

globalStyle(".command-line-image-generator .input .image-container.draggable", {
  border: "0.125rem dashed #6600FF",
  borderRadius: "0.5rem",
  position: "relative",
});

globalStyle(".command-line-image-generator .input .image-container.draggable:after", {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "90%",
  display: "block",
  content: "\"Drop image\"",
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  fontWeight: "600",
  fontSize: "2.5rem",
  color: "#6600FF",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

globalStyle(".command-line-image-generator .input .image-container.draggable.dragging", {
  backgroundColor: "rgba(102, 0, 255, 0.25)",
});

globalStyle(".command-line-image-generator .input .image-container.draggable div", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .image-container .image-inner", {
  position: "relative",
  overflow: "hidden",
});

globalStyle(".command-line-image-generator .input .image-container .image-inner img.download", {
  display: "none",
});

globalStyle(".command-line-image-generator .input .image-container .lockup", {
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  color: "#fff",
  position: "relative",
  zIndex: "1",
  overflow: "hidden",
  aspectRatio: "1",
  cursor: "move",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .picture", {
  position: "relative",
  margin: "0",
  height: "100%",
  width: "100%",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .image", {
  WebkitFilter: "grayscale(1)",
  filter: "grayscale(1)",
  position: "absolute",
  inset: "7%",
  width: "auto",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .image .image-holder", {
  position: "absolute",
  inset: "0",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .image .image-holder .image-holder-inner", {
  width: "100%",
  height: "100%",
  textAlign: "center",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .image .image-holder .image-holder-inner img", {
  height: "100%",
  width: "100%",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .image img", {
  WebkitTransformOrigin: "center center",
  transformOrigin: "center center",
});

globalStyle(".command-line-image-generator .input .image-container .lockup .layer", {
  inset: "-1px",
  zIndex: "1",
  position: "absolute",
  pointerEvents: "none",
});
