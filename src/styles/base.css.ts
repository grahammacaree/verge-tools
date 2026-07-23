import { globalStyle } from '@vanilla-extract/css';

globalStyle("html", {
  fontSize: "20px",
});

globalStyle("body", {
  margin: "0",
  overflowX: "hidden",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle(".ads,\n.m-ad", {
  maxWidth: "92%",
  textAlign: "center",
});

globalStyle(".ads:not(:empty),\n  .m-ad:not(:empty)", {
  margin: "40px auto",
});

globalStyle(".tablet,\n.desktop", {
  display: "none",
});

globalStyle(".sr-only", {
  clip: "rect(1px, 1px, 1px, 1px)",
  WebkitClipPath: "inset(50%)",
  clipPath: "inset(50%)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
});

globalStyle(".m-ad", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

globalStyle(".m-ad iframe", {
  textAlign: "center",
});

globalStyle("html", {
  vars: {
    "--variable-padding": "1.5"
  },
});

globalStyle(".url-error", {
  color: "#c305a4",
  margin: "0.5rem 0",
});
