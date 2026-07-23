import { globalKeyframes, globalStyle } from '@vanilla-extract/css';

globalKeyframes('downloading', {
  '0%': { opacity: '0' },
  '20%': { opacity: '1' },
  '100%': { opacity: '0' },
});

globalStyle('a.download span:nth-child(n+3)', {
  animation: '2s ease-in-out infinite downloading',
});

globalStyle('a.download span:nth-child(3)', {
  animationDelay: 'calc(2s / 3)',
});

globalStyle('a.download span:nth-child(4)', {
  animationDelay: 'calc(4s / 3)',
  marginLeft: '-0.4rem',
  marginRight: '-0.4rem',
});
