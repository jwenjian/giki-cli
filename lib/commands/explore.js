"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../lib/base");
const command_1 = require("@oclif/command");
const chalk = require('chalk');
const cli_ux_1 = require("cli-ux");
class Explore extends base_1.default {
    async doCommand(userConfig, client) {
        const { args, flags } = this.parse(Explore);
        let n = 5;
        if (flags.number) {
            let input_n = Number.parseInt(flags.number);
            if (input_n >= 1 && input_n <= 20) {
                n = input_n;
            }
            else if (input_n > 20) {
                n = 20;
            }
            else {
                n = 5;
            }
        }
        // start the spinner
        cli_ux_1.default.action.start(`Getting latest ${n} talks...`);
        const resp = await client.get('talks/explore');
        // stop the spinner
        cli_ux_1.default.action.stop(); // shows 'starting a process... done'
        // sort by id desc
        let origData = resp.data.data;
        origData.slice(0, n).reverse().forEach((talk) => {
            this.log(`${chalk.blue(talk.name)}\t${chalk.redBright(talk.created_at)}:\n${talk.text}\n------------------------------\n`);
        });
    }
}
exports.default = Explore;
Explore.description = 'explore talks on giki.app';
Explore.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --number=VALUE)
    number: command_1.flags.string({ char: 'n', description: 'number of talks to explore, [1-20], default 5' })
};
