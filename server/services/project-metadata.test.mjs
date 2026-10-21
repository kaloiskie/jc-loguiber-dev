import assert from 'node:assert/strict'
import test from 'node:test'
import { renderDocument } from './project-metadata.mjs'

const document = `<!doctype html>
<html lang="en">
  <head>
    <title>Jhon Carlo L. Loguiber — Full-Stack Developer</title>
    <meta name="description" content="Default description" />
    <link rel="canonical" href="https://jc-loguiber.site/" />
    <meta property="og:title" content="Default title" />
    <meta property="og:description" content="Default description" />
    <meta property="og:url" content="https://jc-loguiber.site/" />
    <meta property="og:image" content="https://jc-loguiber.site/social-preview.png" />
    <meta name="twitter:title" content="Default title" />
    <meta name="twitter:description" content="Default description" />
    <meta name="twitter:image" content="https://jc-loguiber.site/social-preview.png" />
  </head>
  <body><div id="root"></div></body>
</html>`

test('renders metadata for a project case study', () => {
  const rendered = renderDocument(document, '/projects/northman-gaming-dashboard')

  assert.match(rendered, /<title data-rh="true">Northman Gaming Dashboard - Project Case Study<\/title>/)
  assert.match(rendered, /rel="canonical" href="https:\/\/jc-loguiber\.site\/projects\/northman-gaming-dashboard"/)
  assert.match(rendered, /property="og:type" content="article"/)
  assert.match(rendered, /property="og:image" content="https:\/\/jc-loguiber\.site\/websites\/northmangaming%20operation%20dashboard\.png"/)
})

test('renders metadata for static pages, including trailing slashes', () => {
  const rendered = renderDocument(document, '/about/')

  assert.match(rendered, /<title data-rh="true">About - Jhon Carlo L\. Loguiber<\/title>/)
  assert.match(rendered, /rel="canonical" href="https:\/\/jc-loguiber\.site\/about"/)
  assert.match(rendered, /property="og:type" content="website"/)
  assert.match(rendered, /name="description" content="Profile, technical range/)
})

test('leaves unknown and home paths untouched', () => {
  assert.equal(renderDocument(document, '/'), document)
  assert.equal(renderDocument(document, '/missing'), document)
})
