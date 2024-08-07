"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadSettings(network) {
    return {
        marketplaceAdminAddress: ''
    };
}
const configuration = {
    deploymentScriptDir: 'scripts',
    compilerOptions: {
        errorOnWarnings: true,
        ignoreUnusedConstantsWarnings: true
    },
    networks: {
        devnet: {
            networkId: 4,
            nodeUrl: 'http://127.0.0.1:22973',
            privateKeys: [
                'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'
            ],
            confirmations: 1,
            settings: loadSettings('devnet')
        },
        testnet: {
            nodeUrl: process.env.NODE_URL,
            privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
            confirmations: 2,
            settings: loadSettings('testnet')
        },
        mainnet: {
            nodeUrl: process.env.NODE_URL,
            privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
            confirmations: 2,
            settings: loadSettings('mainnet')
        }
    }
};
exports.default = configuration;
