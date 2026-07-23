import { globalStyle } from '@vanilla-extract/css';

globalStyle(".mobile", {
  '@media': {
    "(min-width: 769px)": {
      display: "none",
    },
  },
});

globalStyle(".tablet", {
  '@media': {
    "(min-width: 769px)": {
      display: "block",
    },
  },
});

globalStyle(".desktop,\n  .desktop.tablet", {
  '@media': {
    "(min-width: 1180px)": {
      display: "block",
    },
  },
});

globalStyle(".tablet", {
  '@media': {
    "(min-width: 1180px)": {
      display: "none",
    },
  },
});

globalStyle("section.ad", {
  '@media': {
    "screen and (max-width: 768px)": {
      position: "relative",
      marginTop: "0",
    },
  },
});

globalStyle("section.ad .ad__inner", {
  '@media': {
    "screen and (max-width: 768px)": {
      maxWidth: "800px",
      margin: "45px auto 45px auto",
      textAlign: "center",
    },
  },
});

globalStyle("#div-gpt-ad-csk_athena_2", {
  '@media': {
    "screen and (max-width: 768px)": {
      minWidth: "auto",
    },
  },
});

globalStyle("header .nav", {
  '@media': {
    "(min-width: 769px)": {
      margin: "0 auto 80px",
    },
  },
});

globalStyle("header .nav .faded-logo", {
  '@media': {
    "(min-width: 769px)": {
      pointerEvents: "none",
      width: "769px",
      top: "-24px",
      left: "-200px",
      zIndex: "0",
    },
  },
});

globalStyle("header .nav .faded-logo svg path", {
  '@media': {
    "(min-width: 769px)": {
      fill: "rgba(204, 204, 204, 0.5)",
    },
  },
});

globalStyle("header .nav", {
  '@media': {
    "(min-width: 769px)": {
      height: "80px",
      maxWidth: "1100px",
      justifyContent: "none",
    },
  },
});

globalStyle("header .nav .nav-bar", {
  '@media': {
    "(min-width: 769px)": {
      display: "block",
      marginLeft: "auto",
      marginTop: "auto",
      WebkitTransform: "translateY(0)",
      transform: "translateY(0)",
    },
  },
});

globalStyle("header .lockup", {
  '@media': {
    "(min-width: 1180px)": {
      gap: "0rem",
    },
  },
});

globalStyle("header .lockup h1, header .lockup h2", {
  '@media': {
    "(min-width: 1180px)": {
      fontSize: "3.5rem",
    },
  },
});

globalStyle("header .lockup h1, header .lockup h2,\n        header .lockup p", {
  '@media': {
    "(min-width: 769px)": {
      maxWidth: "100%",
      margin: "0.75rem 0",
    },
  },
});
