import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'e2e'],
    setupFiles: ['tests/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['server/**/*.ts', 'src/**/*.ts'],
      exclude: ['node_modules', 'dist', 'tests', 'e2e', '**/*.d.ts'],
    },
  },
});
