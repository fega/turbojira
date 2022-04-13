import {get} from 'lodash'
import rc = require('rc')
import gitService from './git'

const defaults = {
  jiraUser: '',
  jiraPass: '',
  jiraBaseUrl: '',
  baseBranch: '',
  baseProject: '',
  jiraUserId: '',
}

const getProfileConfig = (): typeof defaults => {
  const config = rc('turbojira', defaults)
  const {PROFILE} = process.env
  const profileKey = PROFILE || 'default'
  if (PROFILE === 'default' || !PROFILE) {
    return config
  }

  if (!config[profileKey]) throw new Error(`PROFILE not found: "${PROFILE}"`)

  const repoConfig = get(config, `${profileKey}.${gitService.getRepoName()}`)
  return {...config[PROFILE], ...repoConfig}
}

export default getProfileConfig()
