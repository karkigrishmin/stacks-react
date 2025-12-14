import path from 'path';
import pathAliasPlugin from 'esbuild-plugin-path-alias';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  tsconfig: 'tsconfig.lib.json',
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@stacks/connect',
    '@stacks/connect-ui',
    '@stacks/transactions',
    '@stacks/network',
  ],
  treeshake: true,
  esbuildPlugins: [
    pathAliasPlugin({
      '@': path.resolve(__dirname, 'src'),
    }),
  ],
});
