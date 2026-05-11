import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * База для GitHub Pages (префикс всех путей к JS/CSS).
 *
 * Сайт в КОРНЕ user.github.io (репозиторий username.github.io):
 *   npm run build:gh-root
 *
 * Сайт в ПОДПАПКЕ user.github.io/ИмяРепо/:
 *   npm run build:gh-project
 *   (или задайте VITE_GH_PAGES_BASE=/ИмяРепо/ перед vite build)
 */
function productionBase() {
  const raw = process.env.VITE_GH_PAGES_BASE
  if (raw === undefined || String(raw).trim() === '') {
    return '/CourseProjectSPLc1s2/'
  }
  let b = String(raw).trim()
  if (!b.startsWith('/')) {
    b = '/' + b
  }
  if (b !== '/' && !b.endsWith('/')) {
    b = b + '/'
  }
  return b
}

// https://vite.dev/config/
export default defineConfig(function ({ mode }) {
  return {
    plugins: [react()],
    base: mode === 'production' ? productionBase() : '/',
  }
})
