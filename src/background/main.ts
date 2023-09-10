// only on dev mode
import { onMessage } from 'webext-bridge/background'

if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

let port = 4040

const host = `http://localhost:${port}`

onMessage('change-port', (v) => {
  port = v.data.port
})

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const { url, title } = await browser.tabs.get(tabId)
  fetch(`${host}/browser-tab`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      title,
    }),
  })
})

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    // console.log(details)
    // console.log(details.requestBody)
  },
  { urls: ['<all_urls>'] },
  ['requestBody'],
)
