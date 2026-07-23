import { globalStyle } from '@vanilla-extract/css';

globalStyle("a.download", {
  margin: "2rem auto 0.5rem",
  padding: "0.75rem",
  backgroundColor: "var(--brand-color)",
  textTransform: "uppercase",
  color: "#fff",
  textAlign: "center",
  fontSize: "1.5rem",
  border: "0.125rem solid var(--brand-color)",
  cursor: "pointer",
  fontFamily: "var(--spec-font)",
  borderRadius: "0.25rem",
  whiteSpace: "nowrap",
  fontWeight: "600",
  letterSpacing: "0.075em",
  display: "none",
  width: "100%",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  textDecoration: "none",
  opacity: "0.5",
  pointerEvents: "none",
});

globalStyle("a.download.active", {
  pointerEvents: "auto",
  opacity: "1",
});

globalStyle("a.download.visible", {
  display: "block",
});

globalStyle("a.download:hover", {
  backgroundColor: "#fff",
  color: "var(--brand-color)",
  textDecoration: "none",
});

globalStyle("a.download span", {
  display: "none",
});

globalStyle("a.download span:first-child", {
  display: "inline",
});

globalStyle("a.download span:nth-child(n+3)", {
  WebkitAnimation: "2s ease-in-out infinite downloading",
  animation: "2s ease-in-out infinite downloading",
});

globalStyle("a.download span:nth-child(3)", {
  WebkitAnimationDelay: "calc(2s / 3)",
  animationDelay: "calc(2s / 3)",
});

globalStyle("a.download span:nth-child(4)", {
  WebkitAnimationDelay: "calc(4s / 3)",
  animationDelay: "calc(4s / 3)",
  marginLeft: "-0.4rem",
  marginRight: "-0.4rem",
});

globalStyle("a.download.downloading", {
  cursor: "default",
  pointerEvents: "none",
  opacity: "0.9",
});

globalStyle("a.download.downloading span", {
  display: "inline-block",
});

globalStyle("a.download.downloading span:first-child", {
  display: "none",
});

globalStyle(".tool", {
  display: "none",
});

globalStyle(".tool.active", {
  display: "block",
});

globalStyle(".zoom-slider, .brightness-slider, .contrast-slider", {
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexWrap: "nowrap",
  gap: "0.5rem",
  minWidth: "0",
});

globalStyle(".zoom-slider label, .brightness-slider label, .contrast-slider label", {
  flex: "0 0 auto",
  textAlign: "center",
  whiteSpace: "nowrap",
  fontSize: "0.75rem",
  fontWeight: "600",
});

globalStyle(".zoom-slider label svg, .brightness-slider label svg, .contrast-slider label svg", {
  maxHeight: "1rem",
  maxWidth: "1rem",
  display: "block",
});

globalStyle(".zoom-slider label svg path, .brightness-slider label svg path, .contrast-slider label svg path", {
  fill: "var(--brand-color)",
});

globalStyle(
  ".zoom-slider input[type=\"range\"], .brightness-slider input[type=\"range\"], .contrast-slider input[type=\"range\"]",
  {
    flex: "1",
    minWidth: "0",
    width: "100%",
    height: "1rem",
    margin: "0",
    accentColor: "var(--brand-color)",
  },
);

globalStyle(".pannable:not([data-zoom=\"1\"])", {
  cursor: "move",
  touchAction: "none",
});

globalStyle(".pannable[data-zoom=\"1\"]", {
  cursor: "crosshair",
});

globalStyle(".pannable[data-zoom=\"1\"][data-cover-pan=\"1\"]", {
  cursor: "move",
  touchAction: "none",
});

globalStyle(".pannable.is-panning img, .pannable.is-panning .verge-filter-svg", {
  willChange: "transform",
});

globalStyle(".pannable.is-panning img", {
  willChange: "transform, object-position",
});

globalStyle(".pannable img", {
  pointerEvents: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  OObjectPosition: "50% 50%",
  objectPosition: "50% 50%",
});

globalStyle(".image-container.selectable:not(.image-selected) .pannable", {
  cursor: "pointer",
});

globalStyle(".tool.title .tool-selector", {
  listStyle: "none",
  display: "grid",
  gap: "1rem",
  padding: "0",
  margin: "0",
  msGridColumns: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr",
});

globalStyle(".tool.title .tool-selector li", {
  flex: "1",
  aspectRatio: "1",
  backgroundColor: "#F9F9F9",
  fontSize: "1.5rem",
  fontWeight: "600",
  fontFamily: "var(--hed-font)",
  position: "relative",
  color: "#090909",
  cursor: "pointer",
  border: "0.075rem solid #CECECE",
});

globalStyle(".tool.title .tool-selector li span", {
  position: "absolute",
  maxWidth: "92%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  textAlign: "center",
});

globalStyle(".tool.title .tool-selector li:hover", {
  borderColor: "var(--brand-color)",
  color: "var(--brand-color)",
});

globalStyle(".input", {
  fontFamily: "var(--hed-font)",
  marginBottom: "4rem",
});

globalStyle(".input .options", {
  display: "grid",
  msGridColumns: "4fr 3fr",
  gridTemplateColumns: "4fr 3fr",
  marginBottom: "0.5rem",
  gap: "1rem",
  width: "auto",
  maxWidth: "1100px",
  marginLeft: "0",
});

globalStyle(".input .options .colors, .input .options .ratios, .input .options .languages", {
  display: "flex",
  gap: "0.5rem",
  fontSize: "0.875rem",
});

globalStyle(".input .options .colors .label, .input .options .ratios .label, .input .options .languages .label", {
  fontWeight: "600",
  flex: "0",
  whiteSpace: "nowrap",
  WebkitTransform: "translateY(0.175rem)",
  transform: "translateY(0.175rem)",
});

globalStyle(".input .options .colors .color span, .input .options .ratios .color span, .input .options .languages .color span", {
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

globalStyle(".input .options .colors .entry, .input .options .ratios .entry, .input .options .languages .entry", {
  textAlign: "center",
  flex: "1",
});

globalStyle(".input .options .colors .entry .inner, .input .options .ratios .entry .inner, .input .options .languages .entry .inner", {
  display: "inline-block",
  padding: "0.075rem 0.25rem 0.125rem",
  opacity: "0.625",
  cursor: "pointer",
  borderRadius: "0.125rem",
  border: "2px solid #fff",
});

globalStyle(".input .options .colors .entry .inner:hover, .input .options .colors .entry .inner.selected, .input .options .ratios .entry .inner:hover, .input .options .ratios .entry .inner.selected, .input .options .languages .entry .inner:hover, .input .options .languages .entry .inner.selected", {
  opacity: "1",
  borderColor: "var(--brand-color)",
});

globalStyle(".input .options .colors .entry.selected .inner, .input .options .ratios .entry.selected .inner, .input .options .languages .entry.selected .inner", {
  backgroundColor: "var(--brand-color)",
  color: "#fff",
});

globalStyle(".input .options .colors .entry.selected .inner span, .input .options .ratios .entry.selected .inner span, .input .options .languages .entry.selected .inner span", {
  borderColor: "#fff",
});

globalStyle(".input .url-fetcher", {
  padding: "0.25rem 0.75rem",
  textTransform: "uppercase",
  color: "red",
  fontSize: "0.75rem",
  cursor: "pointer",
  border: "2px solid red",
  flex: "0",
  borderRadius: "0.125rem",
  whiteSpace: "nowrap",
  fontWeight: "600",
  letterSpacing: "0.05rem",
  fontFamily: "var(--spec-font)",
  opacity: "0.5",
  pointerEvents: "none",
});

globalStyle(".input .url-fetcher.active", {
  opacity: "1",
  pointerEvents: "auto",
  backgroundColor: "var(--brand-color)",
  color: "#fff",
  borderColor: "var(--brand-color)",
});

globalStyle(".input .url-fetcher:hover", {
  backgroundColor: "transparent",
  color: "var(--brand-color)",
});

globalStyle(".input .url-container", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: "1rem",
  width: "auto",
  maxWidth: "1100px",
  marginLeft: "0",
});

globalStyle(".input .url-container input", {
  flex: "1",
});

globalStyle(".input .bottom", {
  display: "flex",
  width: "100%",
  maxWidth: "1100px",
  marginLeft: "auto",
  marginRight: "auto",
});

globalStyle(".input .bottom .right", {
  width: "35%",
  order: "0",
  display: "flex",
  flexDirection: "column",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner", {
  aspectRatio: "16/9",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .byline", {
  marginBottom: "0.25rem",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .date", {
  marginTop: "0.25rem",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .picture", {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "125%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  aspectRatio: "16/9",
  margin: "0",
  zIndex: "0",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .picture .image", {
  position: "absolute",
  inset: "0",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .picture img", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: "0.2",
  WebkitFilter: "saturate(0.25)",
  filter: "saturate(0.25)",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .picture .credit", {
  WebkitTransform: "none",
  transform: "none",
  right: "0.25rem",
  bottom: "0.25rem",
  top: "auto",
  left: "auto",
  zIndex: "1",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .picture.hidden", {
  display: "none",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .lockup", {
  position: "absolute",
  width: "80%",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .lockup .headline", {
  lineHeight: "0.925",
  marginBottom: "0.75rem",
  vars: {
    "--base-font-size": "2.625rem"
  },
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner .logo", {
  right: "auto",
  left: "-2.5%",
  top: "0",
  width: "50%",
  opacity: "0.25",
});

globalStyle(".input .bottom.r16x9 .image-container .image-inner.hide-bg .picture", {
  display: "none",
});

globalStyle(".input .bottom.r9x16 .edit-type-eyebrow", {
  display: "none",
});

globalStyle(".input .bottom.r9x16 .edit-type-image .background", {
  display: "none",
});

globalStyle(".input .bottom.r9x16 .sticky", {
  position: "sticky",
  top: "0",
});

globalStyle(".input .bottom.r9x16 .right", {
  paddingBottom: "2rem",
  paddingRight: "1rem",
  paddingTop: "1rem",
});

globalStyle(".input .bottom.r16x9", {
  flexDirection: "column",
});

globalStyle(".input .bottom.r16x9 .right", {
  padding: "0",
  width: "100%",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".input .bottom.r16x9 .right .download", {
  marginTop: "1rem",
});

globalStyle(".input .bottom.r16x9 .right .edit", {
  maxWidth: "none",
});

globalStyle(".input .bottom.r16x9 .right .edit .edit-label", {
  maxWidth: "none",
});

globalStyle(".input .bottom.r16x9 .right .edit .edit-inner", {
  display: "grid",
  msGridColumns: "1fr 1fr",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  maxWidth: "none",
});

globalStyle(".input .bottom.r16x9 .right .edit .edit-inner .edit-type-headline label", {
  marginBottom: "0.0725rem",
});

globalStyle(".input .bottom.r16x9 .image-container", {
  order: "0",
});

globalStyle(".input .bottom.r16x9 .edit-type-image label:nth-child(1)", {
  marginBottom: "0.125rem",
});

globalStyle(".input .bottom.r16x9 #image", {
  marginTop: "-1rem",
});

globalStyle(".input .bottom.c000000 .image-container .image-inner", {
  backgroundColor: "#000000",
});

globalStyle(".input .bottom.c000000 .image-container .image-inner .logo svg path", {
  fill: "#2c2c2c",
});

globalStyle(".input .bottom.c000000.r16x9 .image-container .image-inner .logo svg path", {
  fill: "#ffffff",
});

globalStyle(".input .bottom.c000000 .image-container .image-inner .lockup .eyebrow, .input .bottom.c000000 .image-container .image-inner .lockup .byline, .input .bottom.c000000 .image-container .image-inner .lockup .date", {
  color: "#3cffd0",
});

globalStyle(".input .bottom.cffffff .image-container .image-inner", {
  backgroundColor: "#ffffff",
  WebkitBoxShadow: "0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.25), 0 0 25px rgba(0, 0, 0, 0.15)",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.25), 0 0 25px rgba(0, 0, 0, 0.15)",
});

globalStyle(".input .bottom.cffffff .image-container .image-inner .logo svg path", {
  fill: "#3cffd0",
});

globalStyle(".input .bottom.cffffff .image-container .image-inner .lockup", {
  color: "#000",
});

globalStyle(".input .bottom.cffffff .image-container .image-inner .lockup .eyebrow, .input .bottom.cffffff .image-container .image-inner .lockup .byline, .input .bottom.cffffff .image-container .image-inner .lockup .date", {
  color: "var(--brand-color)",
});

globalStyle(".input .bottom.cffffff .image-container .image-inner .picture .credit", {
  color: "rgba(0, 0, 0, 0.5)",
});

globalStyle(".input .bottom.cffffff.r16x9 .image-container .logo svg path", {
  fill: "#090909",
});

globalStyle(".input .bottom.cffffff.r16x9 .image-container .image-inner .picture img", {
  opacity: "0.1",
  WebkitFilter: "saturate(0.175)",
  filter: "saturate(0.175)",
});

globalStyle(".input .bottom.c6600FF .image-container .image-inner", {
  backgroundColor: "var(--brand-color)",
});

globalStyle(".input .bottom.c6600FF .image-container .image-inner .logo svg path", {
  fill: "#3c04bc",
});

globalStyle(".input .bottom.c6600FF.r16x9 .image-container .image-inner .logo svg path", {
  fill: "#ffffff",
});

globalStyle(".input .bottom.c6600FF .image-container .image-inner .lockup .eyebrow, .input .bottom.c6600FF .image-container .image-inner .lockup .byline, .input .bottom.c6600FF .image-container .image-inner .lockup .date", {
  color: "#3cffd0",
});

globalStyle(".input .bottom.r9x16 .image-container .image-inner", {
  aspectRatio: "9/16",
  marginLeft: "auto",
  marginRight: "auto",
});

globalStyle(".input .bottom.r9x16 .image-container .image-inner .logo", {
  display: "block",
});

globalStyle(".input .bottom.r9x16 .image-container .image-inner .lockup", {
  padding: "20% 16.6667% 0 5.5%",
});

globalStyle(".input .bottom.r9x16 .image-container .image-inner .lockup .eyebrow", {
  display: "none",
});

globalStyle(".input .bottom.r9x16 .image-container .image-inner .picture .image", {
  aspectRatio: "1",
});

globalStyle(".input .image-container", {
  margin: "1rem 0",
  padding: "1rem 0",
  display: "none",
  order: "1",
  flex: "1",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

globalStyle(".input .image-container.image-selected", {
  position: "relative",
});

globalStyle(".input .image-container.image-selected:before", {
  position: "absolute",
  inset: "0",
  outline: "5px auto -webkit-focus-ring-color",
  content: "\"\"",
  display: "block",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".input .image-container.visible", {
  display: "block",
});

globalStyle(".input .image-container .image-inner", {
  position: "relative",
  overflow: "hidden",
});

globalStyle(".input .image-container .logo", {
  position: "absolute",
  width: "87.5%",
  top: "0.75rem",
  right: "0",
  zIndex: "1",
});

globalStyle(".input .image-container .logo svg", {
  width: "100%",
});

globalStyle(".input .image-container .lockup", {
  fontFamily: "var(--hed-font)",
  color: "#fff",
  position: "relative",
  zIndex: "1",
});

globalStyle(".input .image-container .lockup .headline", {
  fontSize: "var(--calc-font-size)",
  letterSpacing: "-.02em",
  lineHeight: "1.04",
  margin: "0.25rem auto 0.5rem",
  fontWeight: "900",
  vars: {
    "--base-font-size": "1.45rem",
    "--slider-percent": "50",
    "--calc-font-size": "calc(var(--base-font-size) + (var(--slider-percent) * 0.01 * 1rem))"
  },
});

globalStyle(".input .image-container .lockup .eyebrow, .input .image-container .lockup .byline, .input .image-container .lockup .date", {
  fontSize: "0.8rem",
  margin: "0.5rem 0",
});

globalStyle(".input .image-container .lockup .byline, .input .image-container .lockup .date", {
  fontSize: "1rem",
});

globalStyle(".input .image-container .lockup .eyebrow", {
  textTransform: "uppercase",
  fontFamily: "var(--spec-font)",
  letterSpacing: ".12em",
  fontSize: "0.7rem",
  fontWeight: "500",
});

globalStyle(".input .image-container .lockup .eyebrow .divider", {
  fontWeight: "900",
  margin: "0 0.25rem",
  display: "inline-block",
  WebkitTransform: "scale(1.25)",
  transform: "scale(1.25)",
});

globalStyle(".input .image-container .lockup .byline", {
  fontWeight: "600",
});

globalStyle(".input .image-container .lockup .byline:before", {
  content: "\"by \"",
  fontWeight: "300",
});

globalStyle(".input .image-container .picture", {
  position: "relative",
  marginTop: "1.25rem",
  marginRight: "-21.5%",
  zIndex: "0",
});

globalStyle(".input .image-container .picture .credit", {
  fontFamily: "var(--spec-font)",
  position: "absolute",
  fontSize: "0.65rem",
  letterSpacing: ".01em",
  fontWeight: "100",
  top: "0",
  left: "0",
  WebkitTransform: "rotate(90deg) translateY(0.1rem)",
  transform: "rotate(90deg) translateY(0.1rem)",
  WebkitTransformOrigin: "left top",
  transformOrigin: "left top",
  color: "rgba(255, 255, 255, 0.75)",
  whiteSpace: "nowrap",
});

globalStyle(".input .image-container .picture .image", {
  width: "100%",
  position: "relative",
});

globalStyle(".input .image-container .picture .image img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  OObjectPosition: "center center",
  objectPosition: "center center",
});

globalStyle(".input .edit", {
  display: "none",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
});

globalStyle(".input .edit.visible", {
  display: "block",
});

globalStyle(".input .edit .edit-label", {
  position: "relative",
  textAlign: "center",
  fontSize: "0.875rem",
});

globalStyle(".input .edit .edit-label:before", {
  position: "absolute",
  top: "50%",
  height: "0.075rem",
  backgroundColor: "var(--brand-color)",
  content: "\"\"",
  display: "block",
  WebkitTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
  left: "0",
  right: "0",
});

globalStyle(".input .edit .edit-label .inner", {
  fontWeight: "600",
  display: "inline-block",
  backgroundColor: "#fff",
  padding: "0.5rem",
  position: "relative",
  zIndex: "1",
});

globalStyle(".input .edit .edit-inner", {
  flexDirection: "column",
  gap: "0.5rem",
  fontSize: "0.875rem",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
});

globalStyle(".input .edit .edit-inner div", {
  flex: "1",
  width: "100%",
});

globalStyle(".input .edit .edit-inner div.hidden", {
  display: "none",
});

globalStyle(".input .edit .edit-inner div label", {
  fontWeight: "600",
  marginBottom: "0.25rem",
  display: "flex",
  gap: "1rem",
  pointerEvents: "none",
});

globalStyle(".input .edit .edit-inner div label .background", {
  flex: "1",
  textAlign: "right",
});

globalStyle(".input .edit .edit-inner div label .background label", {
  display: "inline-block",
  WebkitTransform: "translateY(-0.25rem)",
  transform: "translateY(-0.25rem)",
});

globalStyle(".input .edit .edit-inner div label .background input", {
  width: "1rem",
  marginLeft: "0.5rem",
});

globalStyle(".input .edit .edit-inner div label label", {
  whiteSpace: "nowrap",
  flex: "1",
  marginLeft: "-0.5rem",
  fontWeight: "normal",
  fontSize: "0.65rem",
  fontStyle: "italic",
  WebkitTransform: "translateY(0.175rem)",
  transform: "translateY(0.175rem)",
});

globalStyle(".input .edit .edit-inner div label ul", {
  flex: "1",
  margin: "-0.125rem 0 0",
  listStyleType: "none",
});

globalStyle(".input .edit .edit-inner div label ul li", {
  display: "inline-block",
  padding: "0.075rem 0.25rem 0.125rem",
  opacity: "0.625",
  borderRadius: "0.125rem",
  backgroundColor: "rgba(var(--brand-color), 0.2)",
  fontFamily: "var(--spec-font)",
  letterSpacing: "0.01em",
  fontSize: "0.65rem",
  textTransform: "uppercase",
  fontWeight: "100",
  marginRight: "0.5rem",
  marginTop: "0.125rem",
});

globalStyle(".input .edit .edit-inner div label ul li .close", {
  display: "inline-block",
  cursor: "pointer",
  marginLeft: "0.125rem",
  fontSize: "0.75rem",
  fontWeight: "900",
  fontFamily: "var(--hed-font)",
  color: "var(--brand-color)",
  WebkitTransform: "translate(0.125rem, -0.175rem) rotate(45deg)",
  transform: "translate(0.125rem, -0.175rem) rotate(45deg)",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

globalStyle(".input .edit .edit-inner div label ul li:only-child .close", {
  display: "none",
});

globalStyle(".input .edit .edit-inner div label li, .input .edit .edit-inner div label input", {
  pointerEvents: "auto",
});

globalStyle(".input .edit .edit-inner div label input", {
  cursor: "pointer",
});

globalStyle(".input .edit .edit-inner div input", {
  width: "100%",
  height: "1rem",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  marginTop: "0.125rem",
});

globalStyle(".input .edit .edit-inner div input[type=\"text\"]", {
  height: "1.25rem",
});

globalStyle(".input .edit .edit-inner div input[type=\"file\"]", {
  height: "auto",
  fontStyle: "italic",
  pointerEvents: "none",
});

globalStyle(".input .edit .edit-inner div input[type=\"range\"]", {
  accentColor: "var(--brand-color)",
});

globalStyle(".input .edit .edit-inner div input::file-selector-button", {
  backgroundColor: "var(--brand-color)",
  padding: "0.25rem 0.75rem",
  textTransform: "uppercase",
  color: "#fff",
  fontStyle: "normal",
  fontSize: "0.75rem",
  cursor: "pointer",
  border: "2px solid var(--brand-color)",
  flex: "0",
  borderRadius: "0.125rem",
  whiteSpace: "nowrap",
  fontWeight: "600",
  letterSpacing: "0.05rem",
  fontFamily: "var(--spec-font)",
  margin: "0.25rem 1rem 0 0",
  pointerEvents: "auto",
});

globalStyle(".input .edit .edit-inner div input::file-selector-button:hover", {
  backgroundColor: "transparent",
  color: "var(--brand-color)",
});

globalStyle(".tool-loading", {
  fontFamily: "var(--spec-font)",
  color: "var(--brand-color)",
  padding: "1rem 0",
});
