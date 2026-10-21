import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://jc-loguiber.site'
const DEFAULT_IMAGE = `${SITE_URL}/social-preview.png`

interface PageMetaProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'profile' | 'article'
  structuredData?: Record<string, unknown>
}

function PageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData,
}: PageMetaProps) {
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Jhon Carlo L. Loguiber" />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Jhon Carlo L. Loguiber, full-stack developer building production systems" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Jhon Carlo L. Loguiber, full-stack developer building production systems" />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}

export { PageMeta }
