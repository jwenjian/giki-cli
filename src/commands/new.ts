import Command from '../lib/base'
import { flags } from '@oclif/command'
import { AxiosInstance } from 'axios'
const chalk = require('chalk');
import cli from 'cli-ux'

export default class New extends Command {
  static description = 'create and post a new giki to your account'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    tag: flags.string({ char: 't', description: 'tag of the new giki' }),
    action: flags.string({ char: 'a', description: 'action of the new giki' }),
  }

  static args = [{ name: 'text' }]

  async doCommand(userConfig: Object, client: AxiosInstance) {
    const { args, flags } = this.parse(New)
    if (!args.text) {
      this.warn(new Error('Text cannot be empty!'))
      return
    }
    let actions = []
    if (flags.action) {
      actions.push(flags.action)
    }
    let tags = []
    if (flags.tag) {
      tags.push(flags.tag)
    }
    cli.action.start(`creating new giki`)
    const resp = await client.post('talks/create', {
      text: args.text,
      tags: tags,
      actions: actions
    })
    cli.action.stop()

    // here we believe the request is success, otherwise the cli.action will exit with non-0 value and cannot reaches here
    this.log(chalk.green('giki created!'))
    
  }
}
