import {Command, Flags} from '@oclif/core'
import {JiraService} from '../../services/jira'
import jiraView from '../../services/jira-view'

export default class Projects extends Command {
  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Whom is saying hello', required: false}),
  }

  static args = [{name: 'person', description: 'Person to say hello to', required: false}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Projects)

    const a = new JiraService()
    const projects = await a.getProjects()

    console.table(projects.map(element => jiraView.formatProject(element)).join('\n'))
  }
}
