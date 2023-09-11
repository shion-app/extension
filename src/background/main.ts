// only on dev mode
import { post } from '~/modules/fetch'
import { request } from '~/modules/request'
import { getWebsiteName } from '~/modules/tab'

if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
async function sendTabEvent(tabId: number) {
  const { url, title } = await browser.tabs.get(tabId)
  if (!url)
    return

  const name = getWebsiteName(url)
  post('/browser-tab', {
    url,
    title,
    name,
    time: Date.now(),
  })
}

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  sendTabEvent(tabId)
})

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  if (details.frameId === 0) {
    const { url } = await browser.tabs.get(details.tabId)
    if (url === details.url)
      sendTabEvent(details.tabId)
  }
})

browser.webRequest.onBeforeRequest.addListener(
  details => request.handle(details),
  { urls: ['<all_urls>'] },
  ['requestBody'],
)
