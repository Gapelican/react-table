
const BASE_URL = 'https://jsonplaceholder.typicode.com/';


export function api(path: string, init?: RequestInit) {
  const BaseUrl = BASE_URL
  const url = new URL(path, BaseUrl)

  return fetch(url, init)
}