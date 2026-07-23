import { globalStyle } from '@vanilla-extract/css';

globalStyle(".installer-image-generator .edit", {
  marginTop: "1rem",
});

globalStyle(".installer-image-generator .edit .edit-inner div label", {
  display: "block",
  gap: "0.25rem",
});

globalStyle(".installer-image-generator .edit .edit-inner div label span", {
  display: "none",
});

globalStyle(".installer-image-generator .edit .edit-inner div label span:first-child", {
  display: "inline",
});

globalStyle(".installer-image-generator .edit.selected .edit-inner label span", {
  display: "inline",
});

globalStyle(".installer-image-generator .edit.selected .edit-inner label span:first-child", {
  display: "none",
});

globalStyle(".installer-image-generator .edit input[type=file]", {
  color: "transparent",
});

globalStyle(".installer-image-generator .options-top", {
  display: "grid",
  msGridColumns: "1fr",
  gridTemplateColumns: "1fr",
  marginBottom: "1.5rem",
  gap: "1rem",
  width: "auto",
  maxWidth: "1100px",
  marginLeft: "0",
});

globalStyle(".installer-image-generator .options-top .images, .installer-image-generator .options-top .patterns", {
  display: "flex",
  gap: "0.5rem",
  fontSize: "0.875rem",
});

globalStyle(".installer-image-generator .options-top .images .label, .installer-image-generator .options-top .patterns .label", {
  fontWeight: "600",
  flex: "0",
  whiteSpace: "nowrap",
  WebkitTransform: "translateY(0.175rem)",
  transform: "translateY(0.175rem)",
});

globalStyle(".installer-image-generator .options-top .images .number span, .installer-image-generator .options-top .patterns .number span", {
  display: "inline-block",
  height: "0.875rem",
  width: "0.875rem",
  marginLeft: "0.5rem",
  border: "2px solid #000",
  backgroundColor: "#000",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  borderRadius: "0.075rem",
  WebkitTransform: "translateY(0.125rem)",
  transform: "translateY(0.125rem)",
});

globalStyle(".installer-image-generator .options-top .images .entry, .installer-image-generator .options-top .patterns .entry", {
  textAlign: "center",
  flex: "1",
});

globalStyle(".installer-image-generator .options-top .images .entry .inner, .installer-image-generator .options-top .patterns .entry .inner", {
  display: "inline-block",
  padding: "0.075rem 0.25rem 0.125rem",
  opacity: "0.625",
  cursor: "pointer",
  borderRadius: "0.125rem",
  border: "2px solid #fff",
});

globalStyle(".installer-image-generator .options-top .images .entry .inner:hover, .installer-image-generator .options-top .images .entry .inner.selected, .installer-image-generator .options-top .patterns .entry .inner:hover, .installer-image-generator .options-top .patterns .entry .inner.selected", {
  opacity: "1",
  borderColor: "rgba(102, 0, 255, 0.2)",
});

globalStyle(".installer-image-generator .options-top .images .entry .inner.selected, .installer-image-generator .options-top .patterns .entry .inner.selected", {
  backgroundColor: "rgba(102, 0, 255, 0.2)",
  borderColor: "transparent",
});

globalStyle(".installer-image-generator .options-top .images.patterns, .installer-image-generator .options-top .patterns.patterns", {
  gap: "1.25rem",
});

globalStyle(".installer-image-generator .options-top .images.patterns .swap, .installer-image-generator .options-top .patterns.patterns .swap", {
  fontWeight: "normal",
  marginTop: "0.5rem",
  fontSize: "0.75rem",
  fontStyle: "italic",
  display: "block",
});

globalStyle(".installer-image-generator .options-top .images .pattern .inner, .installer-image-generator .options-top .patterns .pattern .inner", {
  width: "100%",
  aspectRatio: "16/9",
  overflow: "hidden",
});

globalStyle(".installer-image-generator .options-top .images .pattern .inner img, .installer-image-generator .options-top .patterns .pattern .inner img", {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

globalStyle(".installer-image-generator .options-top .images .pattern .inner svg, .installer-image-generator .options-top .patterns .pattern .inner svg", {
  width: "100%",
  height: "auto",
});

globalStyle(".installer-image-generator .options-top .images .pattern .inner svg path, .installer-image-generator .options-top .patterns .pattern .inner svg path", {
  fill: "#282828",
  stroke: "#282828",
});

globalStyle(".installer-image-generator .options-top .images .pattern .inner svg polygon.cls-3, .installer-image-generator .options-top .patterns .pattern .inner svg polygon.cls-3", {
  fill: "#282828",
});

globalStyle(".installer-image-generator .installer-container", {
  width: "100%",
  aspectRatio: "16/9",
  margin: "0",
  position: "relative",
});

globalStyle(".installer-image-generator .installer-container .decoration", {
  position: "absolute",
  inset: "0",
  overflow: "hidden",
  pointerEvents: "none",
});

globalStyle(".installer-image-generator .installer-container .decoration svg", {
  display: "none",
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
});

globalStyle(".installer-image-generator .installer-container.background-1", {
  backgroundColor: "#282828",
});

globalStyle(".installer-image-generator .installer-container.background-1 .decoration svg:nth-child(1)", {
  display: "block",
});

globalStyle(".installer-image-generator .installer-container.background-1.alt-color", {
  backgroundColor: "#3cffd0",
});

globalStyle(".installer-image-generator .installer-container.background-1.alt-color .mosaic .top-bar, .installer-image-generator .installer-container.background-1.alt-color .mosaic .bottom-bar", {
  backgroundColor: "#282828",
});

globalStyle(".installer-image-generator .installer-container.background-1.alt-color .mosaic .top-bar:before, .installer-image-generator .installer-container.background-1.alt-color .mosaic .top-bar:after, .installer-image-generator .installer-container.background-1.alt-color .mosaic .bottom-bar:before, .installer-image-generator .installer-container.background-1.alt-color .mosaic .bottom-bar:after", {
  backgroundColor: "#282828",
});

globalStyle(".installer-image-generator .installer-container.background-2", {
  backgroundColor: "#282828",
});

globalStyle(".installer-image-generator .installer-container.background-2 .decoration svg:nth-child(2)", {
  display: "block",
});

globalStyle(".installer-image-generator .installer-container.background-2 .decoration svg:nth-child(2) polygon", {
  fill: "#3cffd0",
});

globalStyle(".installer-image-generator .installer-container.background-2 .mosaic .top-bar, .installer-image-generator .installer-container.background-2 .mosaic .bottom-bar", {
  backgroundColor: "#fff",
});

globalStyle(".installer-image-generator .installer-container.background-2 .mosaic .top-bar:before, .installer-image-generator .installer-container.background-2 .mosaic .top-bar:after, .installer-image-generator .installer-container.background-2 .mosaic .bottom-bar:before, .installer-image-generator .installer-container.background-2 .mosaic .bottom-bar:after", {
  backgroundColor: "#fff",
});

globalStyle(".installer-image-generator .installer-container.background-2.alt-color", {
  backgroundColor: "#3cffd0",
});

globalStyle(".installer-image-generator .installer-container.background-2.alt-color .decoration svg:nth-child(2) polygon", {
  fill: "#beb5ba",
});

globalStyle(".installer-image-generator .installer-container.background-2.alt-color .mosaic .top-bar, .installer-image-generator .installer-container.background-2.alt-color .mosaic .bottom-bar", {
  backgroundColor: "#fff",
});

globalStyle(".installer-image-generator .installer-container.background-2.alt-color .mosaic .top-bar:before, .installer-image-generator .installer-container.background-2.alt-color .mosaic .top-bar:after, .installer-image-generator .installer-container.background-2.alt-color .mosaic .bottom-bar:before, .installer-image-generator .installer-container.background-2.alt-color .mosaic .bottom-bar:after", {
  backgroundColor: "#fff",
});

globalStyle(".installer-image-generator .installer-container.background-3", {
  backgroundColor: "#282828",
});

globalStyle(".installer-image-generator .installer-container.background-3 .decoration svg:nth-child(3)", {
  display: "block",
});

globalStyle(".installer-image-generator .installer-container.background-3.alt-color", {
  backgroundColor: "#3cffd0",
});

globalStyle(".installer-image-generator .installer-container.background-3.alt-color .mosaic .top-bar, .installer-image-generator .installer-container.background-3.alt-color .mosaic .bottom-bar", {
  backgroundColor: "#beb5ba",
});

globalStyle(".installer-image-generator .installer-container.background-3.alt-color .mosaic .top-bar:before, .installer-image-generator .installer-container.background-3.alt-color .mosaic .top-bar:after, .installer-image-generator .installer-container.background-3.alt-color .mosaic .bottom-bar:before, .installer-image-generator .installer-container.background-3.alt-color .mosaic .bottom-bar:after", {
  backgroundColor: "#beb5ba",
});

globalStyle(".installer-image-generator .installer-container.background-3.alt-color .decoration svg path", {
  stroke: "#fff",
  fill: "#fff",
});

globalStyle(".installer-image-generator .installer-container.background-3.alt-color .decoration svg polygon.cls-3", {
  fill: "#fff",
});

globalStyle(".installer-image-generator .installer-container .mosaic", {
  position: "absolute",
  aspectRatio: "1.25",
  top: "50%",
  left: "50%",
  height: "60%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar, .installer-image-generator .installer-container .mosaic .bottom-bar", {
  position: "absolute",
  left: "-2rem",
  right: "-2rem",
  height: "2rem",
  backgroundColor: "#3cffd0",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar:before, .installer-image-generator .installer-container .mosaic .top-bar:after, .installer-image-generator .installer-container .mosaic .bottom-bar:before, .installer-image-generator .installer-container .mosaic .bottom-bar:after", {
  content: "\"\"",
  position: "absolute",
  display: "block",
  width: "2rem",
  backgroundColor: "#3cffd0",
  height: "1.5rem",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar:before, .installer-image-generator .installer-container .mosaic .bottom-bar:before", {
  left: "0",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar:after, .installer-image-generator .installer-container .mosaic .bottom-bar:after", {
  right: "0",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar", {
  bottom: "100%",
});

globalStyle(".installer-image-generator .installer-container .mosaic .top-bar:before, .installer-image-generator .installer-container .mosaic .top-bar:after", {
  top: "calc(100% - 1px)",
});

globalStyle(".installer-image-generator .installer-container .mosaic .bottom-bar", {
  top: "100%",
});

globalStyle(".installer-image-generator .installer-container .mosaic .bottom-bar:before, .installer-image-generator .installer-container .mosaic .bottom-bar:after", {
  bottom: "calc(100% - 1px)",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group", {
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  position: "absolute",
  inset: "0",
  zIndex: "1",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .left, .installer-image-generator .installer-container .mosaic .image-group .right", {
  height: "100%",
  width: "100%",
  flex: "1 1 auto",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container", {
  display: "block",
  padding: "0",
  margin: "0",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  position: "relative",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container.draggable", {
  border: "0.125rem dashed #6600FF",
  borderRadius: "0.5rem",
  position: "relative",
  backgroundColor: "#fff",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container.draggable.active:before", {
  inset: "-3px",
  borderRadius: "0.5rem",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container.draggable:after", {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "90%",
  display: "block",
  content: "\"Drop image\"",
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  fontWeight: "600",
  fontSize: "1.25rem",
  color: "#6600FF",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container.draggable.dragging", {
  backgroundColor: "rgba(102, 0, 255, 0.25)",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container.draggable div", {
  display: "none",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image-inner", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .picture", {
  position: "relative",
  margin: "0",
  height: "100%",
  width: "100%",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image", {
  position: "absolute",
  inset: "0%",
  width: "auto",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image .image-holder", {
  position: "absolute",
  inset: "0",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image .image-holder .image-holder-inner", {
  width: "100%",
  height: "100%",
  textAlign: "center",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image .image-holder .image-holder-inner img", {
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .image-container .image img", {
  WebkitTransformOrigin: "center center",
  transformOrigin: "center center",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group .right, .installer-image-generator .installer-container .mosaic .image-group .left", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group.one .right", {
  display: "none",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group.two .right .image-container:last-child", {
  display: "none",
});

globalStyle(".installer-image-generator .installer-container .mosaic .image-group:not(.four) .left .image-container:last-child", {
  display: "none",
});

globalStyle(".installer-image-generator .options", {
  display: "none",
  margin: "0",
  padding: "1rem 0 0",
});

globalStyle(".installer-image-generator .options.visible", {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

globalStyle(".installer-image-generator .options.visible .download", {
  display: "block",
  marginTop: "0",
});

globalStyle(".installer-image-generator .options input[type=\"range\"]", {
  accentColor: "#6600FF",
});

globalStyle(".installer-image-generator .options .regen", {
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

globalStyle(".installer-image-generator .options .regen:hover", {
  backgroundColor: "transparent",
  color: "#6600FF",
});

globalStyle(".installer-image-generator .options .ratios", {
  width: "100%",
});
