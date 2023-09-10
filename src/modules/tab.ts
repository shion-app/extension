import { minimatch } from 'minimatch'

interface Tab {
  pattern: string[]
  name: string
}

type Website = 'bilibili'

export const tabList: Record<Website, Tab> = {
  bilibili: {
    pattern: ['*://*.bilibili.com/**'],
    name: 'bilibili',
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
