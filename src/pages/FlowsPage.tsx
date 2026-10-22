import { Flows } from '@/features/flows'
import { PageMeta } from '@/shared/PageMeta'

function FlowsPage() {
  return (
    <>
      <PageMeta
        title="System Flows & Architecture - Jhon Carlo L. Loguiber"
        description="Sample system architecture flow charts and step-by-step data pathways for production projects built by Jhon Carlo L. Loguiber."
        path="/flows"
      />
      <Flows />
    </>
  )
}

export { FlowsPage }
