giki-cli
========

A CLI app for giki.app

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
giki-cli/0.0.1 darwin-x64 node-v12.15.0
$ giki --help [COMMAND]
USAGE
  $ giki COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`giki explore`](#giki-explore)
* [`giki help [COMMAND]`](#giki-help-command)

## `giki explore`

explore talks on giki.app

```
USAGE
  $ giki explore

OPTIONS
  -h, --help           show CLI help
  -n, --number=number  number of talks to explore, [1-20], default 5
```

_See code: [src/commands/explore.ts](https://github.com/jwenjian/giki-cli/blob/v0.0.1/src/commands/explore.ts)_

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
<!-- commandsstop -->
