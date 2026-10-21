import { Contact } from '@/features/footer'
import { PageMeta } from '@/shared/PageMeta'

function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact - Jhon Carlo L. Loguiber"
        description="Contact Jhon Carlo L. Loguiber for remote full-stack development opportunities and production system work."
        path="/contact"
      />
      <Contact />
    </>
  )
}

export { ContactPage }
