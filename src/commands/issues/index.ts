import {Command, Flags} from '@oclif/core'
import {JiraService} from '../../services/jira'
import jiraView from '../../services/jira-view'

export default class Issues extends Command {
  static description = 'Get your Jira tickets and issues'

  static examples = [
    '$ turbojira issues',
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Whom is saying hello', required: false}),
  }

  static args = [{name: 'person', description: 'Person to say hello to', required: false}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Issues)

    const a = new JiraService()
    const issues = await a.getIssues()

    console.log(issues.map(element => jiraView.formatIssue(element)).join('\n'))
  }
}
