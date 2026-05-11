import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Имя репозитория на GitHub (как в URL: user.github.io/ИМЯ_РЕПО/)
// Если сайт в корне (username.github.io без подпапки) — поставьте base: '/'
const GITHUB_PAGES_BASE = '/CourseProjectSPLc1s2/'

// https://vite.dev/config/
export default defineConfig(function ({ mode }) {
  return {
    plugins: [react()],
    base: mode === 'production' ? GITHUB_PAGES_BASE : '/',
  }
})
