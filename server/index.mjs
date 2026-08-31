import express from 'express'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { githubRouter } from './api/github.mjs'
import { renderProjectDocument } from './services/project-metadata.mjs'

const app = express()
const port = Number.parseInt(process.env.PORT ?? '3002', 10)
const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const distPath = join(projectRoot, 'dist')
const indexDocument = readFileSync(join(distPath, 'index.html'), 'utf8')

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be a valid TCP port')
}

app.disable('x-powered-by')
app.use((_request, response, next) => {
  response.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  })
  next()
})

app.use('/api/github', githubRouter)
app.use(express.static(distPath, {
  index: false,
  maxAge: '1h',
  setHeaders(response, filePath) {
    if (filePath.endsWith('.html')) response.setHeader('Cache-Control', 'no-cache')
  },
}))

app.use((request, response) => {
  if (request.path.startsWith('/api/')) {
    response.status(404).json({ error: 'API route not found' })
    return
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.sendStatus(405)
    return
  }

  response.set('Cache-Control', 'no-cache')
  response.type('html').send(renderProjectDocument(indexDocument, request.path))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${port}`)
})
