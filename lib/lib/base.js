"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs");
const path_1 = require("path");
const axios = require("axios");
const cli_ux_1 = require("cli-ux");
const chalk = require('chalk');
class default_1 extends command_1.default {
    async initConfig() {
        this.log(`
    hi, welcome to giki-cli!
    before you can go ahead, we need to do some config.
    
    please firstly go to https://<your_name>.giki.app/setting to get and copy your token,
    `);
        const token = await cli_ux_1.cli.prompt('paste your token here');
        this.log(chalk.yellow('got it, your token will only appears in local config file, relax.'));
        const userConfig = {
            token: token
        };
        cli_ux_1.cli.action.start(`creating config.json in ${this.config.configDir}`);
        fs.writeFileSync(path_1.join(this.config.configDir, 'config.json'), JSON.stringify(userConfig));
        cli_ux_1.cli.action.stop();
        this.log(chalk.green('config done, enjoy!'));
    }
    async run() {
        if (!fs.existsSync(path_1.join(this.config.configDir, 'config.json'))) {
            await this.initConfig();
        }
        const configPath = path_1.join(this.config.configDir, 'config.json');
        const fileContent = fs.readFileSync(configPath, 'utf8');
        const userConfig = JSON.parse(fileContent);
        if (!userConfig.token) {
            this.log(chalk.bold.red(`missing 'token' filed in ${configPath}`));
            this.log(chalk.yellow('please delete above file and run again'));
            return;
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
