# Project Guidelines

These guidelines describe how to work on this repository. The project’s goal is to build an n8n community node that integrates with the coz.jp URL shortener service.

The node package will expose resources and operations to create and manage short links on coz.jp, following n8n’s node conventions and UI standards.


## 1. Project Overview
- Purpose: Provide an n8n node for coz.jp link shortener.
- Scope (initial):
  - Resource: Link (short URLs)
  - Typical operations: Create, Get, Update, Delete, Expand, List
  - Auth: API key or token-based credentials configured via n8n Credentials
- Style: Prefer declarative-style nodes where possible; fall back to programmatic where needed (e.g., complex routing or custom logic).

References:
- n8n Docs home: https://docs.n8n.io/
- Tutorial: Build a declarative-style node: https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/
- Node UI design: https://docs.n8n.io/integrations/creating-nodes/design/node-ui/
- Choose node file structure: https://docs.n8n.io/integrations/creating-nodes/build/node-file-structure/
- Local quick reference: [n8n Node Creation Guide](./n8n-node-creation.md)


## 2. Repository Structure
- package.json — Node package metadata and n8n linkage (credentials and node entry points)
- tsconfig.json — TypeScript configuration
- eslint.config.mjs — Linting rules for code style
- nodes/ — All nodes live here
  - nodes/DanielpetricaCozjp/ — Coz.jp node implementation
    - resources/ — Per-resource submodules (declarative descriptions, operations)
      - user/ — Example resource (sample code currently present)
- credentials/ — n8n credentials for this package (one file per credential type)
- .junie/guidelines.md — This file

Note: As functionality expands, prefer a modular structure per n8n guidelines:
- nodes/<NodeName>/<NodeName>.node.ts — Base file
- nodes/<NodeName>/<NodeName>.node.json — Codex (metadata)
- credentials/<CredName>.credentials.ts — Credentials
- Optional modular layout under nodes/<NodeName>:
  - actions/<resource>/<operation>.operation.ts
  - methods/ (for loadOptions, etc.)
  - transport/ (HTTP helpers)


## 3. Development Workflow
1) Prerequisites
- Node.js >= 18.17.0
- npm or yarn
- Basic knowledge: TypeScript, REST APIs, git

2) Install dependencies
- npm i

3) Build
- npm run build

4) Local testing in n8n
- Install n8n globally (one-time): npm install n8n -g
- From this repo: npm run build && npm link
- In your n8n custom nodes directory (usually one of):
  - ~/.n8n/custom/
  - ~/.n8n/<your-custom-name> (if N8N_CUSTOM_EXTENSIONS set)
  run: npm link <package-name-from-package.json>
- Start n8n: n8n start
- In the Editor UI, search for the node by its node name (not package name).

Troubleshooting
- If ~/.n8n/custom doesn’t exist: create it and run npm init inside it.
- Ensure node names and class names match file names (e.g., Cozjp -> Cozjp.node.ts and export class Cozjp).


## 4. Node Design & UX
Follow n8n’s Node UI standards:
- First fields: Resource, then Operation
- Required fields should be visible by default
- Optional fields go under “Additional/Optional Fields” collections
- Use service-accurate terminology (match coz.jp docs)
- Subtitles reflect main parameters, e.g.:
  - subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}'
- Keep hints/tooltips clear and concise; add links when useful
- Use ISO 8601 for dates/timestamps; support expressions
- For IDs, allow both dropdown (loadOptions) and raw ID input
- Consider a "Simplify Response" toggle to reduce payload size

Icons
- Prefer SVG (square aspect); add under nodes/<NodeName>/ and reference via icon: 'file:<icon>.svg'


## 5. Credentials
- Create one credentials file under credentials/, e.g., CozjpApi.credentials.ts
- Implement generic auth (query/header) to send the coz.jp API key/token
- Provide clear displayName, documentationUrl, and fields (e.g., API Key)
- In the node description.credentials array, require this credential by name


## 6. HTTP & Routing
- For declarative nodes, set requestDefaults in the node description:
  - baseURL, default headers (Accept: application/json, Content-Type: application/json)
- Use routing.request with method, url, qs, body as needed
- For optional fields, route them into `qs` or `body` via routing.request
- For programmatic nodes, use helpers under transport/ and keep execute logic small and composable


## 7. File Naming & Versioning
- Class name must match file base name (Cozjp -> Cozjp.node.ts with export class Cozjp implements INodeType)
- Codex JSON name must match base node filename (Cozjp.node.json)
- If/when versioning:
  - nodes/Cozjp/v1/... with a base node file that declares default version


## 8. Code Style
- TypeScript throughout; keep strictness per tsconfig
- Lint before commit: npx eslint . (or configured scripts)
- Keep functions small; prefer pure functions for mappers/parsers
- Sort option lists alphabetically; provide meaningful defaults
- Follow existing import ordering and formatting used in the repo


## 9. Tests
- Currently no automated tests are defined.
- If tests are added later:
  - Unit tests for mappers/validators
  - Integration tests for routing (mock HTTP)
  - Don’t run heavy tests on submit unless the issue requires it


## 10. Release & Packaging
- Ensure package.json contains the n8n block that links built files under dist/
- Keep "files": ["dist"] to publish only built output
- Update repository URL, author, and homepage
- Build before publish: npm run build


## 11. Contribution Notes
- Open small PRs focused on one resource/operation
- Include brief README updates for new capabilities
- Document any breaking changes in CHANGELOG.md


## 12. Next Steps for Coz.jp Node
- Implement credentials: credentials/CozjpApi.credentials.ts
- Scaffold node: nodes/DanielpetricaCozjp/DanielpetricaCozjp.node.ts and .node.json
- Define resources and operations for the coz.jp API (shorten, expand, stats, list)
- Add icon (SVG) and metadata
- Test locally via npm link in n8n