import { Configuration, PurpleApi } from '../../generated/purple_client/index.ts'

export const getApiClient = () => {
  const configuration = new Configuration({
    basePath: 'http://localhost:8088',
    fetchApi: (input: RequestInfo | URL, init?: RequestInit) => {
      console.log("DEBUG", { input, init })
      return fetch(input, init).then(resp => {
        console.log(resp.ok, resp.status )
        return resp
      }).catch(e => {
        console.log('fetch error', e)
        return e
      })
    },
    middleware: [{
      pre: async ({ init: { method, headers } }) => {
        if (!method) {
          throw Error(`Required 'method' but was ${method}`)
        }
        if (!headers) {
          throw Error(`Required 'headers' but was ${headers}`)
        }
        // @ts-ignore
        headers['Accept'] = 'application/json, text/plain, */*'
        // @ts-ignore
        headers['X-Api-Key'] = 'pubq-token' // FIXME: hardcoded extremely secure token
      }
    }]
  })
  return new PurpleApi(configuration)
}