import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
    },
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
  plugins: [tsconfigPaths()],
})
