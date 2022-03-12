import chalk = require('chalk')

export type JiraIssue ={
  id: string,
  expand: string,
  self: string,
  key: string,
  fields:{

  summary: string,

  priority: {
    self: string,
    name: string,
    id: string,
  }
  status: {
    self: string,
    description: string,
    name: string,
    id: string,
    statusCategory: any
  },
  issuetype:{
    self: string,
    id: string,
    description: string,
    iconUrl: string,
    name: string,
    subTask: boolean,
    hierarchyLevel: 0,
  }
}
}

class JiraView {
  public formatIssue(issue: JiraIssue): string {
    return `${this.getPriority(issue)}  ${this.getKey(issue)}  ${this.getIssueType(issue)}  ${this.getIssueStatus(issue)}  ${chalk.yellowBright(':')}  ${this.getIssueSummary(issue)}`
  }

  private getKey(issue: JiraIssue) {
    return chalk.whiteBright(chalk.underline(issue?.key))
  }

  private getPriority(issue: JiraIssue) {
    if (issue?.fields?.priority?.name.includes('Medium')) return chalk.yellow('=')
    if (issue?.fields?.priority?.name.includes('Highest')) return chalk.redBright('↑')
    if (issue?.fields?.priority?.name.includes('High')) return chalk.red('↑')
    if (issue?.fields?.priority?.name.includes('Lowest')) return chalk.blue('↓')
    if (issue?.fields?.priority?.name.includes('Low')) return chalk.blueBright('↓')
    return issue?.fields?.priority?.name
  }

  private getIssueType(issue: JiraIssue) {
    if (issue?.fields?.issuetype?.name.includes('Sub-task')) return chalk.gray(chalk.bgCyan(' STask '))
    if (issue?.fields?.issuetype?.name.includes('Task')) return chalk.bgBlue(` ${issue?.fields?.issuetype?.name}  `)
    if (issue?.fields?.issuetype?.name.includes('Story')) return chalk.gray(chalk.bgGreen(` ${issue?.fields?.issuetype?.name} `))
    if (issue?.fields?.issuetype?.name.includes('Bug')) return chalk.bgRed(`  ${issue?.fields?.issuetype?.name}  `)
    if (issue?.fields?.issuetype?.name.includes('Spike')) return chalk.gray(chalk.bgYellow(` ${issue?.fields?.issuetype?.name} `))
    return issue?.fields?.issuetype?.name
  }

  private getIssueStatus(issue: JiraIssue) {
    if (issue?.fields?.status?.name.includes('Open')) return chalk.inverse(`     ${issue?.fields?.status?.name}     `)
    if (issue?.fields?.status?.name.includes('In Progress')) return chalk.bgBlue(` ${issue?.fields?.status?.name}  `)
    if (issue?.fields?.status?.name.includes('Done')) return chalk.gray(chalk.bgGreen('    Done      '))
    if (issue?.fields?.status?.name.includes('Resolved')) return chalk.gray(chalk.bgGreen('   Resolved   '))
    if (issue?.fields?.status?.name.includes('Ready for Test')) return chalk.gray(chalk.bgCyan('Ready for Test'))
    if (issue?.fields?.status?.name.includes('Peer Review')) return chalk.gray(chalk.bgCyan(' Peer Review  '))
    return issue?.fields?.status?.name
  }

  private getIssueSummary(issue: JiraIssue) {
    if (!issue.fields.summary) return ''
    const strArr = issue.fields.summary.split(':')
    if (strArr.length > 1) {
      strArr[0] = chalk.whiteBright(strArr[0])
    }

    return strArr.join(':').replace(/\n/g, '').trim()
  }
}

export default new JiraView()
