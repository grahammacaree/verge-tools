import { globalStyle } from '@vanilla-extract/css';

globalStyle(".verge-filter-generator .story", {
  gap: "1rem",
});

globalStyle(".verge-filter-generator .input .edit .edit-inner label", {
  display: "block",
});

globalStyle(".verge-filter-generator .input .edit .edit-inner label span", {
  display: "none",
});

globalStyle(".verge-filter-generator .input .edit .edit-inner label span:first-child", {
  display: "inline",
});

globalStyle(".verge-filter-generator .input .edit.selected .edit-inner label span", {
  display: "inline",
});

globalStyle(".verge-filter-generator .input .edit.selected .edit-inner label span:first-child", {
  display: "none",
});

globalStyle(".verge-filter-generator .input .edit input[type=file]", {
  color: "transparent",
});

globalStyle(".verge-filter-generator .input .options", {
  display: "none",
  margin: "0",
  padding: "0",
});

globalStyle(".verge-filter-generator .input .options.visible", {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

globalStyle(".verge-filter-generator .input .options.visible .download", {
  display: "block",
  marginTop: "0",
});

globalStyle(".verge-filter-generator .input .options input[type=\"range\"]", {
  accentColor: "#6600FF",
});

globalStyle(".verge-filter-generator .input .options .regen", {
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

globalStyle(".verge-filter-generator .input .options .regen:hover", {
  backgroundColor: "transparent",
  color: "#6600FF",
});

globalStyle(".verge-filter-generator .input .options .ratios", {
  width: "100%",
});

globalStyle(".verge-filter-generator .input .image-container", {
  margin: "0",
  padding: "0",
  flex: "1",
  maxWidth: "750px",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  display: "block",
  order: "0",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#f9f9f9",
});

globalStyle(".verge-filter-generator .input .image-container.r1x1", {
  aspectRatio: "1",
  maxWidth: "500px",
});

globalStyle(".verge-filter-generator .input .image-container.r2x3", {
  aspectRatio: "2 / 3",
  maxWidth: "500px",
});

globalStyle(".verge-filter-generator .input .image-container.r3x2", {
  aspectRatio: "3 / 2",
  maxWidth: "750px",
});

globalStyle(".verge-filter-generator .input .image-container.r5x4", {
  aspectRatio: "5 / 4",
  maxWidth: "750px",
});

globalStyle(".verge-filter-generator .input .image-container.r16x9", {
  aspectRatio: "16 / 9",
  maxWidth: "750px",
});

globalStyle(".verge-filter-generator .input .image-container.auto", {
  maxWidth: "750px",
});

globalStyle(".verge-filter-generator .input .image-container svg", {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
});

globalStyle(".verge-filter-generator .input .image-container.draggable", {
  border: "0.125rem dashed #6600FF",
  borderRadius: "0.5rem",
  position: "relative",
});

globalStyle(".verge-filter-generator .input .image-container.draggable:after", {
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

globalStyle(".verge-filter-generator .input .image-container.draggable.dragging", {
  backgroundColor: "rgba(102, 0, 255, 0.25)",
});

globalStyle(".verge-filter-generator .input .image-container.draggable div", {
  display: "none",
});

globalStyle(".verge-filter-generator .input .image-container .image-inner", {
  position: "absolute",
  inset: "0",
  overflow: "hidden",
});

globalStyle(".verge-filter-generator .input .image-container .image-inner img.download", {
  display: "none",
});

globalStyle(".verge-filter-generator .input .image-container .lockup", {
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  color: "#fff",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  overflow: "hidden",
  cursor: "move",
});

globalStyle(".verge-filter-generator .input .image-container .lockup .picture", {
  position: "absolute",
  inset: "0",
  margin: "0",
  height: "100%",
  width: "100%",
});

globalStyle(".verge-filter-generator .input .image-container .lockup .layer", {
  inset: "-1px",
  zIndex: "1",
  position: "absolute",
  pointerEvents: "none",
});

globalStyle(".verge-filter-generator .input .image-container .lockup .image, .verge-filter-generator .input .image-container .lockup .image-holder, .verge-filter-generator .input .image-container .lockup .image-holder-inner", {
  position: "absolute",
  inset: "0",
  height: "100%",
  width: "100%",
});
