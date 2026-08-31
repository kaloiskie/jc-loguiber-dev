const BASE_URL = 'https://jc-loguiber.site'

const PROJECT_METADATA = new Map([
  ['northman-gaming-dashboard', {
    title: 'Northman Gaming Dashboard - Project Case Study',
    description: 'A production gaming operations platform for ticket verification, multi-role approvals, live sales data, and agent device provisioning.',
    image: '/websites/northmangaming%20operation%20dashboard.png',
    imageWidth: 1349,
    imageHeight: 609,
  }],
  ['hr-dashboard', {
    title: 'HR Dashboard - Project Case Study',
    description: 'A multi-outlet HR platform for attendance, DTR, leave, overtime, payslip monitoring, and auditable approval workflows.',
    image: '/websites/hr.dashboard.png',
    imageWidth: 1350,
    imageHeight: 615,
  }],
  ['suki-rewards', {
    title: 'Suki Rewards - Project Case Study',
    description: 'A bilingual, mobile-first loyalty platform connecting ticket submission, points, leaderboards, and live raffle activity.',
    image: '/websites/sukirewards.png',
    imageWidth: 1360,
    imageHeight: 616,
  }],
  ['toktok-nabunturan-fare', {
    title: 'Toktok Nabunturan Rider Fare - Project Case Study',
    description: 'A mobile-first rider fare and booking concept with Nabunturan route presets, transparent sample pricing, and reusable fare logic.',
    image: '/websites/toktok-nabunturan.png',
    imageWidth: 1440,
    imageHeight: 900,
    imageAlt: 'Toktok Nabunturan live rider fare concept interface',
  }],
])

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMeta(document, attribute, name, content) {
  const expression = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/?>`, 'i')
  const tag = `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" data-rh="true" />`
  return expression.test(document)
    ? document.replace(expression, tag)
    : document.replace('</head>', `    ${tag}\\n  </head>`)
}

export function renderProjectDocument(document, pathname) {
  const match = /^\/projects\/([a-z0-9-]+)\/?$/.exec(pathname)
  if (!match) return document

  const metadata = PROJECT_METADATA.get(match[1])
  if (!metadata) return document

  const canonicalUrl = `${BASE_URL}/projects/${match[1]}`
  const imageUrl = `${BASE_URL}${metadata.image}`
  let rendered = document.replace(
    /<title>[^<]*<\/title>/i,
    `<title data-rh="true">${escapeAttribute(metadata.title)}</title>`,
  )
  rendered = rendered.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" data-rh="true" />`,
  )
  rendered = replaceMeta(rendered, 'name', 'description', metadata.description)
  rendered = replaceMeta(rendered, 'property', 'og:title', metadata.title)
  rendered = replaceMeta(rendered, 'property', 'og:description', metadata.description)
  rendered = replaceMeta(rendered, 'property', 'og:url', canonicalUrl)
  rendered = replaceMeta(rendered, 'property', 'og:type', 'article')
  rendered = replaceMeta(rendered, 'property', 'og:image', imageUrl)
  rendered = replaceMeta(rendered, 'property', 'og:image:secure_url', imageUrl)
  rendered = replaceMeta(rendered, 'property', 'og:image:width', String(metadata.imageWidth))
  rendered = replaceMeta(rendered, 'property', 'og:image:height', String(metadata.imageHeight))
  const imageAlt = metadata.imageAlt ?? `${metadata.title} production interface`
  rendered = replaceMeta(rendered, 'property', 'og:image:alt', imageAlt)
  rendered = replaceMeta(rendered, 'name', 'twitter:title', metadata.title)
  rendered = replaceMeta(rendered, 'name', 'twitter:description', metadata.description)
  rendered = replaceMeta(rendered, 'name', 'twitter:image', imageUrl)
  rendered = replaceMeta(rendered, 'name', 'twitter:image:alt', imageAlt)
  return rendered
}
