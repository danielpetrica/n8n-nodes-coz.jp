import type { INodeProperties } from 'n8n-workflow';

// Display conditions helpers
const showForLink = { resource: ['link'] };
const showForOp = (ops: string[]) => ({ operation: ops, resource: ['link'] });

export const linkDescription: INodeProperties[] = [
	// Operation selector
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Create', value: 'create', action: 'Create a short link', description: 'Create a short link' },
			{ name: 'Delete', value: 'delete', action: 'Delete a link', description: 'Delete a link' },
			{ name: 'Get', value: 'get', action: 'Retrieve a link by ID', description: 'Retrieve a link by ID' },
			{ name: 'List', value: 'list', action: "List user's links", description: "List user's links" },
			{ name: 'Update', value: 'update', action: 'Update a link', description: 'Update a link' },
		],
		default: 'list',
		displayOptions: { show: showForLink },
	},

	// Simplify Response (optional)
	{
		displayName: 'Simplify Response',
		name: 'simplify',
		description: 'Whether to return only the API response data payload when available',
		type: 'boolean',
		default: true,
		displayOptions: { show: showForLink },
	},

	// Common: Link ID for get/update/delete
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the link',
		displayOptions: {
			show: showForOp(['get', 'update', 'delete']),
		},
		routing: {
			request: {
				url: '=/links/{{$value}}',
			},
		},
	},

	// Create: URL
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'The target URL to shorten',
		displayOptions: {
			show: showForOp(['create']),
		},
		routing: {
			send: { type: 'body', property: 'url' },
		},
	},

	// Update: URL
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'New URL for the link',
		displayOptions: {
			show: showForOp(['update']),
		},
		routing: {
			send: { type: 'body', property: 'url' },
		},
	},

	// Operations routing definitions
	{
		displayName: 'Create',
		name: 'createOperation',
		type: 'hidden',
		default: '',
		displayOptions: { show: showForOp(['create']) },
			routing: {
				request: {
					method: 'POST',
					url: '/links',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
					],
				},
			},
	},
	{
		displayName: 'Get',
		name: 'getOperation',
		type: 'hidden',
		default: '',
		displayOptions: { show: showForOp(['get']) },
			routing: {
				request: {
					method: 'GET',
					url: '=/links/{{$parameter.linkId}}',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
					],
				},
			},
	},
	{
		displayName: 'List',
		name: 'listOperation',
		type: 'hidden',
		default: '',
		displayOptions: { show: showForOp(['list']) },
			routing: {
				request: {
					method: 'GET',
					url: '/links',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
					],
				},
			},
	},
	{
		displayName: 'Update',
		name: 'updateOperation',
		type: 'hidden',
		default: '',
		displayOptions: { show: showForOp(['update']) },
			routing: {
				request: {
					method: 'PATCH',
					url: '=/links/{{$parameter.linkId}}',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
					],
				},
			},
	},
	{
		displayName: 'Delete',
		name: 'deleteOperation',
		type: 'hidden',
		default: '',
		displayOptions: { show: showForOp(['delete']) },
		routing: {
			request: {
				method: 'DELETE',
				url: '=/links/{{$parameter.linkId}}',
			},
			output: {
				postReceive: [
					{
						type: 'set',
						properties: {
							value: { success: true },
						},
					},
				],
			},
		},
	},
];
