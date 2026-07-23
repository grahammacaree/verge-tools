import { globalStyle } from '@vanilla-extract/css';

globalStyle(".decoder-image-generator .story", {
  gap: "1rem",
});

globalStyle(".decoder-image-generator .input .edit .edit-inner label", {
  display: "block",
});

globalStyle(".decoder-image-generator .input .edit .edit-inner label span", {
  display: "none",
});

globalStyle(".decoder-image-generator .input .edit .edit-inner label span:first-child", {
  display: "inline",
});

globalStyle(".decoder-image-generator .input .edit.selected .edit-inner label span", {
  display: "inline",
});

globalStyle(".decoder-image-generator .input .edit.selected .edit-inner label span:first-child", {
  display: "none",
});

globalStyle(".decoder-image-generator .input .edit input[type=file]", {
  color: "transparent",
});

globalStyle(".decoder-image-generator .input .options", {
  display: "none",
  margin: "0",
  padding: "0",
});

globalStyle(".decoder-image-generator .input .options.visible", {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

globalStyle(".decoder-image-generator .input .options.visible .download", {
  display: "block",
  marginTop: "0",
});

globalStyle(".decoder-image-generator .input .options input[type=\"range\"]", {
  accentColor: "#6600FF",
});

globalStyle(".decoder-image-generator .input .options .regen", {
  backgroundColor: "#6600FF",
  padding: "0.25rem 0.75rem",
  textTransform: "uppercase",
  color: "#fff",
  fontStyle: "normal",
  fontSize: "0.75rem",
  cursor: "pointer",
  border: "2px solid #6600FF",
  flex: "1",
  borderRadius: "0.125rem",
  whiteSpace: "nowrap",
  fontWeight: "600",
  letterSpacing: "0.05rem",
  fontFamily: "Poly Sans Mono, Courier New, Courier, monospace",
  margin: "0.25rem 1rem 0 0",
  textAlign: "center",
  pointerEvents: "auto",
});

globalStyle(".decoder-image-generator .input .options .regen:hover", {
  backgroundColor: "transparent",
  color: "#6600FF",
});

globalStyle(".decoder-image-generator .input .image-container", {
  margin: "0",
  padding: "0",
  aspectRatio: "3/2",
  flex: "1",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  display: "block",
  order: "0",
});

globalStyle(".decoder-image-generator .input .image-container.draggable", {
  border: "0.125rem dashed #6600FF",
  borderRadius: "0.5rem",
  position: "relative",
});

globalStyle(".decoder-image-generator .input .image-container.draggable:after", {
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

globalStyle(".decoder-image-generator .input .image-container.draggable.dragging", {
  backgroundColor: "rgba(102, 0, 255, 0.25)",
});

globalStyle(".decoder-image-generator .input .image-container.draggable div", {
  display: "none",
});

globalStyle(".decoder-image-generator .input .image-container .image-inner", {
  position: "relative",
  overflow: "hidden",
});

globalStyle(".decoder-image-generator .input .image-container .image-inner img.download", {
  display: "none",
});

globalStyle(".decoder-image-generator .input .image-container .lockup", {
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  color: "#fff",
  position: "relative",
  zIndex: "1",
  overflow: "hidden",
  aspectRatio: "3/2",
  cursor: "move",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .picture", {
  position: "relative",
  margin: "0",
  height: "100%",
  width: "100%",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image", {
  WebkitFilter: "grayscale(1)",
  filter: "grayscale(1)",
  position: "absolute",
  inset: "0",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .image-holder, .decoder-image-generator .input .image-container .lockup .image .invert-holder", {
  position: "absolute",
  inset: "0",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .image-holder", {
  left: "27.5%",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .image-holder .image-holder-inner", {
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
  textAlign: "center",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .image-holder .image-holder-inner img", {
  height: "100%",
  width: "100%",
  WebkitMaskImage: "linear-gradient(to right, #000 97.5%, transparent 100%)",
  maskImage: "linear-gradient(to right, #000 97.5%, transparent 100%)",
  objectFit: "cover",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image img", {
  WebkitFilter: "saturate(0.125) brightness(0.625)",
  filter: "saturate(0.125) brightness(0.625)",
  WebkitTransformOrigin: "center center",
  transformOrigin: "center center",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .invert-holder", {
  left: "0",
  top: "0",
  bottom: "0",
  right: "72.25%",
  overflow: "hidden",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .invert-holder .invert-holder-inner", {
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
  textAlign: "right",
  float: "right",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .image .invert-holder img", {
  WebkitFilter: "invert(1) contrast(1.6) brightness(1.35)",
  filter: "invert(1) contrast(1.6) brightness(1.35)",
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer", {
  inset: "0",
  zIndex: "1",
  position: "absolute",
  pointerEvents: "none",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .big img, .decoder-image-generator .input .image-container .lockup .layer .big svg", {
  left: "100%",
  top: "50%",
  height: "100%",
  width: "auto",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  position: "absolute",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small", {
  position: "absolute",
  width: "calc(100% / 3)",
  top: "0",
  left: "0",
  bottom: "0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col", {
  flex: "1",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem 1rem",
  maxWidth: "calc(100%/3)",
  justifyContent: "space-evenly",
  margin: "auto",
  height: "100%",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col .column", {
  width: "100%",
  aspectRatio: "1",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col .column.slash", {
  backgroundImage: `url("${import.meta.env.BASE_URL}images/decoder/Dash.svg")`,
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col .column.x", {
  backgroundImage: `url("${import.meta.env.BASE_URL}images/decoder/X.svg")`,
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col .column.filled", {
  backgroundImage: `url("${import.meta.env.BASE_URL}images/decoder/Square.svg")`,
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col .column.square", {
  backgroundImage: `url("${import.meta.env.BASE_URL}images/decoder/Outline.svg")`,
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col.between", {
  justifyContent: "space-between",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col.around", {
  justifyContent: "space-around",
});

globalStyle(".decoder-image-generator .input .image-container .lockup .layer .small .col.even", {
  justifyContent: "space-evenly",
});
