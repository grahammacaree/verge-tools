import { globalFontFace } from '@vanilla-extract/css';

const vox = 'https://cdn.vox-cdn.com/shared_fonts/verge-duet';

const faces: Array<{
  family: string;
  weight: string;
  style: string;
  file: string;
}> = [
  { family: 'FK Roman Standard', weight: '400', style: 'normal', file: 'FKRomanStandard-Regular' },
  { family: 'FK Roman Standard', weight: '400', style: 'italic', file: 'FKRomanStandard-Oblique' },
  { family: 'FK Roman Standard', weight: '700', style: 'normal', file: 'FKRomanStandard-Bold' },
  { family: 'FK Roman Standard', weight: '700', style: 'italic', file: 'FKRomanStandard-BoldOblique' },
  { family: 'Poly Sans', weight: '300', style: 'normal', file: 'PolySans-Slim' },
  { family: 'Poly Sans', weight: '300', style: 'italic', file: 'PolySans-SlimItalic' },
  { family: 'Poly Sans', weight: '400', style: 'normal', file: 'PolySans-Neutral' },
  { family: 'Poly Sans', weight: '400', style: 'italic', file: 'PolySans-NeutralItalic' },
  { family: 'Poly Sans', weight: '500', style: 'normal', file: 'PolySans-Median' },
  { family: 'Poly Sans', weight: '500', style: 'italic', file: 'PolySans-MedianItalic' },
  { family: 'Poly Sans', weight: '700', style: 'normal', file: 'PolySans-Bulky' },
  { family: 'Poly Sans', weight: '700', style: 'italic', file: 'PolySans-BulkyItalic' },
  { family: 'Poly Sans Mono', weight: '300', style: 'normal', file: 'PolySans-SlimMono' },
  { family: 'Poly Sans Mono', weight: '300', style: 'italic', file: 'PolySans-SlimMonoItalic' },
  { family: 'Poly Sans Mono', weight: '400', style: 'normal', file: 'PolySans-NeutralMono' },
  { family: 'Poly Sans Mono', weight: '400', style: 'italic', file: 'PolySans-NeutralMonoItalic' },
  { family: 'Poly Sans Mono', weight: '500', style: 'normal', file: 'PolySans-MedianMono' },
  { family: 'Poly Sans Mono', weight: '500', style: 'italic', file: 'PolySans-MedianItalic' },
  { family: 'Poly Sans Mono', weight: '700', style: 'normal', file: 'PolySans-BulkyMono' },
  { family: 'Poly Sans Mono', weight: '700', style: 'italic', file: 'PolySans-BulkyMonoItalic' },
];

for (const face of faces) {
  globalFontFace(face.family, {
    fontWeight: face.weight,
    fontStyle: face.style,
    fontDisplay: 'swap',
    src: `url(${vox}/${face.file}.woff2) format("woff2"), url(${vox}/${face.file}.woff) format("woff")`,
  });
}
