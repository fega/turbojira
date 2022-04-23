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
  profile: '',
}

const getProfileConfig = (): typeof defaults => {
  const config = rc('turbojira', defaults)
  const {PROFILE} = process.env
  const profileKey = PROFILE || 'default'

  if (!config[profileKey] && profileKey !== 'default') throw new Error(`PROFILE not found: "${PROFILE}"`)

  const repoConfig: typeof defaults = get(config, `${profileKey}.${gitService.getRepoName()}`, {})
  const repoProfileConfig = repoConfig.profile ? config[repoConfig.profile] : {}

  const finalConfig = {...config[profileKey], ...repoProfileConfig, ...repoConfig}
  return finalConfig
}

export default getProfileConfig()
