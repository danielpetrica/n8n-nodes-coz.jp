# n8n Node Creation Guide (Quick Reference)

This companion document summarizes how to build an n8n node, based on the instructions previously provided. Use it alongside the project-specific guidelines in `.junie/guidelines.md`.


## 1) Prerequisites
- Node.js >= 18.17.0 and npm
- git
- Familiarity with TypeScript and REST APIs


## 2) Project setup (from n8n starter pattern)
- Use the n8n community node starter or your own repo scaffold.
- Install dependencies:
  - `npm i`
- Remove example nodes/credentials from the starter when applicable (e.g., `nodes/ExampleNode`, `nodes/HTTPBin`, `credentials/ExampleCredentials.credentials.ts`, `credentials/HttpBinApi.credentials.ts`).
- Create required files/directories for your node:
  - `nodes/<NodeName>/`
  - `nodes/<NodeName>/<NodeName>.node.ts` (base file)
  - `nodes/<NodeName>/<NodeName>.node.json` (codex metadata)
  - `credentials/<CredName>.credentials.ts`


## 3) Add an icon
- Place an SVG (preferred) or PNG (60×60) in `nodes/<NodeName>/`.
- Reference it in the node description via `icon: 'file:<icon>.svg'`.


## 4) Build the node (declarative-style example)
- Base class implements `INodeType` and provides `description: INodeTypeDescription`.
- Core description fields:
  - `displayName`, `name`, `icon`, `group`, `version`, `subtitle`, `description`
  - `defaults`, `inputs`, `outputs`
  - `credentials`: require your credential by name
  - `requestDefaults`: set `baseURL` and default headers
- Define `properties` with:
  - `Resource` (type: `options`, with values like `astronomyPictureOfTheDay`, `marsRoverPhotos` in the tutorial)
  - One or more `Operation` dropdowns scoped via `displayOptions.show.resource`
  - Routing inside options: `routing.request` with `method`, `url`, `qs`, `body`
  - Additional parameters (required, optional, date/time, etc.), using `routing.request` to map values

Example patterns (abridged):
- APOD Get:
  - Operation `get` → `routing.request: { method: 'GET', url: '/planetary/apod' }`
- Mars Rover Photos Get:
  - Operation `get` with required fields `roverName` (options) and `marsRoverDate` (dateTime)
  - Dynamic URL using parameter: `url: '=/mars-photos/api/v1/rovers/{{$value}}/photos'`
  - Query string from parameter: `qs: { earth_date: '={{ new Date($value).toISOString().substr(0,10) }}' }`
- Additional Fields collection for APOD `date` mapped to `qs.date`.


## 5) Credentials file (generic auth example)
Create `credentials/<CredName>.credentials.ts` implementing `ICredentialType`, e.g.:

```ts
import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class NasaPicsApi implements ICredentialType {
  name = 'NasaPicsApi';
  displayName = 'NASA Pics API';
  documentationUrl = '';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
    },
  ];
  authenticate = {
    type: 'generic',
    properties: {
      qs: {
        api_key: '={{$credentials.apiKey}}',
      },
    },
  } as IAuthenticateGeneric;
}
```

Adapt names and auth location (query/header) to your service.


## 6) Codex metadata file
Create `nodes/<NodeName>/<NodeName>.node.json` with metadata:

```json
{
  "node": "n8n-nodes-base.NasaPics",
  "nodeVersion": "1.0",
  "codexVersion": "1.0",
  "categories": ["Miscellaneous"],
  "resources": {
    "credentialDocumentation": [{"url": ""}],
    "primaryDocumentation": [{"url": ""}]
  }
}
```

Update values to reflect your node.


## 7) Package.json linkage
Ensure the `n8n` block links to built files under `dist/`:

```json
{
  "files": ["dist"],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/NasaPicsApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/NasaPics/NasaPics.node.js"
    ]
  }
}
```

Replace names/paths with your node’s.


## 8) Test locally in n8n
- Install n8n: `npm install n8n -g`
- Build + link your package locally:
  - `npm run build && npm link`
- In your n8n custom nodes directory (e.g., `~/.n8n/custom/` or `~/.n8n/<your-custom-name>`):
  - `npm link <package-name-from-package.json>`
- Start n8n: `n8n start`
- In the Editor UI, search by node name (not package name).

Troubleshooting:
- If `~/.n8n/custom` doesn’t exist, create it and run `npm init` inside it.
- Ensure class names match filenames (e.g., `Cozjp` → `Cozjp.node.ts` and `export class Cozjp`).


## 9) Node UI design highlights
- Display order: Resource → Operation → Required fields → Optional fields (collection)
- Use service-accurate terminology; keep hints/tooltips concise
- Subtitle example: `={{$parameter["operation"] + ": " + $parameter["resource"]}}`
- Dates/timestamps: accept ISO 8601; support expressions
- IDs: provide both dropdowns (loadOptions) and raw ID input
- Consider providing a “Simplify Response” toggle



## 10) File structure guidance
- Base files: `<NodeName>.node.ts` and `<NodeName>.node.json`
- Credentials: `<CredName>.credentials.ts`
- Optional modular layout:
  - `actions/<resource>/<operation>.operation.ts`
  - `methods/` (loadOptions)
  - `transport/` (HTTP helpers)
- Versioning pattern: `nodes/<NodeName>/v1/...` with a base file declaring default version.



## 11) Common patterns and tips
- Add validation and clear required indicators
- Use info boxes sparingly; provide helpful hints/tooltips
- Default list values to most-used options; sort options alphabetically
- For upsert: name operation “Create or Update” and explain behavior
- Avoid boolean UI ambiguity; use dropdowns when clearer than toggles


## 12) Next steps for this repository
- Implement `credentials/CozjpApi.credentials.ts`
- Scaffold `nodes/DanielpetricaCozjp/DanielpetricaCozjp.node.ts` and `.node.json`
- Define Link resource operations (shorten/create, expand, get, update, delete, list)
- Add icon and metadata
- Test locally via npm link in n8n



---

# Appendix: Node Base File and Parameters Reference

This appendix consolidates essential n8n node base file concepts into a self-contained reference for this repository. It complements the quick-start sections above and avoids external links.

## Node base file

The node base file contains the core code of your node. All nodes must have a base file. The contents differ depending on whether you're building a declarative-style or programmatic-style node.

- Declarative-style: Most behavior is described via the `description` object, `requestDefaults`, and `routing` rules within `properties` options.
- Programmatic-style: You implement `execute()` to read incoming data and parameters and build API requests.

For both styles, see the Structure, Standard parameters, and style-specific parameters below.

## Structure of the node base file

Basic outline for a declarative-style node:

```ts
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
  description: INodeTypeDescription = {
    // Basic node details here
    properties: [
      // Resources and operations here
    ],
  };
}
```

Basic outline for a programmatic-style node:

```ts
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
  description: INodeTypeDescription = {
    // Basic node details here
    properties: [
      // Resources and operations here
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Process data and return
    return [[]];
  }
}
```

## Standard parameters

These parameters apply to all node base files.

- `displayName` (string, required): Name shown in the GUI.
- `name` (string, required): Internal identifier used by the node.
- `icon` (string | object, required): Path to the icon file. Use `file:...` for a single icon, or an object `{ light, dark }` for theme-specific icons.

  Example:
  ```ts
  const description = {
    icon: 'file:exampleNodeIcon.svg',
  };
  // or theme-specific
  const descriptionThemed = {
    icon: { light: 'file:exampleNodeIcon.svg', dark: 'file:exampleNodeIcon.dark.svg' },
  };
  ```

- `group` (string[], required): Behavior classification. Common values include `trigger`, `schedule`, or `[]` for standard nodes.
- `description` (string, required): Short description shown in the UI.
- `defaults` (object, required): Brand and naming defaults, such as `name` (canvas label) and `color` (hex brand color).
- `forceInputNodeExecution` (boolean, optional): For multi-input nodes, force all preceding branches to execute before this node.
- `inputs` (string[], required): Input connector names. For a single input use `['main']`.
- `outputs` (string[], required): Output connector names. For a single output use `['main']`.
- `requiredInputs` (number | number[], optional): For multi-input nodes, which inputs must have data before executing.
- `credentials` (array, required): Credential definitions required by the node. Each entry includes at least `name` (matching the credential file) and `required`.
- `requestDefaults` (object, required): Base request configuration used by `routing` rules. Typically includes `baseURL`, and optionally `headers` and default `url`.
- `properties` (array, required): Contains the Resource selector, Operation options, required fields, and Additional Fields collections.

Resource object conventions:
- `displayName`: 'Resource'
- `name`: 'resource'
- `type`: usually `'options'`
- `noDataExpression`: `true`

Operations object conventions:
- `displayName`: 'Operation'
- `name`: 'operation'
- `type`: `'options'`
- `noDataExpression`: `true`
- `options`: array of operation definitions, each with `name`, `value`, `action`, `description`, and `routing`.

Additional Fields collection pattern:
```ts
const additionalFieldsExample = {
  displayName: 'Additional Fields',
  name: 'additionalFields',
  type: 'collection',
  default: {},
  placeholder: 'Add Field',
  displayOptions: {
    show: {
      resource: ['...'],
      operation: ['...'],
    },
  },
  options: [
    // optional parameters go here
  ],
};
```

## Declarative-style parameters

These extend the standard parameters for declarative nodes.

### `methods` and `loadOptions` (object, optional)
Use `loadOptions` to query the service for user-specific options (e.g., lists for dropdowns). It includes routing info to fetch options and post-processing steps to format them.

Example:
```ts
const methods = {
  loadOptions: {
    routing: {
      request: {
        url: '/webhook/example-option-parameters',
        method: 'GET',
      },
      output: {
        postReceive: [
          {
            // If returned data is nested under a property
            type: 'rootProperty',
            properties: { property: 'responseData' },
          },
          {
            type: 'setKeyValue',
            properties: {
              name: '={{$responseItem.key}} ({{$responseItem.value}})',
              value: '={{$responseItem.value}}',
            },
          },
          {
            // Sort alphabetically by a key
            type: 'sort',
            properties: { key: 'name' },
          },
        ],
      },
    },
  },
};
```

### `routing` (object, required in options)
Used inside operation `options` and field definitions to declare API calls.

Typical pattern within `description`:
```ts
description: INodeTypeDescription = {
  requestDefaults: {
    baseURL: 'https://api.example.com',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  properties: [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      options: [
        {
          name: 'Get',
          value: 'get',
          action: 'Get resource',
          routing: {
            request: { method: 'GET', url: '/resource' },
          },
        },
      ],
      default: 'get',
    },
  ],
};
```

Note: You can also use `routing.output.postReceive` steps similar to `loadOptions` to reshape API responses.

### `version` (number | number[], optional)
For light versioning, use a single number or an array of supported versions.

## Programmatic-style execute() method

Programmatic nodes require an `execute()` method, which builds requests from incoming data and node parameters and returns `INodeExecutionData[][]`.

Paired items requirement: Include input/output item pairing information in the returned data so n8n can track lineage.

## Programmatic-style parameters

These extend the standard parameters for programmatic nodes.

### `defaultVersion` (number, optional)
Used when employing full versioning to indicate the default version.

### `methods` and `loadOptions` (object, optional)
Programmatic nodes can also expose `loadOptions` helpers. Example pattern:

```ts
methods = {
  loadOptions: {
    async getLabels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
      const returnData: INodePropertyOptions[] = [];
      const labels = await googleApiRequestAllItems.call(
        this,
        'labels',
        'GET',
        '/gmail/v1/users/me/labels',
      );
      for (const label of labels) {
        returnData.push({ name: label.name, value: label.id });
      }
      return returnData;
    },
  },
};
```

### `version` (number | number[], optional)
For light versioning, use a single number or an array of supported versions. Programmatic nodes may also use full versioning.

## Mapping to coz.jp Link resource (this repo)

- Resource: `Link`
- Operations to provide: `Create (Shorten)`, `Get`, `Update`, `Delete`, `Expand`, `List`
- Credentials: API key/token sent via header or query, configured under `credentials/CozjpApi.credentials.ts`
- requestDefaults: Set `baseURL` to the coz.jp API, include `Accept` and `Content-Type: application/json`
- Routing: Map required fields into `body` or `qs` depending on the endpoint; optional fields go under an `Additional Fields` collection.

This appendix makes the guide self-contained so you don’t need to consult remote references while working in this repository.
