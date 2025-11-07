"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkDescription = void 0;
const showForLink = { resource: ['link'] };
const showForOp = (ops) => ({ operation: ops, resource: ['link'] });
exports.linkDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            { name: 'Create', value: 'create', description: 'Create a short link' },
            { name: 'Delete', value: 'delete', description: 'Delete a link' },
            { name: 'Get', value: 'get', description: 'Retrieve a link by ID' },
            { name: 'List', value: 'list', description: "List user's links" },
            { name: 'Update', value: 'update', description: 'Update a link' },
        ],
        default: 'list',
        displayOptions: { show: showForLink },
    },
    {
        displayName: 'Simplify Response',
        name: 'simplify',
        description: 'Return only the API response data payload when available',
        type: 'boolean',
        default: true,
        displayOptions: { show: showForLink },
    },
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
//# sourceMappingURL=index.js.map