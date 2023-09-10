import type { WebRequest } from 'webextension-polyfill'
import type { Handler } from './shared'

import bilibili from './bilibili'

class Request {
  constructor(private handlerList: Handler[]) {}

  handle(details: WebRequest.OnBeforeRequestDetailsType) {
    for (const handler of this.handlerList)
      handler.run(details)
  }
}

export const request = new Request([
  bilibili,
])
