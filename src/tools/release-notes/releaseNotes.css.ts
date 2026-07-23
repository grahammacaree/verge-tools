import { globalStyle } from '@vanilla-extract/css';

globalStyle(".release-notes", {
  display: "none",
});

globalStyle(".release-notes h3, .release-notes h5", {
  color: "var(--brand-color)",
});

globalStyle(".release-notes h2, .release-notes h3", {
  fontFamily: "var(--hed-font)",
});

globalStyle(".release-notes h3", {
  margin: "0",
  display: "inline-block",
});

globalStyle(".release-notes ul", {
  marginTop: "0.5rem",
});

globalStyle(".release-notes ul li", {
  fontFamily: "var(--text-font)",
  color: "#090909",
  fontSize: "0.7rem",
  marginLeft: "1rem",
});

globalStyle(".release-notes ul li::marker", {
  color: "var(--brand-color)",
});

globalStyle(".release-notes h5", {
  fontFamily: "var(--spec-font)",
  fontSize: "0.7rem",
  fontWeight: "300",
  textTransform: "uppercase",
  marginTop: "0.75rem",
  marginBottom: "0",
  letterSpacing: "0.015em",
  marginLeft: "1rem",
});

globalStyle(".release-notes p", {
  margin: "0",
  fontFamily: "var(--hed-font)",
  fontSize: "0.7rem",
  fontStyle: "italic",
  display: "inline-block",
  WebkitTransform: "translateY(-0.2em)",
  transform: "translateY(-0.2em)",
  marginLeft: "0.5rem",
});

globalStyle(".release-notes.active", {
  display: "block",
});
