/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname) }],
  },
})
