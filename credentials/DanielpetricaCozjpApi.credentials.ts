import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class DanielpetricaCozjpApi implements ICredentialType {
	name = 'danielpetricaCozjpApi';

	displayName = 'Danielpetrica Coz.jp API';

	// Icon shown in Credentials UI
	icon = { light: 'file:danielpetricaCozjp.credentials.svg', dark: 'file:danielpetricaCozjp.credentials.dark.svg' } as Icon;

	// Link to your community node's README
	documentationUrl = 'https://github.com/danielpetrica/n8n-nodes-cozjp';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Personal API token from your coz.jp profile (Bearer token)',
			},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://coz.jp/api/',
			description: 'Override the API base URL for local testing',
		},
		];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
 	request: {
			baseURL: '={{$credentials.baseUrl || "https://coz.jp/api"}}',
			url: '/links',
		},
	};
}
