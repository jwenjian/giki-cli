import Command, {flags} from '@oclif/command'
import * as fs from 'fs'
import {join} from 'path'
import * as axios from 'axios'
import { cli } from 'cli-ux'
const chalk = require('chalk');


export default abstract class extends Command {
  async initConfig() {
    this.log(`
    hi, welcome to giki-cli!
    before you can go ahead, we need to do some config.
    
    please firstly go to https://<your_name>.giki.app/setting to get and copy your token,
    `)
    const token = await cli.prompt('paste your token here')
    this.log(chalk.yellow('got it, your token will only appears in local config file, relax.'))
    const userConfig = {
      token: token
    }
    cli.action.start(`creating config.json in ${this.config.configDir}`)
    fs.writeFileSync(join(this.config.configDir, 'config.json'), JSON.stringify(userConfig))
    cli.action.stop()
    this.log(chalk.green('config done, enjoy!'))
  }

  async run() {
    if (!fs.existsSync(join(this.config.configDir, 'config.json'))) {
      await this.initConfig()
    }
    const configPath = join(this.config.configDir, 'config.json')
    const fileContent = fs.readFileSync(configPath, 'utf8')
    const userConfig = JSON.parse(fileContent)
    if (!userConfig.token) {
      this.log(chalk.bold.red(`missing 'token' filed in ${configPath}`))
      this.log(chalk.yellow('please delete above file and run again'))
      return
    }
    const client = axios.default.create({
      baseURL: 'https://giki.app/api',
      headers: {
        'authorization': 'Basic ' + userConfig.token,
        'content-type': 'application/json'
      }
    })
    await this.doCommand(userConfig, client)
  }

  async doCommand(_userConfig: Object, client: axios.AxiosInstance) {
    
  }
}