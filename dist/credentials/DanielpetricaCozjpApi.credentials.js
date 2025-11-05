"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanielpetricaCozjpApi = void 0;
class DanielpetricaCozjpApi {
    constructor() {
        this.name = 'danielpetricaCozjpApi';
        this.displayName = 'Danielpetrica Coz.jp API';
        this.documentationUrl = 'https://github.com/danielpetrica/n8n-nodes-coz.jp';
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
                baseURL: '={{$credentials.baseUrl || "https://coz.jp/apii"}}',
                url: '/links',
            },
        };
    }
}
exports.DanielpetricaCozjpApi = DanielpetricaCozjpApi;
//# sourceMappingURL=DanielpetricaCozjpApi.credentials.js.map