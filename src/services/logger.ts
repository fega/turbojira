import chalk = require('chalk')

export const  log = (message: string): void => {
  console.log(`🤖 ${chalk.green(message)}`)
}

export const error = (message: string): void => {
  console.log(`💥 ${chalk.red(message)}`)
}
