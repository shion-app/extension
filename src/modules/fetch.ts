import { onMessage } from 'webext-bridge/background'

let port = 4040

onMessage('change-port', (v) => {
  port = v.data.port
})

export function get(url: string) {
  return fetch(`http://localhost:${port}${url}`).then(i => i.json())
}

export function post(url: string, data: object) {
  return fetch(`http://localhost:${port}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
