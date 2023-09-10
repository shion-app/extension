import { minimatch } from 'minimatch'
import { describe, expect, it } from 'vitest'
import { getWebsiteName, tabList } from '~/modules/tab'

describe('tab', () => {
  it('bilibili', () => {
    const { pattern } = tabList.bilibili
    const test = [
      'https://live.bilibili.com/p/eden/area-tags?parentAreaId=9&areaId=0',
      'https://www.bilibili.com/video/BV1mm4y1T7XR/?spm_id_from=333.999.0.0&vd_source=1cd42b0f9b2e7d48f3c4d471f842db25',
    ]

    expect(test.every(url => pattern.some(host => minimatch(url, host)))).toBe(true)

    expect([...new Set(test.map(url => getWebsiteName(url)))].pop()).toBe('bilibili')
  })
})
