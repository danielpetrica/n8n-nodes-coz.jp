import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{ name: 'danielpetricaCozjpApi', required: true }
		],
		requestDefaults: {
			baseURL: 'https://coz.jp/api/',
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
						name: 'User',
						value: 'user',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
