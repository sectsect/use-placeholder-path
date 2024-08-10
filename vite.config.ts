/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import magicalSvg from 'vite-plugin-magical-svg';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), magicalSvg({ target: 'react' })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    // rollupOptions: {
    //   output: {
    //     // entry chunk assets are always named "assets/[name].js"
    //     entryFileNames: `assets/[name].js`,
    //     chunkFileNames: `assets/[name].js`,
    //     assetFileNames: `assets/[name].[ext]`,
    //   },
    // },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    testTransformMode: {
      web: ['/.[jt]sx?$/'],
    },
    setupFiles: './vitest.setup.ts',
    coverage: {
      all: false,
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/**/*.ts',
        // 'src/app/**/*.ts',
        // 'src/components/**/*.tsx',
        // 'src/hooks/**/*.tsx',
      ],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    // exclude: [
    //   '**/node_modules/**',
    //   '**/dist/**',
    //   '**/out/**',
    //   '**/public/**',
    //   '**/cypress/**',
    //   '**/.{idea,git,cache,output,temp,next,husky,vscode}/**',
    //   '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,postcss,prettier,stylelint,tailwind}.config.*',
    //   '**/e2e/**', // Additional e2e directory for Playwright.
    // ],
    // watchExclude: [
    //   '**/node_modules/**',
    //   '**/dist/**',
    //   '**/out/**',
    //   '**/public/**',
    //   '**/cypress/**',
    //   '**/.{idea,git,cache,output,temp,next,husky,vscode}/**',
    //   '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,postcss,prettier,stylelint,tailwind}.config.*',
    //   '**/e2e/**', // Additional e2e directory for Playwright.
    // ],
    deps: {}, // @ https://qiita.com/Stead08/items/762093fe86999fec4e80
  },
});
