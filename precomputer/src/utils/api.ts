import { Configuration, PurpleApi } from '../../generated/purple_client/index.ts'

type ApiMode = 'prod' | 'dev'

const localDevToken = 'pubq-token' // FIXME: hardcoded extremely secure token
const XApiKeyPropName = 'X-Api-Key'
const REDACTED_SYMBOL = '░░░░░░░░░░░░░░░░░░░░'

/**
 * Redact passwords in specific headers.
 * Useful to print debug without revealing secrets.
 */
const _redactRequestInit = (init: RequestInit | undefined): RequestInit | undefined => {
  if (!init) {
    return init
  }
  const newRequestInit = structuredClone(init)
  // @ts-ignore
  newRequestInit.headers[XApiKeyPropName] = REDACTED_SYMBOL
  return newRequestInit
}

export const getApiClient = (mode?: ApiMode) => {
  const PURPLE_PUBQ_API_BASE = process.env.PURPLE_PUBQ_API_BASE
  const basePath = mode === 'dev' ? 'http://localhost:8088' : (PURPLE_PUBQ_API_BASE ?? undefined)

  if (basePath) {
    console.log('[api client] custom base env', basePath)
  }

  const PURPLE_PUBQ_API_TOKEN = process.env.PURPLE_PUBQ_API_TOKEN
  const XApiKey = PURPLE_PUBQ_API_TOKEN ?? localDevToken
  if (PURPLE_PUBQ_API_TOKEN) {
    console.log(`[api client] custom ${XApiKeyPropName} value`)
  }

  const configuration = new Configuration({
    basePath,
    fetchApi: (input: RequestInfo | URL, init?: RequestInit) => {
      // console.log("fetchApi debug", { input, init: redactRequestInit(init) })
      return fetch(input, init)
        .then((resp) => {
          // console.log("fetch response:", resp.ok, resp.status)
          return resp
        })
        .catch((error) => {
          if (error instanceof TypeError && error.cause instanceof AggregateError) {
            console.log(
              'fetch error aggregate error',
              error.cause.errors.map((subError) => `${subError.code} ${subError}`)
            )
          } else {
            console.log('fetch error', error)
          }
          return error
        })
    },
    middleware: [
      {
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
          headers[XApiKeyPropName] = XApiKey
        }
      }
    ]
  })

  return new PurpleApi(configuration)
}
