/**
 * GitHub Pages отдаёт 404 для прямых URL вроде /repo/chat.
 * Копия index.html как 404.html позволяет загрузить SPA и React Router.
 */
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

const dist = join(process.cwd(), 'dist')
const indexHtml = join(dist, 'index.html')
const notFoundHtml = join(dist, '404.html')

if (!existsSync(indexHtml)) {
  console.error('Нет dist/index.html. Сначала выполните: npm run build')
  process.exit(1)
}

copyFileSync(indexHtml, notFoundHtml)
console.log('Создан dist/404.html для GitHub Pages (SPA).')
