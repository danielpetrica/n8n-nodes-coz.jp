# @danielpetrica/n8n-nodes-cozjp

Community node for n8n to create and manage short links on coz.jp.

coz.jp is a URL shortener. This node lets you shorten URLs, retrieve, update, delete, and list your short links directly in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Local development](#local-development)
- [Resources](#resources)
- [Version history](#version-history)

## Installation

Install via n8n Community Nodes. See the official guide: [Install community nodes](https://docs.n8n.io/integrations/community-nodes/installation/).

Search for the package name `@danielpetrica/n8n-nodes-cozjp` in the n8n Editor UI when adding a Community Node.

## Operations

Resource: Link

Supported operations (declarative):
- Create — Create a short link for a target URL (`POST /links`).
- Get — Retrieve a short link by ID (`GET /links/{id}`).
- List — List your links (`GET /links`).
- Update — Update a link's target URL (`PATCH /links/{id}`).
- Delete — Delete a link (`DELETE /links/{id}`).

Common parameters and options:
- Link ID — Required for Get/Update/Delete.
- URL — Required for Create and Update.
- Simplify Response — When enabled (default), the node returns only the `data` payload from the API response.

## Credentials

This node uses a bearer token to authenticate with coz.jp.

- Credential name in n8n: `Danielpetrica Coz.jp API` (internal: `danielpetricaCozjpApi`).
- Fields:
  - API Token (required): your personal API token from your coz.jp account profile.
  - Base URL (optional): defaults to `https://coz.jp/api`; override for self-hosted/local testing.

The credential sends the header `Authorization: Bearer <token>` with every request.

Documentation link: https://github.com/danielpetrica/n8n-nodes-coz.jp

## Compatibility

- n8n Community Nodes API: v1
- Node.js: >= 18.17.0
- Built with `@n8n/node-cli`

This package ships as ES modules compiled to `dist/` and referenced by the `n8n` block in `package.json`.

## Usage

1) Add the "Danielpetrica Coz.jp" node in your workflow.
2) Select Resource = Link and choose an Operation (Create/Get/List/Update/Delete).
3) Configure Credentials with your coz.jp API token.
4) For Create/Update, set the `URL` field; for Get/Update/Delete, set `Link ID`.
5) Optionally leave "Simplify Response" turned on to receive a concise payload.

Tips:
- You can use expressions to build URLs dynamically from previous nodes.
- The node sets default headers `Accept: application/json` and `Content-Type: application/json`.

## Local development

If you want to build or modify this node locally and try it in n8n:

- Prerequisites: Node.js >= 18.17.0, npm or yarn.
- Install deps: `npm i`
- Build: `npm run build`
- Link for local testing:
  1. From this repo: `npm run build && npm link`
  2. In your n8n custom nodes directory (e.g., `~/.n8n/custom/`): `npm link @danielpetrica/n8n-nodes-cozjp`
  3. Start n8n: `n8n start` and search for the node by name: "Danielpetrica Coz.jp".

Troubleshooting:
- If `~/.n8n/custom` doesn’t exist, create it and run `npm init -y` inside it.
- Ensure the node class and filenames match (e.g., `DanielpetricaCozjp.node.ts` exporting class `DanielpetricaCozjp`).

## Resources

- n8n Community Nodes docs: https://docs.n8n.io/integrations/#community-nodes
- coz.jp website: https://coz.jp/
- Package repository and issues: https://github.com/danielpetrica/n8n-nodes-coz.jp

## Version history

- 0.1.0 — Initial release: Link resource with Create, Get, List, Update, Delete; API token credentials; declarative routing.
