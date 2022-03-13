oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g turbojira
$ turbojira COMMAND
running command...
$ turbojira (--version)
turbojira/0.0.0 darwin-x64 node-v16.14.0
$ turbojira --help [COMMAND]
USAGE
  $ turbojira COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`turbojira doing`](#turbojira-doing)
* [`turbojira help [COMMAND]`](#turbojira-help-command)
* [`turbojira issues [PERSON]`](#turbojira-issues-person)
* [`turbojira plugins`](#turbojira-plugins)
* [`turbojira plugins:inspect PLUGIN...`](#turbojira-pluginsinspect-plugin)
* [`turbojira plugins:install PLUGIN...`](#turbojira-pluginsinstall-plugin)
* [`turbojira plugins:link PLUGIN`](#turbojira-pluginslink-plugin)
* [`turbojira plugins:uninstall PLUGIN...`](#turbojira-pluginsuninstall-plugin)
* [`turbojira plugins update`](#turbojira-plugins-update)
* [`turbojira projects [PERSON]`](#turbojira-projects-person)

## `turbojira doing`

Get your Jira tickets and issues, select one and start working

```
USAGE
  $ turbojira doing

DESCRIPTION
  Get your Jira tickets and issues, select one and start working

  This command will checkout to develop, pull, and checkout to a new branch with name ISSUE_TYPE/ISSUE_KEY/DESCRIPTION

EXAMPLES
  $ turbojira issues
```

_See code: [dist/commands/doing/index.ts](https://github.com/personal/hello-world/blob/v0.0.0/dist/commands/doing/index.ts)_

## `turbojira help [COMMAND]`

Display help for turbojira.

```
USAGE
  $ turbojira help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for turbojira.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `turbojira issues [PERSON]`

Get your Jira tickets and issues

```
USAGE
  $ turbojira issues [PERSON] [-f <value>]

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  Whom is saying hello

DESCRIPTION
  Get your Jira tickets and issues

EXAMPLES
  $ turbojira issues
```

_See code: [dist/commands/issues/index.ts](https://github.com/personal/hello-world/blob/v0.0.0/dist/commands/issues/index.ts)_

## `turbojira plugins`

List installed plugins.

```
USAGE
  $ turbojira plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ turbojira plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `turbojira plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ turbojira plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ turbojira plugins:inspect myplugin
```

## `turbojira plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ turbojira plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ turbojira plugins add

EXAMPLES
  $ turbojira plugins:install myplugin 

  $ turbojira plugins:install https://github.com/someuser/someplugin

  $ turbojira plugins:install someuser/someplugin
```

## `turbojira plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ turbojira plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ turbojira plugins:link myplugin
```

## `turbojira plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ turbojira plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ turbojira plugins unlink
  $ turbojira plugins remove
```

## `turbojira plugins update`

Update installed plugins.

```
USAGE
  $ turbojira plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `turbojira projects [PERSON]`

Say hello

```
USAGE
  $ turbojira projects [PERSON] [-f <value>]

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/projects/index.ts](https://github.com/personal/hello-world/blob/v0.0.0/dist/commands/projects/index.ts)_
<!-- commandsstop -->
