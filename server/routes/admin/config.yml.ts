import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/yaml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'no-store')

  // In production (Docker), public/ is compiled to .output/public/
  // In dev, it lives at public/
  const candidates = [
    resolve(process.cwd(), 'public/admin/config.yml'),
    resolve(process.cwd(), '.output/public/admin/config.yml'),
  ]

  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, 'utf-8')
  }

  throw createError({ statusCode: 404, message: 'config.yml not found' })
})
