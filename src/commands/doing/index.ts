import * as inquirer from 'inquirer'
import {Command, Flags} from '@oclif/core'
import {JiraService} from '../../services/jira'
import jiraView, {JiraIssue} from '../../services/jira-view'
import gitService from '../../services/git'
import {Arg} from '@oclif/core/lib/interfaces'
import config from '../../services/config'
import {log} from '../../services/logger'

export default class Doing extends Command {
  static description = `Get your Jira tickets and issues, select one and start working
    This command will checkout to develop, pull, and checkout to a new branch with name ISSUE_TYPE/ISSUE_KEY/DESCRIPTION`

  static examples = [
    '$ turbojira issues',
  ]

  static flags = {
    currentBranch: Flags.boolean({char: 'c', description: 'Start from current branch', required: false}),
  }

  static args = Array.from({length: 100}).fill({name: 'search'}) as Arg<any>[]

  async run(): Promise<void> {
    const {flags: {currentBranch}, args, argv} = await this.parse(Doing)

    const jiraService = new JiraService()
    let issues: JiraIssue[] = []
    issues = await (new RegExp(`${config.baseProject}-\\d{1,4}`).test(argv.join(' ')) ?
      jiraService.searchIssuesByKey(argv.join(' ')) :
      jiraService.searchIssues(argv.join(' ')))

    const formatted = issues.map(element => ({
      ...element,
      name: jiraView.formatIssue(element),
      value: element.key,
    }))

    const answers = await inquirer.prompt([{
      name: 'What task are you doing?',
      type: 'list',
      choices: formatted,
      pageSize: 50,
    }])
    const key = answers['What task are you doing?']
    const ticket = issues.find(el => el.key === key)
    await gitService.startTask(ticket as JiraIssue, {baseBranch: config.baseBranch, startFromCurrentBranch: currentBranch})
    log('Transition issue to in progress')
    await jiraService.updateIssueToInProgress(key, 'Issue transitioned to in progress')
  }
}
