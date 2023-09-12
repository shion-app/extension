import { minimatch } from 'minimatch'

interface Tab {
  pattern: string[]
  name: string
}

type Website = 'bilibili' | 'zhihu' | 'juejin' | 'google' | 'baidu' | 'youtube' | 'twitter' | 'github'

export const tabList: Record<Website, Tab> = {
  bilibili: {
    pattern: ['*://*.bilibili.com{,/**}'],
    name: 'bilibili',
  },
  zhihu: {
    pattern: ['*://*.zhihu.com{,/**}'],
    name: '知乎',
  },
  juejin: {
    pattern: ['*://juejin.cn{,/**}'],
    name: '掘金',
  },
  google: {
    pattern: ['*://*.google.*{,/**}'],
    name: 'google',
  },
  baidu: {
    pattern: ['*://*.baidu.com{,/**}'],
    name: '百度',
  },
  youtube: {
    pattern: ['*://*.youtube.com{,/**}'],
    name: 'youtube',
  },
  twitter: {
    pattern: ['*://twitter.com{,/**}'],
    name: 'twitter',
  },
  github: {
    pattern: ['*://github.com{,/**}'],
    name: 'github',
  },
}

const patternList = Object.values(tabList).flatMap(tab => tab.pattern)

export function getWebsiteName(url: string) {
  const exist = patternList.some(host => minimatch(url, host))
  if (!exist)
    return 'unknown'

  for (const { pattern, name } of Object.values(tabList)) {
    if (pattern.some(host => minimatch(url, host)))
      return name
  }
}

const filter = ['{http,https}://**', 'file:///**']

export function isSuitableUrl(url: string) {
  return filter.some(pattern => minimatch(url, pattern))
}
