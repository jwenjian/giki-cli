giki-cli
========

A CLI app for giki.app

⚠️ If you want to upload image to your new giki talk, you MUST install picgo globally(`npm install picgo -g`) first, see this [picgo bug](https://github.com/PicGo/PicGo-Core/issues/46).

Also I highly recommend you to test picgo by execute `picgo upload <image_file>` before using `-i` flag in `giki new` command

---

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/giki-cli.svg)](https://npmjs.org/package/giki-cli)
[![Downloads/week](https://img.shields.io/npm/dw/giki-cli.svg)](https://npmjs.org/package/giki-cli)
[![License](https://img.shields.io/npm/l/giki-cli.svg)](https://github.com/jwenjian/giki-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g giki-cli
$ giki COMMAND
running command...
$ giki (-v|--version|version)
giki-cli/0.4.2 darwin-x64 node-v12.15.0
$ giki --help [COMMAND]
USAGE
  $ giki COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`giki autocomplete [SHELL]`](#giki-autocomplete-shell)
* [`giki explore`](#giki-explore)
* [`giki help [COMMAND]`](#giki-help-command)
* [`giki list`](#giki-list)
* [`giki new TEXT`](#giki-new-text)

## `giki autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ giki autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ giki autocomplete
  $ giki autocomplete bash
  $ giki autocomplete zsh
  $ giki autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `giki explore`

explore talks on giki.app

```
USAGE
  $ giki explore

OPTIONS
  -h, --help           show CLI help
  -n, --number=number  number of talks to explore, [1-20], default 5
```

_See code: [src/commands/explore.ts](https://github.com/jwenjian/giki-cli/blob/v0.4.2/src/commands/explore.ts)_

## `giki help [COMMAND]`

display help for giki

```
USAGE
  $ giki help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `giki list`

list your latest talks

```
USAGE
  $ giki list

OPTIONS
  -h, --help           show CLI help
  -n, --number=number  number of talks to list, [1-20], default 5
```

_See code: [src/commands/list.ts](https://github.com/jwenjian/giki-cli/blob/v0.4.2/src/commands/list.ts)_

## `giki new TEXT`

post a new giki under your account

```
USAGE
  $ giki new TEXT

ARGUMENTS
  TEXT  text to giki

OPTIONS
  -a, --action=weibo|i  action of the new giki
  -h, --help            show CLI help

  -i, --image=image     image file path to upload, note that image uploading is powered by
                        https://github.com/PicGo/PicGo-Core, please make sure you have the correct configuration.

  -t, --tag=tag         tag[s] of the new giki, you can set more than 1 tags but you must put the -t flag after the text
                        argument, like: `giki new "text to talk" -t <tag1> -t <tag2>`
```

_See code: [src/commands/new.ts](https://github.com/jwenjian/giki-cli/blob/v0.4.2/src/commands/new.ts)_
<!-- commandsstop -->
