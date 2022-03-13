import * as shell from 'shelljs'
import {JiraIssue} from './jira-view'
import {kebabCase} from 'lodash'

export type GitStarTaskOptions ={
  baseBranch?: string
}
class GitService {
  startTask(issue:JiraIssue, {baseBranch = 'develop'}: GitStarTaskOptions = {}) {
    const type = kebabCase(issue.fields.issuetype.name)
    const description = kebabCase(issue.fields.summary)
    const branchName = `${type}/${issue.key}/${description}`

    const developResult = shell.exec(`git checkout ${baseBranch}`)

    if (developResult.code !== 0) {
      console.log('Something failed trying to checkout to develop branch')
      throw new Error(`Git checkout ${baseBranch} failed`)
    }

    shell.exec(`git pull origin/${baseBranch}`)
    if (shell.exec(`git checkout -b ${branchName}`).code === 0) {
      console.log('New branch created')
    } else {
      console.log(`Switching to "${branchName}"`)
      shell.exec(`git checkout ${branchName}`)
    }
  }
}

export default new GitService()
