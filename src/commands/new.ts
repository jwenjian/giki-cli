import Command from '../lib/base'
import { flags } from '@oclif/command'
import { AxiosInstance } from 'axios'
const chalk = require('chalk');
import cli from 'cli-ux'

export default class New extends Command {
  static description = 'post a new giki under your account'

  static flags = {
    help: flags.help({ char: 'h' }),
    tag: flags.string({ char: 't', description: 'tag of the new giki' }),
    action: flags.string({ char: 'a', description: 'action of the new giki', options: ['weibo', 'i'] }),
  }

  static args = [{ name: 'text', required: true, description: 'text to giki' }]

  async doCommand(userConfig: Object, client: AxiosInstance) {
    const { args, flags } = this.parse(New)
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
