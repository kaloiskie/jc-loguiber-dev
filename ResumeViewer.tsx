import { useEffect, useRef } from 'react'
import { Download, X } from 'lucide-react'

interface ResumeViewerProps {
  onClose: () => void
}

function ResumeViewer({ onClose }: ResumeViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="resume-overlay" onMouseDown={onClose}>
      <div
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="resume-header">
          <h2 id="resume-title">Résumé — Jhon Carlo L. Loguiber</h2>
          <div className="resume-header-actions">
            <a href="/cv.pdf" download className="resume-download">
              <Download size={14} />
              Download
            </a>
            <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close résumé viewer">
              <X size={19} />
            </button>
          </div>
        </header>

        <div className="resume-body">
          <iframe
            title="Jhon Carlo L. Loguiber résumé"
            src="/cv.pdf"
            className="resume-pdf"
          />
        </div>
      </div>
    </div>
  )
}

export { ResumeViewer }
