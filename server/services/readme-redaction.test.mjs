import assert from 'node:assert/strict'
import test from 'node:test'
import { redactPrivateReadme } from './readme-redaction.mjs'

test('redacts private README trust-boundary content', () => {
  const markdown = [
    '# Internal App',
    '',
    'Product overview with [documentation](https://internal.example.com/docs).',
    'Contact ops@example.com at 10.20.30.40:4000.',
    '',
    'API_TOKEN=super-secret-token',
    '',
    '~~~bash',
    'pm2 restart internal-app',
    'curl https://internal.example.com/health',
    '~~~',
    '',
    '![Architecture](./architecture.png)',
    '[![Build](https://img.shields.io/badge/build-passing.svg)](https://ci.example.com)',
    'React powers the interface.',
  ].join('\n')

  const preview = redactPrivateReadme(markdown)

  assert.match(preview, /Redacted private repository preview/)
  assert.match(preview, /# Internal App/)
  assert.match(preview, /Product overview with documentation/)
  assert.match(preview, /React powers the interface/)
  assert.doesNotMatch(preview, /super-secret-token/)
  assert.doesNotMatch(preview, /internal\.example\.com/)
  assert.doesNotMatch(preview, /ops@example\.com/)
  assert.doesNotMatch(preview, /10\.20\.30\.40/)
  assert.doesNotMatch(preview, /pm2 restart/)
  assert.doesNotMatch(preview, /architecture\.png/)
  assert.doesNotMatch(preview, /\[\s*\]\(/)
  assert.doesNotMatch(preview, /~~~/)
})

test('returns a useful notice when all content is removed', () => {
  const preview = redactPrivateReadme('TOKEN=secret-value')
  assert.match(preview, /Sensitive configuration removed/)
  assert.doesNotMatch(preview, /secret-value/)
})
