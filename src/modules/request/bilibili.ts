import { createRequestHandler } from './shared'

export default createRequestHandler({
  hosts: ['*://api.bilibili.com/**'],
  actions: [],
})
