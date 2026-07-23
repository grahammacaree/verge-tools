import { globalStyle } from '@vanilla-extract/css';

globalStyle("header.hide, .tools.hide", {
  display: "none",
});

globalStyle(".flex-container", {
  display: "flex",
});

globalStyle(".flex-container.polygon .verge", {
  display: "none",
});

globalStyle(".flex-container.verge .polygon.hidden-brand", {
  display: "none",
});

globalStyle("main", {
  width: "80%",
  marginRight: "0",
});

globalStyle(".gate", {
  position: "fixed",
  inset: "0",
  display: "none",
  zIndex: "9999",
  backgroundColor: "#111",
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
  color: "#fff",
});

globalStyle(".gate .close", {
  display: "block",
  position: "absolute",
  top: "1.5rem",
  right: "1.5rem",
  aspectRatio: "1",
  height: "2.5rem",
  borderRadius: "50%",
  border: "2px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  WebkitTransform: "translate(0.5rem, -0.5rem)",
  transform: "translate(0.5rem, -0.5rem)",
  cursor: "pointer",
  fontSize: "30px",
  zIndex: "1",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
});

globalStyle(".gate .close:hover", {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
});

globalStyle(".gate .close span", {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "3px",
  borderRadius: "1.5px",
  backgroundColor: "#fff",
  width: "62.5%",
});

globalStyle(".gate .close span:first-child", {
  WebkitTransform: "translate(-50%, -50%) rotate(45deg)",
  transform: "translate(-50%, -50%) rotate(45deg)",
});

globalStyle(".gate .close span:last-child", {
  WebkitTransform: "translate(-50%, -50%) rotate(-45deg)",
  transform: "translate(-50%, -50%) rotate(-45deg)",
});

globalStyle(".gate.active", {
  display: "block",
});

globalStyle(".gate .inner", {
  width: "92%",
  maxWidth: "900px",
  height: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

globalStyle(".gate .brand-select", {
  display: "grid",
  msGridColumns: "1fr",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  fontWeight: "700",
  fontSize: "32px",
  textAlign: "center",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

globalStyle(".gate .brand-select .brand-item", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  aspectRatio: "3",
});

globalStyle(".gate .brand-select .brand-item.verge-brand", {
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
});

globalStyle(".gate .brand-select .brand-item.polygon-brand", {
  fontFamily: "\"Montserrat\", sans-serif",
  fontWeight: "500",
});

globalStyle(".gate .brand-select .brand-item span", {
  display: "none",
});

globalStyle(".gate .brand-select svg", {
  width: "100%",
  maxHeight: "25svh",
  display: "block",
  marginBottom: "1.5rem",
});

globalStyle(".gate.brand .close", {
  display: "none",
});

globalStyle(".gate.brand .brand-select .brand-item", {
  backgroundColor: "#111",
});

globalStyle(".gate.brand .brand-select .brand-item:hover", {
  WebkitFilter: "invert(1)",
  filter: "invert(1)",
});

globalStyle(".gate .password", {
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "center",
});

globalStyle(".gate .password span", {
  color: "#fff",
  fontSize: "20px",
  height: "24px",
  padding: "2px",
});

globalStyle(".gate .password input", {
  padding: "2px",
  height: "24px",
  fontSize: "20px",
  fontWeight: "700",
  border: "none",
});

globalStyle(".gate .password button", {
  aspectRatio: "1",
  height: "2.5rem",
  borderRadius: "50%",
  border: "2px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  WebkitTransform: "translate(0.5rem, -0.5rem)",
  transform: "translate(0.5rem, -0.5rem)",
  cursor: "pointer",
  fontSize: "30px",
});

globalStyle(".gate .password button:hover", {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
});

globalStyle(".gate.brand .brand-select", {
  msGridColumns: "1fr",
  gridTemplateColumns: "1fr",
});

globalStyle(".gate.brand .brand-item", {
  cursor: "pointer",
  aspectRatio: "1",
});

globalStyle(".gate.brand .brand-item span", {
  display: "block",
});

globalStyle(".gate.brand .password", {
  display: "none",
});

globalStyle(".gate.verge", {
  backgroundColor: "#6600FF",
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
});

globalStyle(".gate.verge .polygon-brand", {
  display: "none",
});

globalStyle(".gate.verge .password input", {
  color: "#6600FF",
  fontFamily: "Poly Sans, Helvetica, Arial, sans-serif",
});

globalStyle(".gate.polygon", {
  background: "linear-gradient(to bottom right, #E90C59 0%, #C305A4 100%)",
  fontFamily: "\"IBM Plex Sans\", sans-serif",
});

globalStyle(".gate.polygon .verge-brand", {
  display: "none",
});

globalStyle(".gate.polygon .password input", {
  color: "#C305A4",
  fontFamily: "\"IBM Plex Sans\", sans-serif",
});

globalStyle("article", {
  display: "grid",
  msGridColumns: "1fr",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  fontFamily: "var(--hed-font)",
  maxWidth: "1000px",
  margin: "0 auto",
});

globalStyle("article section", {
  padding: "1rem 2rem",
  position: "relative",
});

globalStyle("article section .story", {
  display: "flex",
  flexDirection: "column",
});

globalStyle("article section .contain", {
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto",
});

globalStyle("article section .contain .contain-inner", {
  width: "100%",
  paddingTop: "177%",
});

globalStyle("header", {
  width: "100%",
});

globalStyle("header .nav", {
  height: "2rem",
  width: "92%",
  maxWidth: "1100px",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

globalStyle("header .nav .faded-logo", {
  width: "265px",
  position: "absolute",
  top: "-3px",
  left: "-16px",
  zIndex: "1",
});

globalStyle("header .nav .faded-logo svg path", {
  fill: "#090909",
});

globalStyle("header .nav .nav-bar", {
  display: "none",
  borderBottom: "1px solid #090909",
  paddingBottom: "12px",
  WebkitTransform: "translateY(-0.5rem)",
  transform: "translateY(-0.5rem)",
});

globalStyle("header .nav .nav-bar ul", {
  listStyle: "none",
  fontFamily: "var(--hed-font)",
  fontSize: "1rem",
  fontWeight: "300",
  margin: "0",
  padding: "0",
});

globalStyle("header .nav .nav-bar li", {
  display: "inline-block",
});

globalStyle("header .nav .nav-bar li a", {
  color: "#090909",
  textDecoration: "none",
  WebkitTransition: "color .3s",
  transition: "color .3s",
});

globalStyle("header .nav .nav-bar li a:hover", {
  color: "gray",
});

globalStyle("header .nav .nav-bar li svg", {
  width: "117px",
  display: "inline-block",
  height: "auto",
  WebkitTransform: "translateY(37.5%)",
  transform: "translateY(25%)",
});

globalStyle("header .nav .nav-bar li svg path", {
  fill: "#090909",
});

globalStyle("header .nav .nav-bar li:after", {
  content: "\"/\"",
  display: "inline-block",
  margin: "0 0.75rem",
  opacity: "0.75",
});

globalStyle("header .nav .nav-bar li:last-child:after", {
  display: "none",
});

globalStyle("header .lockup", {
  maxWidth: "1000px",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  margin: "0 auto",
  padding: "2rem 2rem 0",
  WebkitBoxSizing: "border-box",
  boxSizing: "border-box",
  position: "relative",
});

globalStyle("header .lockup .text-container", {
  display: "none",
  backgroundColor: "#F9F9F9",
  padding: "1rem",
  border: "0.075rem solid #CECECE",
  position: "relative",
});

globalStyle("header .lockup .text-container.title", {
  padding: "1rem 1.5rem",
});

globalStyle("header .lockup .text-container h1", {
  marginTop: "0",
});

globalStyle("header .lockup .text-container.active", {
  display: "block",
});

globalStyle("header .lockup .text-container.active:not(.title)", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "2rem",
});

globalStyle("header .lockup .text-container.active:not(.title) h2", {
  fontSize: "1.5rem",
  margin: "0",
  padding: "0",
  fontWeight: "700",
});

globalStyle("header .lockup .text-container.active:not(.title) p", {
  fontSize: "0.9rem",
  margin: "0",
});

globalStyle("header .lockup h1, header .lockup h2", {
  fontSize: "2.8125rem",
  fontWeight: "700",
  letterSpacing: "-.02em",
  lineHeight: "1.04",
  paddingBottom: "8px",
  fontFamily: "var(--hed-font)",
});

globalStyle("header .lockup p", {
  fontWeight: "300",
  fontSize: "1rem",
  fontFamily: "var(--text-font)",
});

globalStyle("header .lockup h1, header .lockup h2,\n    header .lockup p", {
  margin: "8px 0",
});

globalStyle(".left-column", {
  width: "20%",
  left: "0",
  top: "0",
  position: "sticky",
  padding: "0 1.5rem",
  height: "100vh",
  backgroundColor: "#F9F9F9",
  borderRight: "0.075rem solid #CECECE",
});

globalStyle(".left-column .top", {
  display: "flex",
  marginBottom: "1rem",
  gap: "1rem",
  justifyContent: "space-between",
  alignItems: "center",
});

globalStyle(".left-column .top > *", {
  flex: "0 0 auto",
});

globalStyle(".left-column .rn", {
  fontFamily: "var(--spec-font)",
  color: "var(--brand-color)",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  cursor: "pointer",
  textDecoration: "none",
});

globalStyle(".left-column .switch", {
  display: "inline-block",
  left: "1.5rem",
  border: "0.075rem solid var(--brand-color)",
  letterSpacing: "0.01em",
  backgroundColor: "var(--brand-color)",
  color: "#fff",
  fontSize: "15px",
  textTransform: "uppercase",
  fontFamily: "var(--spec-font)",
  padding: "0.25rem 0.5rem",
  cursor: "pointer",
});

globalStyle(".left-column .switch > div", {
  display: "inline-block",
});

globalStyle(".left-column .switch > div svg", {
  display: "block",
  height: "18px",
  marginRight: "0.5rem",
  WebkitTransform: "translateY(2px)",
  transform: "translateY(2px)",
});

globalStyle(".left-column .switch span", {
  WebkitTransform: "translateY(-2px)",
  transform: "translateY(-2px)",
  display: "inline-block",
});

globalStyle(".left-column .inner", {
  position: "sticky",
  top: "0",
  padding: "1rem 0",
});

globalStyle(".left-column a", {
  width: "100%",
  marginBottom: "1rem",
  display: "block",
});

globalStyle(".left-column a svg", {
  width: "100%",
});

globalStyle(".left-column a svg path", {
  fill: "#090909",
});

globalStyle(".left-column ul", {
  listStyle: "none",
  padding: "0",
  width: "100%",
});

globalStyle(".left-column ul li", {
  fontFamily: "var(--hed-font)",
  color: "#090909",
  fontSize: "0.95rem",
  cursor: "pointer",
  position: "relative",
  margin: "1rem 0",
});

globalStyle(".left-column ul li:before", {
  display: "inline-block",
  content: "\"\"",
  width: "1em",
  aspectRatio: "1",
  marginRight: "0.5em",
  backgroundColor: "#CECECE",
  WebkitTransform: "translateY(0.125em)",
  transform: "translateY(0.125em)",
});

globalStyle(".left-column ul li:after", {
  display: "block",
  position: "absolute",
  top: "50%",
  right: "0",
  WebkitTransform: "translate(0, -50%) translateX(0.125rem) rotate(-45deg)",
  transform: "translate(0, -50%) translateX(0.125rem) rotate(-45deg)",
  borderLeft: "0.125rem solid transparent",
  borderTop: "0.125rem solid transparent",
  borderRight: "0.125rem solid #CECECE",
  borderBottom: "0.125rem solid #CECECE",
  height: "0.5em",
  width: "0.5em",
  content: "\"\"",
});

globalStyle(".left-column ul li:hover, .left-column ul li.active", {
  color: "var(--brand-color)",
});

globalStyle(".left-column ul li:hover:before, .left-column ul li.active:before", {
  backgroundColor: "var(--brand-color)",
});

globalStyle(".left-column ul li:hover:after, .left-column ul li.active:after", {
  borderRightColor: "var(--brand-color)",
  borderBottomColor: "var(--brand-color)",
});

globalStyle(".left-column ul li a", {
  color: "inherit",
  textDecoration: "none",
  marginBottom: "0",
  width: "100%",
  display: "block",
});

globalStyle(".flex-container.unlocked", {
  visibility: "visible",
});

globalStyle(".flex-container:not(.unlocked) main", {
  visibility: "hidden",
});

globalStyle("header .lockup .text-container.title .tool-selector", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
  listStyle: "none",
  padding: "0",
  margin: "1.5rem 0 0",
});

globalStyle("header .lockup .text-container.title .tool-selector li", {
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
  padding: "0",
  borderRadius: "0",
});

globalStyle("header .lockup .text-container.title .tool-selector li span", {
  position: "absolute",
  maxWidth: "92%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  textAlign: "center",
});

globalStyle("header .lockup .text-container.title .tool-selector li:hover", {
  background: "transparent",
  borderColor: "var(--brand-color)",
  color: "var(--brand-color)",
});

globalStyle("header .lockup .text-container.title .tool-selector li a", {
  color: "inherit",
  textDecoration: "none",
  display: "block",
  height: "100%",
  width: "100%",
});
