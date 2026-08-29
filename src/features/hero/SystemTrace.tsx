import { motion } from 'framer-motion'
import { Database, Layers3, Monitor, Radio, Server } from 'lucide-react'

const traceNodes = [
  { label: 'Agent UI', detail: 'React', icon: Monitor },
  { label: 'API', detail: 'Express', icon: Server },
  { label: 'Queue', detail: 'SQS / RQ', icon: Layers3 },
  { label: 'Data', detail: 'PostgreSQL', icon: Database },
  { label: 'Live', detail: 'Socket.io', icon: Radio },
]

function SystemTrace() {
  return (
    <motion.div
      className="system-trace"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
    >
      <div className="system-trace-header">
        <div>
          <span className="system-trace-kicker">Featured production system</span>
          <strong>Northman operations</strong>
        </div>
        <div className="system-trace-header-meta">
          <span>Fig. 01</span>
          <span className="system-trace-status">
            <span /> Live
          </span>
        </div>
      </div>

      <a
        href="#projects"
        className="system-trace-preview"
        aria-label="Explore the Northman Gaming Dashboard case study"
      >
        <img
          src="/websites/northmangaming%20operation%20dashboard.png"
          alt="Northman Gaming operations platform homepage"
        />
        <span className="system-trace-preview-label">Explore system</span>
      </a>

      <div className="system-trace-route" aria-label="Application request path">
        {traceNodes.map((node, index) => {
          const Icon = node.icon
          return (
            <div className="system-trace-step" key={node.label}>
              <motion.div
                className="system-trace-node"
                initial={{ borderColor: 'var(--color-border-light)' }}
                animate={{ borderColor: ['#2b333f', '#7c6aff', '#2b333f'] }}
                transition={{ duration: 2.8, delay: index * 0.35, repeat: Infinity }}
              >
                <Icon size={15} aria-hidden="true" />
              </motion.div>
              <span className="system-trace-node-label">{node.label}</span>
              <span className="system-trace-node-detail">{node.detail}</span>
              {index < traceNodes.length - 1 && (
                <span className="system-trace-connector" aria-hidden="true">
                  <motion.span
                    animate={{ x: ['0%', '340%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.4, delay: index * 0.28, repeat: Infinity }}
                  />
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="system-trace-log" aria-hidden="true">
        <span>14:32:18</span>
        <span>approval.updated</span>
        <span className="system-trace-log-ok">delivered 42ms</span>
      </div>
    </motion.div>
  )
}

export { SystemTrace }
