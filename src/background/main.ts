// only on dev mode
import { onMessage } from 'webext-bridge/background'
import { post } from '~/modules/fetch'
import { request } from '~/modules/request'
import { getWebsiteName, isSuitableUrl } from '~/modules/tab'

if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

interface Tab {
  url?: string
  title?: string
  time?: number
}

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
function sendTabEvent(tab: Tab) {
  const { url, title, time } = tab
  if (!url)
    return

  if (!isSuitableUrl(url))
    return

  const name = getWebsiteName(url)
  post('/browser-tab', {
    url,
    title,
    name,
    time,
  })
}

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const { url, title } = await browser.tabs.get(tabId)
  sendTabEvent({
    url,
    title,
    time: Date.now(),
  })
})

let blurred = false

onMessage('focus', async () => {
  if (!blurred)
    return

  blurred = false

  const [tab] = await browser.tabs.query({
    active: true,
  })
  sendTabEvent({
    url: tab.url,
    title: tab.title,
    time: Date.now(),
  })
})

let previousTab = {} as Tab

onMessage('blur', () => {
  blurred = true
  sendTabEvent(previousTab)
  previousTab = {}
})

browser.tabs.onUpdated.addListener(async (_, info, tab) => {
  if (!tab.active)
    return

  if (info.url)
    sendTabEvent(previousTab)

  const { url, title } = tab

  if (previousTab.time)
    Object.assign(previousTab, { url, title })

  else
    previousTab = { url, title, time: Date.now() }
})

browser.webRequest.onBeforeRequest.addListener(
  details => request.handle(details),
  { urls: ['<all_urls>'] },
  ['requestBody'],
)
