import type { WebRequest } from 'webextension-polyfill'
import { minimatch } from 'minimatch'
import { post } from '../fetch'

export interface Config {
  hosts: string[]
  actions: Action[]
}

interface RequestInfo {
  requestBody?: unknown
}

export interface Action {
  name: string
  url: string
  handle(data: RequestInfo): Awaited<unknown>
}

export function createRequestHandler(config: Config) {
  return new Handler(config)
}

export class Handler {
  constructor(private config: Config) {}

  private match(url: string) {
    return this.config.hosts.some(host => minimatch(url, host))
  }

  async run(details: WebRequest.OnBeforeRequestDetailsType) {
    if (!this.match(details.url))
      return

    for (const action of this.config.actions) {
      if (details.url !== action.url)
        return

      const result = await action.handle({
        requestBody: details.requestBody?.formData,
      })

      post('/browser-action', result as object)
    }
  }
}
