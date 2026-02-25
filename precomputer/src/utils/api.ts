import { Configuration, PurpleApi } from '../../generated/purple_client/index.ts'

type ApiMode = 'prod' | 'dev'

const localDevToken = 'pubq-token' // FIXME: hardcoded extremely secure token

export const getApiClient = (mode?: ApiMode) => {
  const PURPLE_PUBQ_API_BASE = process.env.PURPLE_PUBQ_API_BASE
  const PURPLE_PUBQ_API_TOKEN = process.env.PURPLE_PUBQ_API_TOKEN
  
  const configuration = new Configuration({
    basePath: mode === 'dev' ? 'http://localhost:8088' : PURPLE_PUBQ_API_BASE ?? undefined,
    fetchApi: (input: RequestInfo | URL, init?: RequestInit) => {
      console.log("fetchApi debug", { input, init })
      return fetch(input, init).then(resp => {
        console.log("fetch response:", resp.ok, resp.status)
        return resp
      }).catch(error => {
        if (
          error instanceof TypeError &&
          error.cause instanceof AggregateError
        ) {
          console.log('fetch error aggregate error',
            error.cause.errors.map(
              (subError) => `${subError.code} ${subError}`
            ))
        } else {
          console.log('fetch error', error)
        }
        return error
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
        headers['X-Api-Key'] = PURPLE_PUBQ_API_TOKEN ?? localDevToken
      }
    }]
  })
  return new PurpleApi(configuration)
}