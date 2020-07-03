import Command from '../lib/base'
import { flags } from '@oclif/command'
import { AxiosInstance } from 'axios'
const chalk = require('chalk');
import cli from 'cli-ux'

export default class Explore extends Command {
  static description = 'explore talks on giki.app'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --number=VALUE)
    number: flags.string({ char: 'n', description: 'number of talks to explore, [1-20], default 5' })
  }

  async doCommand(userConfig: { token: any; }, client: AxiosInstance) {
    const { args, flags } = this.parse(Explore)

    let n = 5
    if (flags.number) {
      let input_n = Number.parseInt(flags.number)
      if (input_n >=1 && input_n <= 20) {
        n = input_n
      } else if (input_n > 20) {
        n = 20
      } else {
        n = 5
      }
    }

    // start the spinner
    cli.action.start(`Getting latest ${n} talks...`)

    const resp = await client.get('talks/explore')

    // stop the spinner
    cli.action.stop() // shows 'starting a process... done'

    // sort by id desc
    let origData = resp.data.data
    origData.slice(0, n).reverse().forEach((talk: any) => {
      this.log(`${chalk.blue(talk.name)}\t${chalk.redBright(talk.created_at)}:\n${talk.text}\n------------------------------\n`)
    });

  }
}
