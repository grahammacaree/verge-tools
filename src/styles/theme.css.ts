import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    brand: '#6600FF',
    brandAlt: '#5200ff',
    ink: '#090909',
    white: '#fff',
    gateBg: '#111',
  },
  font: {
    hed: 'Poly Sans, Helvetica, Arial, sans-serif',
    text: 'FK Roman Standard, Georgia, serif',
    spec: 'Poly Sans Mono, Courier New, Courier, monospace',
  },
});

/** Legacy CSS variable aliases used across tool stylesheets. */
globalStyle(':root', {
  vars: {
    '--brand-color': vars.color.brand,
    '--hed-font': vars.font.hed,
    '--text-font': vars.font.text,
    '--spec-font': vars.font.spec,
    '--scaling': '1',
  },
});
