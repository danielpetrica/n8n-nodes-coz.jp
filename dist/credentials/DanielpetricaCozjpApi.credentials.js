"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanielpetricaCozjpApi = void 0;
class DanielpetricaCozjpApi {
    constructor() {
        this.name = 'danielpetricaCozjpApi';
        this.displayName = 'Danielpetrica Coz.jp API';
        this.icon = { light: 'file:danielpetricaCozjp.credentials.svg', dark: 'file:danielpetricaCozjp.credentials.dark.svg' };
        this.documentationUrl = 'https://github.com/danielpetrica/n8n-nodes-cozjp';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{"Bearer " + $credentials.apiToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl || "https://coz.jp/api"}}',
                url: '/links',
            },
        };
    }
}
exports.DanielpetricaCozjpApi = DanielpetricaCozjpApi;
//# sourceMappingURL=DanielpetricaCozjpApi.credentials.js.map