
const BASE_URL = 'http://localhost:4000';


export function api(path: string, init?: RequestInit) {
  const BaseUrl = BASE_URL
  const url = new URL(path, BaseUrl)

  return fetch(url, init)
}