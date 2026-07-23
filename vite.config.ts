import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ mode }) => ({
  plugins: [vanillaExtractPlugin(), react()],
  // GitHub Pages lives under /verge-tools/; local `vite` uses `/` so root URL works.
  base: mode === 'production' ? '/verge-tools/' : '/',
}));
