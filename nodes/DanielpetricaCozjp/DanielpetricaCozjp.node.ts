import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { linkDescription } from './resources/link';

export class DanielpetricaCozjp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Danielpetrica Coz.jp',
		name: 'danielpetricaCozjp',
		icon: { light: 'file:danielpetricaCozjp.svg', dark: 'file:danielpetricaCozjp.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Danielpetrica\'s Coz.jp API',
		defaults: {
			name: 'Danielpetrica Coz.jp',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{ name: 'danielpetricaCozjpApi', required: true }
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl || "https://coz.jp/api"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Link',
						value: 'link',
					},
				],
				default: 'link',
			},
			...linkDescription,
		],
	};
}
