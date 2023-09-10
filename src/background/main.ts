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
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const { url, title } = await browser.tabs.get(tabId)
  const name = getWebsiteName(url || '')
  post('/browser-tab', {
    body: {
      url,
      title,
      name,
    },
  })
})

browser.webRequest.onBeforeRequest.addListener(
  details => request.handle(details),
  { urls: ['<all_urls>'] },
  ['requestBody'],
)
