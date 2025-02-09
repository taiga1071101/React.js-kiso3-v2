import { defineConfig } from 'vitest/config'

export default defineConfig({
  testDir: './tests/vitest', // テストディレクトリを指定
  test: {
    environment: 'jsdom',   // DOM 環境をエミュレート
  },
})

