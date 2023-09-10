import { minimatch } from 'minimatch'
import { describe, expect, it } from 'vitest'
import { getWebsiteName, tabList } from '~/modules/tab'

function testPattern(test: string[], pattern: string[]) {
  expect(test.every(url => pattern.some(host => minimatch(url, host)))).toBe(true)
}

function testName(test: string[], name: string) {
  expect([...new Set(test.map(url => getWebsiteName(url)))].pop()).toBe(name)
}

describe('tab', () => {
  it('bilibili', () => {
    const { pattern } = tabList.bilibili
    const test = [
      'https://live.bilibili.com/p/eden/area-tags?parentAreaId=9&areaId=0',
      'https://www.bilibili.com/video/BV1mm4y1T7XR/?spm_id_from=333.999.0.0&vd_source=1cd42b0f9b2e7d48f3c4d471f842db25',
    ]

    testPattern(test, pattern)
    testName(test, 'bilibili')
  })

  it('zhihu', () => {
    const { pattern } = tabList.zhihu
    const test = [
      'https://www.zhihu.com/question/610436469/answer/3113816700',
    ]

    testPattern(test, pattern)
    testName(test, '知乎')
  })

  it('juejin', () => {
    const { pattern } = tabList.juejin
    const test = [
      'https://juejin.cn/post/7256879435340890172',
    ]

    testPattern(test, pattern)
    testName(test, '掘金')
  })

  it('google', () => {
    const { pattern } = tabList.google
    const test = [
      'https://www.google.com.hk/',
      'https://www.google.com',
    ]

    testPattern(test, pattern)
    testName(test, 'google')
  })

  it('baidu', () => {
    const { pattern } = tabList.baidu
    const test = [
      'https://tieba.baidu.com/index.html',
    ]

    testPattern(test, pattern)
    testName(test, '百度')
  })

  it('youtube', () => {
    const { pattern } = tabList.youtube
    const test = [
      'https://www.youtube.com/watch?v=W8DCWI_Gc9c',
    ]

    testPattern(test, pattern)
    testName(test, 'youtube')
  })

  it('twitter', () => {
    const { pattern } = tabList.twitter
    const test = [
      'https://twitter.com/home',
    ]

    testPattern(test, pattern)
    testName(test, 'twitter')
  })

  it('github', () => {
    const { pattern } = tabList.github
    const test = [
      'https://github.com/hanaTsuk1',
    ]

    testPattern(test, pattern)
    testName(test, 'github')
  })
})
