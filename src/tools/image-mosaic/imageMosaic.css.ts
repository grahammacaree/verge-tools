import { globalStyle } from '@vanilla-extract/css';

globalStyle(".image-mosaic .template-holder", {
  display: "none",
});

globalStyle(".image-mosaic .step-holder", {
  msGridColumns: "1fr 3fr",
  gridTemplateColumns: "1fr 3fr",
  width: "100%",
  margin: "0",
  gap: "0.5rem",
  display: "grid",
});

globalStyle(".image-mosaic .left", {
  height: "100%",
  position: "relative",
  justifySelf: "stretch",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".image-mosaic .left .inner", {
  position: "sticky",
  top: "0.5rem",
  bottom: "0.5rem",
  height: "calc(100vh - 3rem)",
  padding: "1rem",
});

globalStyle(".image-mosaic .left .inner h3", {
  fontFamily: "var(--hed-font)",
  fontWeight: "700",
  color: "#000",
  padding: "0",
  margin: "0",
  textTransform: "uppercase",
  lineHeight: "1.15",
});

globalStyle(".image-mosaic .left .inner ul", {
  color: "#000",
  fontFamily: "var(--hed-font)",
  paddingLeft: "0",
  listStyle: "none",
});

globalStyle(".image-mosaic .left .inner ul li", {
  opacity: "0.5",
  padding: "0.5rem 1rem",
  letterSpacing: "0.05em",
  pointerEvents: "none",
  backgroundColor: "#fff",
});

globalStyle(".image-mosaic .left .inner ul li.active", {
  opacity: "1",
  cursor: "pointer",
  pointerEvents: "auto",
});

globalStyle(".image-mosaic .left .inner ul li.selected", {
  backgroundColor: "var(--brand-color)",
  color: "#fff",
});

globalStyle(".image-mosaic .image-container, .image-mosaic .template-display", {
  position: "relative",
  backgroundColor: "#ccc",
  backgroundSize: "cover",
});

globalStyle(".image-mosaic .image-container.cutout > .upload-image, .image-mosaic .image-container.cutout > .split-wrapper, .image-mosaic .template-display.cutout > .upload-image, .image-mosaic .template-display.cutout > .split-wrapper", {
  WebkitClipPath: "polygon(0 0, 87.5% 0, 100% 18.75%, 100% 100%, 0 100%)",
  clipPath: "polygon(0 0, 87.5% 0, 100% 18.75%, 100% 100%, 0 100%)",
});

globalStyle(".image-mosaic .image-container .background-container, .image-mosaic .template-display .background-container", {
  position: "absolute",
  inset: "0",
  backgroundSize: "cover",
});

globalStyle(".image-mosaic .image-container.cE90C59 .background-container:after, .image-mosaic .image-container.c66FF75 .background-container:after, .image-mosaic .image-container.cC305A4 .background-container:after, .image-mosaic .image-container.gradient .background-container:after, .image-mosaic .template-display.cE90C59 .background-container:after, .image-mosaic .template-display.c66FF75 .background-container:after, .image-mosaic .template-display.cC305A4 .background-container:after, .image-mosaic .template-display.gradient .background-container:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  mixBlendMode: "multiply",
});

globalStyle(".image-mosaic .image-container.gradient .upload-image:not(.draggable) .inner-container:after, .image-mosaic .template-display.gradient .upload-image:not(.draggable) .inner-container:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  background: "linear-gradient(to bottom right, #E90C59 0%, #C305A4 100%)",
});

globalStyle(".image-mosaic .image-container.gradient .background-container:after, .image-mosaic .template-display.gradient .background-container:after", {
  background: "linear-gradient(to bottom right, #E90C59 0%, #C305A4 100%)",
});

globalStyle(".image-mosaic .image-container.cE90C59 .upload-image:not(.draggable) .inner-container:after, .image-mosaic .template-display.cE90C59 .upload-image:not(.draggable) .inner-container:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  backgroundColor: "#E90C59",
});

globalStyle(".image-mosaic .image-container.cE90C59 .background-container:after, .image-mosaic .template-display.cE90C59 .background-container:after", {
  backgroundColor: "#E90C59",
});

globalStyle(".image-mosaic .image-container.c66FF75 .upload-image:not(.draggable) .inner-container:after, .image-mosaic .template-display.c66FF75 .upload-image:not(.draggable) .inner-container:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  backgroundColor: "#66FF75",
});

globalStyle(".image-mosaic .image-container.c66FF75 .background-container:after, .image-mosaic .template-display.c66FF75 .background-container:after", {
  backgroundColor: "#66FF75",
});

globalStyle(".image-mosaic .image-container.cC305A4 .upload-image:not(.draggable) .inner-container:after, .image-mosaic .template-display.cC305A4 .upload-image:not(.draggable) .inner-container:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  inset: "0",
  zIndex: "1",
  backgroundColor: "#C305A4",
});

globalStyle(".image-mosaic .image-container.cC305A4 .background-container:after, .image-mosaic .template-display.cC305A4 .background-container:after", {
  backgroundColor: "#C305A4",
});

globalStyle(".image-mosaic .image-container .upload-image, .image-mosaic .template-display .upload-image", {
  position: "absolute",
  overflow: "hidden",
  zIndex: "2",
  backgroundColor: "#fff",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  inset: "0",
});

globalStyle(".image-mosaic .image-container .upload-image img, .image-mosaic .template-display .upload-image img", {
  height: "100%",
  objectFit: "cover",
  position: "relative",
  display: "none",
  zIndex: "2",
  width: "100%",
});

globalStyle(".image-mosaic .image-container .upload-image .inner-container.uploaded img, .image-mosaic .template-display .upload-image .inner-container.uploaded img", {
  display: "block",
});

globalStyle(".image-mosaic .image-container .upload-image .inner-container.uploaded:after, .image-mosaic .template-display .upload-image .inner-container.uploaded:after", {
  zIndex: "0",
});

globalStyle(".image-mosaic .image-container .upload-image.selected, .image-mosaic .template-display .upload-image.selected", {
  outline: "0.125rem solid var(--brand-color)",
});

globalStyle(".image-mosaic .image-container .upload-image .inner-container, .image-mosaic .template-display .upload-image .inner-container", {
  position: "absolute",
  inset: "0",
  zIndex: "2",
});

globalStyle(".image-mosaic .image-container .upload-image .inner-container.horizontal img, .image-mosaic .template-display .upload-image .inner-container.horizontal img", {
  height: "calc(100% + 0.25rem)",
});

globalStyle(".image-mosaic .image-container .upload-image .inner-container.vertical img, .image-mosaic .template-display .upload-image .inner-container.vertical img", {
  width: "calc(100% + 0.25rem)",
});

globalStyle(".image-mosaic .image-container .split-wrapper, .image-mosaic .template-display .split-wrapper", {
  position: "absolute",
  inset: "0",
  zIndex: "2",
});

globalStyle(".image-mosaic .image-container .split-wrapper.highlight, .image-mosaic .template-display .split-wrapper.highlight", {
  WebkitBoxShadow: "0 0 2.5rem var(--brand-color)",
  boxShadow: "0 0 2.5rem var(--brand-color)",
});

globalStyle(".image-mosaic .image-container .split-wrapper .resize, .image-mosaic .template-display .split-wrapper .resize", {
  width: "3rem",
  height: "3rem",
  zIndex: "10",
  cursor: "pointer",
  left: "50%",
  top: "50%",
  WebkitTransform: "translateY(-50%) translateX(-50%)",
  transform: "translateY(-50%) translateX(-50%)",
  position: "absolute",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".image-mosaic .image-container .split-wrapper .resize:after, .image-mosaic .template-display .split-wrapper .resize:after", {
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  border: "0.125rem solid var(--brand-color)",
  left: "50%",
  top: "50%",
  WebkitTransform: "translateY(-50%) translateX(-50%)",
  transform: "translateY(-50%) translateX(-50%)",
  position: "absolute",
  backgroundColor: "#fff",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  content: "\"\"",
  display: "block",
});

globalStyle(".image-mosaic .image-container .split-wrapper .resize input, .image-mosaic .template-display .split-wrapper .resize input", {
  position: "absolute",
  top: "1.5rem",
  left: "1.5rem",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  width: "3rem",
  height: "1.75rem",
  border: "0.125rem solid var(--brand-color)",
  textAlign: "center",
  padding: "0.25rem 0",
  opacity: "0",
});

globalStyle(".image-mosaic .image-container .split-wrapper .resize:hover input, .image-mosaic .template-display .split-wrapper .resize:hover input", {
  opacity: "1",
});

globalStyle(".image-mosaic .image-container.borders .upload-image .inner-container:not(.uploaded), .image-mosaic .template-display.borders .upload-image .inner-container:not(.uploaded)", {
  border: "1px solid #000",
});

globalStyle(".image-mosaic .image-container.borders .upload-image .inner-container.selected:not(.uploaded), .image-mosaic .template-display.borders .upload-image .inner-container.selected:not(.uploaded)", {
  border: "0.125rem solid var(--brand-color)",
});

globalStyle(".image-mosaic .image-container > .upload-image, .image-mosaic .image-container > .split-wrapper, .image-mosaic .template-display > .upload-image, .image-mosaic .template-display > .split-wrapper", {
  inset: "1.5rem",
});

globalStyle(".image-mosaic .template-display", {
  position: "absolute",
  inset: "0",
});

globalStyle(".image-mosaic .template-display .background-container", {
  display: "none",
});

globalStyle(".image-mosaic .tabs .select .button", {
  opacity: "0.25",
  cursor: "pointer",
});

globalStyle(".image-mosaic .tabs .select .button.active", {
  opacity: "1",
  cursor: "default",
});

globalStyle(".image-mosaic .tabs .tab", {
  border: "2px solid #000",
  padding: "4px",
});

globalStyle(".image-mosaic .tabs .tab .template", {
  aspectRatio: "3/2",
  width: "auto",
  backgroundColor: "#fff",
  border: "1px solid #000",
  flex: "1",
  cursor: "pointer",
  minWidth: "25%",
  maxWidth: "calc(100% /3 - 0.5rem)",
});

globalStyle(".image-mosaic .tabs .tab .template *", {
  pointerEvents: "none",
});

globalStyle(".image-mosaic .tabs .tab .submit", {
  position: "relative",
});

globalStyle(".image-mosaic .tabs .tab .submit #string, .image-mosaic .tabs .tab .submit #string-label", {
  display: "none",
});

globalStyle(".image-mosaic .tabs .tab .submit button", {
  backgroundColor: "var(--brand-color)",
  border: "0.125rem solid var(--brand-color)",
  color: "#fff",
  textTransform: "uppercase",
  fontFamily: "var(--hed-font)",
  fontWeight: "700",
  letterSpacing: "0.05em",
  display: "inline-block",
  cursor: "pointer",
});

globalStyle(".image-mosaic .tabs .tab .submit .message", {
  position: "absolute",
  inset: "0",
  backgroundColor: "#fff",
  textAlign: "center",
  fontFamily: "var(--hed-font)",
  width: "100%",
  opacity: "0",
  pointerEvents: "none",
});

globalStyle(".image-mosaic .tabs .tab.active", {
  display: "flex",
});

globalStyle(".image-mosaic .tabs .template", {
  position: "relative",
});

globalStyle(".image-mosaic .mosaic-layout .tab", {
  display: "none",
  marginTop: "-2px",
  justifyContent: "space-between",
  gap: "0.5rem",
  flexWrap: "wrap",
});

globalStyle(".image-mosaic .mosaic-layout .tab .padding, .image-mosaic .mosaic-layout .tab .gap", {
  width: "100%",
  display: "flex",
  gap: "0.5rem",
});

globalStyle(".image-mosaic .mosaic-layout .tab .padding input, .image-mosaic .mosaic-layout .tab .gap input", {
  flex: "1",
});

globalStyle(".image-mosaic .mosaic-layout .tab div", {
  textAlign: "center",
});

globalStyle(".image-mosaic .mosaic-layout .tab .faded", {
  opacity: "0.5",
  pointerEvents: "none",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners", {
  width: "17.5%",
  position: "relative",
  height: "3rem",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners:after", {
  content: "\"\"",
  display: "block",
  position: "absolute",
  width: "4rem",
  aspectRatio: "1/1",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  borderColor: "#fff",
  zIndex: "1",
  borderWidth: "0.125rem",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners:hover:after", {
  borderColor: "#000",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners.top-left:after", {
  borderTopLeftRadius: "4rem",
  borderTop: "solid",
  borderLeft: "solid",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners.top-right:after", {
  borderTopRightRadius: "4rem",
  borderTop: "solid",
  borderRight: "solid",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners.bottom-left:after", {
  borderBottomLeftRadius: "4rem",
  borderBottom: "solid",
  borderLeft: "solid",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners.bottom-right:after", {
  borderBottomRightRadius: "4rem",
  borderBottom: "solid",
  borderRight: "solid",
});

globalStyle(".image-mosaic .mosaic-layout .tab .corners.active:after", {
  borderRadius: "0",
});

globalStyle(".image-mosaic .background-selector-container", {
  display: "grid",
  msGridColumns: "1fr 1fr",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.5rem",
  marginTop: "0.5rem",
});

globalStyle(".image-mosaic .background-selector-container .background-selector", {
  flex: "1 1 20%",
  cursor: "pointer",
  border: "0.1rem solid #000",
  position: "relative",
  backgroundColor: "#fff",
});

globalStyle(".image-mosaic .background-selector-container .background-selector:hover", {
  WebkitFilter: "invert(1)",
  filter: "invert(1)",
  borderColor: "#fff",
});

globalStyle(".image-mosaic .background-selector-container .background-selector span", {
  position: "absolute",
  fontFamily: "var(--hed-font)",
  textTransform: "uppercase",
  fontSize: "0.9rem",
  maxWidth: "92%",
  top: "50%",
  left: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
});

globalStyle(".image-mosaic .background-selector-container .background-selector img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

globalStyle(".image-mosaic .filter-selector-container", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "0.5rem",
  justifyContent: "space-between",
});

globalStyle(".image-mosaic .filter-selector-container .filter-selector", {
  cursor: "pointer",
  border: "0.1rem solid #000",
  padding: "0.25rem",
  fontFamily: "var(--hed-font)",
  textTransform: "uppercase",
  fontSize: "0.9rem",
  backgroundColor: "#fff",
});

globalStyle(".image-mosaic .filter-selector-container .filter-selector:hover", {
  WebkitFilter: "invert(1)",
  filter: "invert(1)",
  borderColor: "#fff",
});

globalStyle(".image-mosaic .filter-selector-container .filter-selector:hover .color", {
  WebkitFilter: "invert(1)",
  filter: "invert(1)",
});

globalStyle(".image-mosaic .filter-selector-container .filter-selector .color", {
  width: "1.5rem",
  height: "100%",
  marginRight: "0.5rem",
  display: "inline-block",
});

globalStyle(".image-mosaic .filter-selector-container .filter-selector span", {
  WebkitTransform: "translateY(-25%)",
  transform: "translateY(-25%)",
  display: "inline-block",
});

globalStyle(".image-mosaic .image-adjustments", {
  display: "grid",
  msGridColumns: "1fr",
  gridTemplateColumns: "1fr",
  gap: "0.5rem",
  marginTop: "1rem",
});

globalStyle(".image-mosaic .image-adjustments .zoom", {
  display: "flex",
  gap: "0.5rem",
});

globalStyle(".image-mosaic .image-adjustments .zoom input", {
  flex: "1",
});

globalStyle(".image-mosaic .image-adjustments .zoom label", {
  WebkitTransform: "translateY(0.25rem)",
  transform: "translateY(0.25rem)",
  maxWidth: "1rem",
  textAlign: "center",
});

globalStyle(".image-mosaic .image-adjustments .greyscale", {
  paddingTop: "0.25rem",
  fontFamily: "var(--hed-font)",
  textAlign: "center",
});

globalStyle(".image-mosaic .finalize", {
  marginTop: "0.5rem",
  textAlign: "center",
  display: "flex",
  gap: "0.5rem",
  flexDirection: "column",
});

globalStyle(".image-mosaic .finalize .name-container", {
  display: "flex",
  gap: "0.5rem",
  color: "#777",
  fontFamily: "var(--hed-font)",
});

globalStyle(".image-mosaic .finalize .name-container input", {
  flex: "1",
});

globalStyle(".image-mosaic .finalize .name-container div", {
  flex: "0 1 auto",
});

globalStyle(".image-mosaic", {
  display: "none",
});

globalStyle(".image-mosaic .step-1-selected .hiding:not(.step-1)", {
  display: "none",
});

globalStyle(".image-mosaic .step-2-selected .hiding:not(.step-2)", {
  display: "none",
});

globalStyle(".image-mosaic .step-3-selected .hiding:not(.step-3)", {
  display: "none",
});

globalStyle(".image-mosaic .step-4-selected .hiding:not(.step-4)", {
  display: "none",
});

globalStyle(".image-mosaic .step-5-selected .hiding:not(.step-5)", {
  display: "none",
});

globalStyle(".image-mosaic .step-6-selected .hiding:not(.step-6)", {
  display: "none",
});

globalStyle(".image-mosaic.active", {
  display: "block",
});

globalStyle(".image-mosaic .button, .image-mosaic input::file-selector-button", {
  backgroundColor: "var(--brand-color)",
  border: "0.125rem solid var(--brand-color)",
  color: "#fff",
  textTransform: "uppercase",
  fontFamily: "var(--spac-font)",
  fontWeight: "700",
  letterSpacing: "0.05em",
  display: "inline-block",
  cursor: "pointer",
});

globalStyle(".image-mosaic .button:hover, .image-mosaic input::file-selector-button:hover", {
  color: "var(--brand-color)",
  backgroundColor: "#fff",
});

globalStyle(".image-mosaic .buttons", {
  display: "grid",
  gap: "0.25rem",
  msGridColumns: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr",
});

globalStyle(".image-mosaic .buttons .lock", {
  gridColumn: "1/4",
});

globalStyle(".image-mosaic .button", {
  padding: "0.5rem 0.75rem",
  fontSize: "0.75rem",
  textDecoration: "none",
});

globalStyle(".image-mosaic .button.download span", {
  textDecoration: "none",
  display: "none",
});

globalStyle(".image-mosaic .button.download span:first-child", {
  display: "inline",
});

globalStyle(".image-mosaic .button.download span:nth-child(n+3)", {
  WebkitAnimation: "2s ease-in-out infinite downloading",
  animation: "2s ease-in-out infinite downloading",
  margin: "0 0.5rem",
});

globalStyle(".image-mosaic .button.download span:nth-child(3)", {
  WebkitAnimationDelay: "calc(2s / 3)",
  animationDelay: "calc(2s / 3)",
});

globalStyle(".image-mosaic .button.download span:nth-child(4)", {
  WebkitAnimationDelay: "calc(4s / 3)",
  animationDelay: "calc(4s / 3)",
  marginLeft: "-0.4rem",
  marginRight: "-0.4rem",
});

globalStyle(".image-mosaic .button.downloading", {
  cursor: "default",
  pointerEvents: "none",
  opacity: "0.9",
});

globalStyle(".image-mosaic .button.downloading span", {
  display: "inline-block",
});

globalStyle(".image-mosaic .button.downloading span:first-child", {
  display: "none",
});

globalStyle(".image-mosaic .file-selector", {
  textAlign: "left",
  margin: "0.5rem 0",
});

globalStyle(".image-mosaic label", {
  fontFamily: "var(--spec-font)",
});

globalStyle(".image-mosaic .file-selector label", {
  display: "block",
  pointerEvents: "none",
});

globalStyle(".image-mosaic .file-selector label span", {
  display: "none",
});

globalStyle(".image-mosaic .file-selector label span:first-child", {
  display: "inline",
});

globalStyle(".image-mosaic .file-selector label.selected label span", {
  display: "inline",
});

globalStyle(".image-mosaic .file-selector label.selected label span:first-child", {
  display: "none",
});

globalStyle(".image-mosaic.selected .edit-inner label span", {
  display: "inline",
});

globalStyle(".image-mosaic.selected .edit-inner label span:first-child", {
  display: "none",
});

globalStyle(".image-mosaic input::file-selector-button", {
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  pointerEvents: "auto",
});

globalStyle(".image-mosaic input[type=\"file\"]", {
  height: "auto",
  pointerEvents: "none",
  color: "transparent",
});

globalStyle(".image-mosaic .image-container", {
  width: "100%",
  backgroundColor: "#ccc",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".image-mosaic .image-container.r3x2", {
  aspectRatio: "3/2",
});

globalStyle(".image-mosaic .image-container .draggable", {
  border: "0.125rem solid var(--brand-color)",
  background: "repeating-linear-gradient(45deg, #fff, #fff 10px, var(--brand-color) 10px, var(--brand-color) 12px)",
});

globalStyle(".image-mosaic .image-container .draggable img", {
  display: "none",
  pointerEvents: "none",
});

globalStyle(".image-mosaic .image-container .draggable:after", {
  content: "\"Drag image\"",
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  border: "0.125rem solid var(--brand-color)",
  color: "var(--brand-color)",
  fontFamily: "var(--spec-font)",
  textTransform: "uppercase",
  padding: "0.5rem 1.25rem",
});

globalStyle(".image-mosaic .animation-holder", {
  position: "relative",
  overflow: "hidden",
});

globalStyle(".image-mosaic .animation-holder.active:after", {
  content: "\"\"",
  position: "absolute",
  left: "-10rem",
  top: "0",
  bottom: "0",
  width: "10rem",
  background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%)",
  pointerEvents: "none",
  display: "block",
  zIndex: "2",
  WebkitAnimation: "7.5s linear infinite animation",
  animation: "7.5s linear infinite animation",
});

globalStyle(".image-mosaic p", {
  fontFamily: "var(--text-font)",
  fontStyle: "italic",
  margin: "0.5rem auto",
  textAlign: "left",
  display: "inline-block",
  width: "auto",
});

globalStyle(".tool.image-mosaic", {
  display: "none",
});

globalStyle(".tool.image-mosaic.active,\n.flex-container.unlocked .tool.image-mosaic.active", {
  display: "block",
});

globalStyle(".image-mosaic .tab.templates .template", {
  cursor: "pointer",
  padding: "0.5rem",
  border: "1px solid var(--brand-color, #5200ff)",
  margin: "0.25rem 0",
});

globalStyle(".image-mosaic .finalize .download", {
  display: "block",
});
