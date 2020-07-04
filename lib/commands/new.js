"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../lib/base");
const command_1 = require("@oclif/command");
const chalk = require('chalk');
const cli_ux_1 = require("cli-ux");
class New extends base_1.default {
    async doCommand(userConfig, client) {
        const { args, flags } = this.parse(New);
        let actions = [];
        if (flags.action) {
            actions.push(flags.action);
        }
        let tags = [];
        if (flags.tag && flags.tag.length > 0) {
            tags = flags.tag;
        }
        cli_ux_1.default.action.start(`creating new giki`);
        const resp = await client.post('talks/create', {
            text: args.text,
            tags: tags,
            actions: actions
        });
        cli_ux_1.default.action.stop();
        // here we believe the request is success, otherwise the cli.action will exit with non-0 value and cannot reaches here
        this.log(chalk.green('giki created!'));
    }
}
exports.default = New;
New.description = 'post a new giki under your account';
New.flags = {
    help: command_1.flags.help({ char: 'h' }),
    tag: command_1.flags.string({ char: 't', description: 'tag of the new giki', multiple: true }),
    action: command_1.flags.string({ char: 'a', description: 'action of the new giki', options: ['weibo', 'i'] }),
};
New.args = [{ name: 'text', required: true, description: 'text to giki' }];
