import Command from '../lib/base'
import {flags} from '@oclif/command'
import {AxiosInstance} from 'axios'
const chalk = require('chalk')
import cli from 'cli-ux'
const PicGo = require('picgo')
const picgo = new PicGo()

export default class New extends Command {
  static description = 'post a new giki under your account'

  static flags = {
    help: flags.help({char: 'h'}),
    tag: flags.string({char: 't', description: 'tag[s] of the new giki, you can set more than 1 tags but you must put the -t flag after the text argument, like: `giki new "text to talk" -t <tag1> -t <tag2>`', multiple: true}),
    action: flags.string({char: 'a', description: 'action of the new giki', options: ['weibo', 'i']}),
    image: flags.string({char: 'i', description: 'image file path to upload, note that image uploading is powered by https://github.com/PicGo/PicGo-Core, please make sure you have the correct configuration.'}),
  }

  static args = [{name: 'text', required: true, description: 'text to giki'}]

  async uploadImage(imagePath: string) {
    return new Promise((resolve, reject) => {
      picgo.on('finished', (ctx: any) => resolve(ctx.output))
      picgo.on('error', (err: any) => {
        this.log(chalk.red('failed to upload image'))
        reject(err)
      })
      picgo.upload([imagePath])
    })
  }

  async doCommand(userConfig: Record<string, any>, client: AxiosInstance) {
    const {args, flags} = this.parse(New)
    const actions = []
    if (flags.action) {
      actions.push(flags.action)
    }
    let tags: string[]  = []
    if (flags.tag && flags.tag.length > 0) {
      tags =  flags.tag
    }
    let text = args.text
    let image_url = ''
    if (flags.image) {
      const img_resp: any = await this.uploadImage(flags.image)
      // only get first image url
      image_url =  img_resp[0].imgUrl
      // upload image must success to continue
      if (!image_url) {
        this.log(chalk.red('failed to upload image, please check your picgo config'))
        return
      }
      text = `${text}\n\n![](${image_url})\n`
    }

    cli.action.start('creating new giki')
    await client.post('talks/create', {
      text: text,
      tags: tags,
      actions: actions,
    })
    cli.action.stop()

    // here we believe the request is success, otherwise the cli.action will exit with non-0 value and cannot reaches here
    this.log(chalk.green('giki created!'))
  }
}
