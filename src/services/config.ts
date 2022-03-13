import rc = require('rc')

const defaults = {
  jiraUser: '',
  jiraPass: '',
  jiraBaseUrl: '',
  baseBranch: '',
  baseProject: '',
}

const getProfileConfig = (): typeof defaults => {
  const config = rc('turbojira', defaults)
  const {PROFILE} = process.env
  if (PROFILE === 'default' || !PROFILE) {
    return config
  }

  if (!config[PROFILE]) throw new Error(`PROFILE not found: "${PROFILE}"`)
  return config[PROFILE]
}

export default getProfileConfig()
