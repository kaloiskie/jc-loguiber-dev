const REDACTION_NOTICE = [
  '> **Redacted private repository preview**',
  '>',
  '> Links, media, credentials, network addresses, code blocks, and deployment commands are removed before this document is published.',
].join('\n')

const SENSITIVE_ASSIGNMENT = /\b(?:access[_-]?token|auth(?:orization)?|client[_-]?secret|credential|database[_-]?url|password|passwd|private[_-]?key|secret|token|api[_-]?key)\b\s*[:=]\s*\S+/i
const ENV_ASSIGNMENT = /^(?:[-*+]\s+|\d+\.\s+|>\s*)?(?:export\s+)?[A-Z][A-Z0-9_]{2,}\s*=/
const DEPLOYMENT_COMMAND = /^(?:[-*+]\s+|\d+\.\s+|>\s*)?(?:\$|#)?\s*(?:bun|curl|docker|docker-compose|git\s+clone|kubectl|node|npm|npx|pip|pip3|pm2|pnpm|python|python3|rsync|scp|ssh|sudo|systemctl|wget|yarn)\b/i
const PRIVATE_KEY_MARKER = /-----BEGIN [A-Z ]*(?:PRIVATE KEY|CERTIFICATE)-----/
const REFERENCE_LINK = /^\s*\[[^\]]+\]:\s*\S+/
const IPV4_ADDRESS = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)(?::\d{1,5})?\b/g
const IPV6_ADDRESS = /\b(?:[a-f\d]{1,4}:){2,7}[a-f\d]{1,4}\b/gi
const EMAIL_ADDRESS = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
const URL = /\b(?:https?|ftp|postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s<>)\]]+/gi
const LONG_SECRET_VALUE = /\b(?:[a-f\d]{40,}|[A-Za-z\d+/]{48,}={0,2})\b/g

function redactInlineContent(line) {
  return line
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/\[\s*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<((?:https?|mailto):[^>]+)>/gi, '[redacted link]')
    .replace(URL, '[redacted URL]')
    .replace(EMAIL_ADDRESS, '[redacted email]')
    .replace(IPV4_ADDRESS, '[redacted address]')
    .replace(IPV6_ADDRESS, '[redacted address]')
    .replace(LONG_SECRET_VALUE, '[redacted value]')
    .replace(/<[^>]+>/g, '')
    .trimEnd()
}

export function redactPrivateReadme(markdown) {
  const source = markdown
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
  const output = []
  let inCodeBlock = false
  let removedCodeBlock = false
  let removedSensitiveLine = false

  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock
      if (!removedCodeBlock) {
        output.push('> Code block removed from private repository preview.')
        removedCodeBlock = true
      }
      continue
    }
    if (inCodeBlock) continue

    if (/^(?: {4}|\t)\S/.test(line) || DEPLOYMENT_COMMAND.test(line)) {
      if (!removedCodeBlock) {
        output.push('> Command or code sample removed from private repository preview.')
        removedCodeBlock = true
      }
      continue
    }

    if (
      ENV_ASSIGNMENT.test(line)
      || SENSITIVE_ASSIGNMENT.test(line)
      || PRIVATE_KEY_MARKER.test(line)
      || REFERENCE_LINK.test(line)
    ) {
      if (!removedSensitiveLine) {
        output.push('> Sensitive configuration removed from private repository preview.')
        removedSensitiveLine = true
      }
      continue
    }

    const redactedLine = redactInlineContent(line)
    if (redactedLine.trim()) output.push(redactedLine)
    else if (output.at(-1) !== '') output.push('')
  }

  const content = output.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  return content
    ? REDACTION_NOTICE + '\n\n' + content + '\n'
    : REDACTION_NOTICE + '\n\nNo publishable README content remains after redaction.\n'
}
