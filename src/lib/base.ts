import Command, {flags} from '@oclif/command'
import * as fs from 'fs'
import {join} from 'path'
import * as axios from 'axios'


export default abstract class extends Command {
  async run() {
    if (!fs.existsSync(join(this.config.configDir, 'config.json'))) {
      throw new Error('No config.json')
    }
    const fileContent = fs.readFileSync(join(this.config.configDir, 'config.json'), 'utf8')
    const userConfig = JSON.parse(fileContent)
    if (!userConfig.token) {
      throw new Error('Missing token config item in cofig.json')
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