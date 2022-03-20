import * as shell from 'shelljs'
import {JiraIssue} from './jira-view'
import {kebabCase} from 'lodash'
import {error, log} from './logger'

export type GitStarTaskOptions ={
  baseBranch?: string
}
class GitService {
  startTask(issue:JiraIssue, {baseBranch = 'develop'}: GitStarTaskOptions = {}) {
    const type = kebabCase(issue.fields.issuetype.name)
    const description = kebabCase(issue.fields.summary)
    const branchName = `${type}/${issue.key}/${description}`
    log(`checkout to "${baseBranch}"`)
    const developResult = shell.exec(`git checkout ${baseBranch}`)

    if (developResult.code !== 0) {
      error(`Something failed trying to checkout to ${baseBranch} branch`)
      throw new Error(`Git checkout ${baseBranch} failed`)
    }

    log(`pulling "${baseBranch}"`)
    shell.exec('git pull')
    if (shell.exec(`git checkout -b ${branchName}`).code === 0) {
      log(`New branch ${baseBranch} created`)
    } else {
      log(`Switching to "${branchName}"`)
      shell.exec(`git checkout ${branchName}`)
    }
  }
}

export default new GitService()
