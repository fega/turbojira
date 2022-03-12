import * as inquirer from 'inquirer'
import {Command, Flags} from '@oclif/core'
import {JiraService} from '../../services/jira'
import jiraView, {JiraIssue} from '../../services/jira-view'
import gitService from '../../services/git'

export default class Doing extends Command {
  static description = `Get your Jira tickets and issues, select one and start working
    This command will checkout to develop, pull, and checkout to a new branch with name ISSUE_TYPE/ISSUE_KEY/DESCRIPTION`

  static examples = [
    '$ turbojira issues',
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Doing)

    const jiraService = new JiraService()
    const issues = await jiraService.getIssues()

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
    await gitService.startTask(ticket as JiraIssue)
    await jiraService.updateIssueToInProgress(key, 'Issue transitioned to in progress')
  }
}
