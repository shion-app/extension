import { createRequestHandler } from './shared'

interface Like {
  aid: string[]
  // 1 true
  // 2 false
  like: ['1', '2']
}

export default createRequestHandler({
  hosts: ['*://api.bilibili.com/**'],
  actions: [{
    url: 'https://api.bilibili.com/x/web-interface/archive/like',
    name: 'like',
    handle({ requestBody }) {
      const { aid, like } = requestBody as Like
      return {
        aid: aid[0],
        like: like[0] === '1',
      }
    },
  }],
})
