"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanielpetricaCozjp = void 0;
const link_1 = require("./resources/link");
class DanielpetricaCozjp {
    constructor() {
        this.description = {
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
                ...link_1.linkDescription,
            ],
        };
    }
}
exports.DanielpetricaCozjp = DanielpetricaCozjp;
//# sourceMappingURL=DanielpetricaCozjp.node.js.map