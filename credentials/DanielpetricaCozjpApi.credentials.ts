import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DanielpetricaCozjpApi implements ICredentialType {
	name = 'danielpetricaCozjpApi';

	displayName = 'Danielpetrica Coz.jp API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/danielpetrica/n8n-nodes-coz.jp';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://coz.jp/api',
			url: '/v1/user',
		},
	};
}
