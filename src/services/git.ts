import * as shell from 'shelljs'
import {JiraIssue} from './jira-view'
import {kebabCase} from 'lodash'

class GitService {
  startTask(issue:JiraIssue) {
    const type = kebabCase(issue.fields.issuetype.name)
    const description = kebabCase(issue.fields.summary)
    const branchName = `${type}/${issue.key}/${description}`
    const developResult = shell.exec('git checkout develop')
    if (developResult.code !== 0) {
      console.log('Something failed trying to checkout to develop branch')
      throw new Error('Git checkout develop failed')
    }

    shell.exec('git pull origin/develop')
    if (shell.exec(`git checkout -b ${branchName}`).code === 0) {
      console.log('New branch created')
    } else {
      console.log(`Switching to "${branchName}"`)
      shell.exec(`git checkout ${branchName}`)
    }
  }
}

export default new GitService()
