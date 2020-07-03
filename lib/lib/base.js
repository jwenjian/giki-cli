"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs");
const path_1 = require("path");
const axios = require("axios");
class default_1 extends command_1.default {
    async run() {
        if (!fs.existsSync(path_1.join(this.config.configDir, 'config.json'))) {
            throw new Error('No config.json');
        }
        const fileContent = fs.readFileSync(path_1.join(this.config.configDir, 'config.json'), 'utf8');
        const userConfig = JSON.parse(fileContent);
        if (!userConfig.token) {
            throw new Error('Missing token config item in cofig.json');
        }
        const client = axios.default.create({
            baseURL: 'https://giki.app/api',
            headers: {
                'authorization': 'Basic ' + userConfig.token,
                'content-type': 'application/json'
            }
        });
        await this.doCommand(userConfig, client);
    }
    async doCommand(_userConfig, client) {
    }
}
exports.default = default_1;
