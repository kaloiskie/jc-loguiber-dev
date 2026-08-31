import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { BookOpen, ExternalLink, X } from 'lucide-react'
import { fetchReadmePreview } from './github-api'

interface ReadmeModalProps {
  owner: string
  repo: string
  isPrivate: boolean
  onClose: () => void
}

type ReadmeState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; html: string }

function prepareReadmeHtml(markdown: string, owner: string, repo: string, isPrivate: boolean) {
  const parsed = marked.parse(markdown) as string
  const cleanHtml = DOMPurify.sanitize(parsed)
  const documentFragment = new DOMParser().parseFromString(cleanHtml, 'text/html')

  documentFragment.querySelectorAll<HTMLImageElement>('img[src]').forEach((image) => {
    if (isPrivate) {
      image.remove()
      return
    }

    const source = image.getAttribute('src') ?? ''
    if (!/^(https?:|data:)/i.test(source)) {
      const path = source.replace(/^\.?\//, '')
      image.src = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`
    }
    image.loading = 'lazy'
  })

  documentFragment.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    const href = link.getAttribute('href') ?? ''
    if (isPrivate && !href.startsWith('#')) {
      link.removeAttribute('href')
      return
    }

    if (!/^(https?:|mailto:|#)/i.test(href)) {
      const path = href.replace(/^\.?\//, '')
      link.href = `https://github.com/${owner}/${repo}/blob/HEAD/${path}`
    }
    if (!href.startsWith('#')) {
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
    }
  })

  return DOMPurify.sanitize(documentFragment.body.innerHTML, {
    ADD_ATTR: ['target'],
  })
}

function ReadmeModal({ owner, repo, isPrivate, onClose }: ReadmeModalProps) {
  const [state, setState] = useState<ReadmeState>({ status: 'loading' })
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const repositoryUrl = `https://github.com/${owner}/${repo}`

  useEffect(() => {
    const controller = new AbortController()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    fetchReadmePreview(owner, repo, controller.signal)
      .then(async (response) => {
        if (!response.ok) throw new Error('README unavailable')
        const markdown = await response.text()
        setState({ status: 'ready', html: prepareReadmeHtml(markdown, owner, repo, isPrivate) })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ status: 'error' })
      })

    return () => {
      controller.abort()
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPrivate, onClose, owner, repo])

  return (
    <div className="readme-overlay" onMouseDown={onClose}>
      <div
        className="readme-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="readme-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="readme-header">
          <div>
            <span className={isPrivate ? 'readme-private-label' : undefined}>
              {isPrivate ? 'Redacted private README / Fig. R1' : 'Repository document / Fig. R1'}
            </span>
            <h2 id="readme-title">{owner} / {repo}</h2>
          </div>
          <div className="readme-header-actions">
            {!isPrivate && (
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                GitHub <ExternalLink size={14} />
              </a>
            )}
            <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close README">
              <X size={19} />
            </button>
          </div>
        </header>

        <div className="readme-layout">
          <aside className="readme-rail" aria-hidden="true">
            <BookOpen size={17} />
            <strong>README.md</strong>
            <span>{isPrivate ? 'Sanitized server-side' : 'Rendered from GitHub'}</span>
            <span className="readme-rail-shortcut">Esc to close</span>
          </aside>

          <main className="readme-body">
            {state.status === 'loading' && (
              <div className="readme-loading" aria-live="polite">
                <span>Loading repository document</span>
                <i /><i /><i /><i />
              </div>
            )}
            {state.status === 'error' && (
              <div className="readme-error">
                <BookOpen size={22} />
                <h3>README unavailable</h3>
                <p>The repository preview could not be loaded.</p>
                {!isPrivate && (
                  <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                    Open repository <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}
            {state.status === 'ready' && (
              <article
                className="readme-content"
                dangerouslySetInnerHTML={{ __html: state.html }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export { ReadmeModal }
