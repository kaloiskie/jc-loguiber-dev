export interface FlowStep {
  step: number
  title: string
  actor: string
  description: string
  tech: string[]
}

export interface ProjectFlow {
  id: string
  title: string
  subtitle: string
  description: string
  architecturePattern: string
  steps: FlowStep[]
}

export const projectFlows: ProjectFlow[] = [
  {
    id: 'northman-be-v2',
    title: 'Northman Web Backend v2 Architecture & Request Flow',
    subtitle: 'Fastify strict TypeScript REST API architecture, domain routing, and request handling.',
    description: 'Based on kaloiskie/northman-web-be-v2: Gateway proxying requests to Fastify backend, validating via Zod, delegating to domain services and SQL models, and integrating microservices with Postgres PgBouncer.',
    architecturePattern: 'Gateway (:4000) -> Backend (:4001) -> Domains -> Models -> Microservices / PgBouncer',
    steps: [
      {
        step: 1,
        title: 'Gateway Proxy & Request Ingress',
        actor: 'v2 Gateway (:4000)',
        description: 'Public API requests hit the v2 gateway, matching allowlisted route policies and forwarding to the backend service.',
        tech: ['Fastify', 'Gateway', 'Route Policy']
      },
      {
        step: 2,
        title: 'Backend Validation & Authentication',
        actor: 'v2 Backend (:4001)',
        description: 'Fastify backend validates request authentication, authorization, and schema using strict Zod types.',
        tech: ['Fastify', 'Zod', 'JWT Auth']
      },
      {
        step: 3,
        title: 'Domain Routing & Request Branching',
        actor: 'Domain Services',
        description: 'Requests branch based on operation: Cached read (Queue read lane + Redis), Write (Queue write job + audit outbox), or Lottery job (Pinned mother process job).',
        tech: ['Domain Services', 'Redis Cache', 'Queue Workers']
      },
      {
        step: 4,
        title: 'Microservice & Database Delegation',
        actor: 'Microservice Mesh & PgBouncer',
        description: 'Domain services delegate cross-cutting concerns to specialized microservices (Users, Queue, Redis, Socket, Files, Telegram, Replica) and query Postgres via PgBouncer.',
        tech: ['PostgreSQL', 'PgBouncer', 'Users Service', 'Socket Service', 'File Manager']
      },
      {
        step: 5,
        title: 'Response & Outbox Emission',
        actor: 'JSON Response / Audit Outbox',
        description: 'Structured JSON response returned to gateway and client, while audit events are published to the centralized outbox.',
        tech: ['JSON', 'Audit Outbox', 'HTTP Response']
      }
    ]
  },
  {
    id: 'northman-v2',
    title: 'Northman Web v2 Multi-Server & Edge LB Topology',
    subtitle: 'Cloudflare Worker Edge LB routing across EU primary VPS and PH replicas with tailnet mesh sync.',
    description: 'High-availability request flow through Edge LB, origin Nginx reverse proxies, FastAPI/Fastify microservices, and PostgreSQL database with PgBouncer connection pooling.',
    architecturePattern: 'Edge LB -> Tunnel -> Nginx -> Gateway -> Microservice Mesh -> PgBouncer / PostgreSQL',
    steps: [
      {
        step: 1,
        title: 'Client Request & Edge Distribution',
        actor: 'Client / User Browser',
        description: 'Requests hit the Cloudflare Worker Edge LB (northman-web-lb-v2), which performs health-gated failover and least-busy routing across origins.',
        tech: ['Cloudflare Worker', 'TLS', 'HTTP/3']
      },
      {
        step: 2,
        title: 'Tunnel & Nginx Termination',
        actor: 'Cloudflare Tunnel / Nginx',
        description: 'Requests pass through secure Cloudflare Tunnels to origin Nginx instances, stamping X-Served-By headers (eu-origin-vps, ph-origin-1, ph-origin-2).',
        tech: ['Cloudflare Tunnel', 'Nginx', 'SSL Termination']
      },
      {
        step: 3,
        title: 'Gateway Route Policy & Proxy',
        actor: 'v2 Gateway (:4000)',
        description: 'Public /api prefix matched against routePolicy.ts whitelist; proxied to internal Fastify backends or WebSocket servers over Tailscale loopback.',
        tech: ['Fastify', 'Socket.IO', 'Tailscale']
      },
      {
        step: 4,
        title: 'Backend & Persistent Storage',
        actor: 'v2 Backend & PostgreSQL',
        description: 'Business logic executes with strict Zod validation, connecting to centralized PostgreSQL via PgBouncer connection pooling.',
        tech: ['Fastify API', 'Zod', 'PostgreSQL', 'PgBouncer']
      },
      {
        step: 5,
        title: 'Async Queues & File Mesh',
        actor: 'Queue & File Manager',
        description: 'Background tasks processed via Amazon SQS / Python RQ workers; file uploads replicated across origins via peer mirror-pull sync.',
        tech: ['SQS', 'Python RQ', 'File Manager Mesh']
      }
    ]
  },
  {
    id: 'saristore',
    title: 'SariStore POS & Inventory Offline/Sync Flow',
    subtitle: 'Mobile-first sole-proprietorship store inventory management with offline-first local persistence.',
    description: 'Fast barcode scanning, stock tracking, sales logging, and receipt generation designed for local retail stores with intermittent connectivity.',
    architecturePattern: 'React Native / Web POS -> Local IndexedDB / SQLite -> Batched Sync API -> PostgreSQL',
    steps: [
      {
        step: 1,
        title: 'Item Scan & Cart Operation',
        actor: 'Cashier / Mobile Device',
        description: 'Cashier scans barcode or selects item from catalog; UI updates instantly via local state and optimistic UI rendering.',
        tech: ['React', 'TypeScript', 'Tailwind']
      },
      {
        step: 2,
        title: 'Local Storage & Persistence',
        actor: 'IndexedDB / SQLite Storage',
        description: 'Transaction and inventory delta saved locally immediately, ensuring zero data loss during network outages or power drops.',
        tech: ['IndexedDB', 'LocalStorage', 'SQLite']
      },
      {
        step: 3,
        title: 'Queue & Background Sync',
        actor: 'Sync Worker',
        description: 'When connection is active, offline queue batches pending transactions and syncs securely with the backend API.',
        tech: ['Background Fetch', 'REST API', 'JSON']
      },
      {
        step: 4,
        title: 'Receipt & Report Generation',
        actor: 'Thermal Printer / PDF Service',
        description: 'Generates formatted thermal receipt output or end-of-day Excel/PDF sales reports for store owners.',
        tech: ['PDFKit', 'ExcelJS', 'Thermal Print']
      }
    ]
  },
  {
    id: 'toktok-fare',
    title: 'Toktok Nabunturan Fare Estimator & Booking Flow',
    subtitle: 'Typed fare calculation engine and location preset selector for Nabunturan delivery and passenger rides.',
    description: 'Framework-independent fare calculation module powering an interactive React rider booking concept with distance, service tier, and priority adjustments.',
    architecturePattern: 'React UI -> Shared Fare Engine -> Preset Validation -> Responsive Preview',
    steps: [
      {
        step: 1,
        title: 'Origin & Destination Selection',
        actor: 'Customer',
        description: 'User picks standard Nabunturan route presets or custom delivery points from the dropdown or map helper.',
        tech: ['React UI', 'Preset Map']
      },
      {
        step: 2,
        title: 'Typed Fare Calculation',
        actor: 'fare-core Package',
        description: 'Shared TypeScript calculation engine computes base fare, distance increment, service tier multiplier, express priority, and COD fees.',
        tech: ['TypeScript', 'Pure Functions', 'Zod']
      },
      {
        step: 3,
        title: 'Breakdown & Summary Render',
        actor: 'Responsive Interface',
        description: 'Instant UI feedback displaying estimated total, distance breakdown, and driver availability status.',
        tech: ['Tailwind CSS', 'Framer Motion']
      },
      {
        step: 4,
        title: 'Public Sharing & Deployment',
        actor: 'Cloudflare Preview',
        description: 'Deployed instantly via Cloudflare static hosting with optimized Open Graph social cards for stakeholder review.',
        tech: ['Cloudflare Pages', 'Vite', 'Helmet']
      }
    ]
  },
  {
    id: 'mcp-lsp-ai',
    title: 'Agent MCP & LSP Private-Network Integration Flow',
    subtitle: 'Secure AI agent tool bridge exposing database inspection, project memory, and audit logging.',
    description: 'Secure Model Context Protocol server and Language Server Protocol bridge providing LLM agents with read/write access to project databases, docs, and git changes.',
    architecturePattern: 'LLM Agent -> MCP Server (:4100) -> Guarded DB / LSP Bridge -> Audit Log',
    steps: [
      {
        step: 1,
        title: 'Agent Tool Request',
        actor: 'AI Agent / OpenCode',
        description: 'Agent issues structured tool call (e.g. read_database, search_project_docs, record_accomplishment) over MCP SSE/HTTP protocol.',
        tech: ['MCP Protocol', 'JSON-RPC']
      },
      {
        step: 2,
        title: 'Authentication & Authorization',
        actor: 'Tailnet / Auth Guard',
        description: 'Request validated against secure tailnet binding (100.104.105.91:4100) and authorized security token.',
        tech: ['Tailscale', 'Bearer Token']
      },
      {
        step: 3,
        title: 'Database & LSP Execution',
        actor: 'MCP Server / LSP Bridge (:4105)',
        description: 'Executes read-only queries against PostgreSQL database or queries code symbols via LSP bridge without exposing raw secrets.',
        tech: ['PostgreSQL', 'LSP', 'Node.js']
      },
      {
        step: 4,
        title: 'Audit Logging & Accomplishment',
        actor: 'Audit Trail',
        description: 'Every agent-performed privileged action is recorded to centralized audit logs and daily accomplishment reports.',
        tech: ['audit_events table', 'MCP Memory']
      }
    ]
  }
]
