import fetch, {Headers} from 'node-fetch'
import {JIRA_BASE_URL_REQUIRED_ERROR, JIRA_PASS_REQUIRED_ERROR, JIRA_USER_REQUIRED_ERROR} from '../constans'
import {JiraIssue} from './jira-view'

export class JiraService {
  pass: string
  user: string
  baseRestUrl: string
  baseUrl: string
  url: string
  constructor() {
    this.baseRestUrl = '/rest/api/3'
    this.baseUrl = process.env.JIRA_BASE_URL || ''
    this.user = process.env.JIRA_USER || ''
    this.pass = process.env.JIRA_PASS || ''
    if (!this.user) throw new Error(JIRA_USER_REQUIRED_ERROR)
    if (!this.pass) throw new Error(JIRA_PASS_REQUIRED_ERROR)
    if (!this.baseUrl) throw new Error(JIRA_BASE_URL_REQUIRED_ERROR)

    this.url = `${this.baseUrl.replace('https://', `https://${this.user}:${this.pass}@`)}${this.baseRestUrl}`
  }

  private getHeaders() {
    return new Headers({
      accept: 'application/json',
      'content-type': 'application/json',
    })
  }

  async getProjects():Promise<any[]> {
    const r = await fetch(this.url + '/project/search', {headers: this.getHeaders()})
    return (await r.json()) as unknown as any[]
  }

  async getDashboards():Promise<any[]> {
    const r = await fetch(this.url + '/dashboard', {headers: this.getHeaders()})
    return (await r.json()).dashboards as unknown as any[]
  }

  async getIssues(): Promise<JiraIssue[]> {
    const r = await fetch(this.url + '/search?jql=project%20%3D%20PROF', {headers: this.getHeaders()})
    return (await r.json()).issues as unknown as any[]
  }

  async updateIssue(key: string, update: any): Promise<void> {
    const r = await fetch(this.url + `/issue/${key}`, {
      headers: this.getHeaders(),
      method: 'PUT',
      body: JSON.stringify(update),
    })

    if (r.ok) return
    console.log(r)
    throw console.log(await r.text())
  }

  private async transitionIssueToInProgress(key: string): Promise<void> {
    const r = await fetch(this.url + `/issue/${key}/transitions`, {
      headers: this.getHeaders(),
      method: 'POST',
      body: JSON.stringify({transition: {
        id: '11',
        name: 'Start Work',
        hasScreen: false,
        isGlobal: false,
        isInitial: false,
        isConditional: false,
        isLooped: false,
        to: {
          id: '3',
          name: 'In Progress',
          statusCategory: {id: 4}}}}),
    })

    if (r.ok) return
    console.log(r)
    throw console.log(await r.text())
  }

  async updateIssueToInProgress(key: string, message: string): Promise<void> {
    await this.transitionIssueToInProgress(key)
    await this.updateIssue(key, {
      update: {
        comment: [
          {
            add: {
              body: {
                version: 1,
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: `[TurboJira]: ${message}`,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      fields: {
        assignee: {
          id: '61706b2f702bd0006a7040fd',
        },
      },

    })
  }
}
