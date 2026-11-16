import { Configuration, PurpleApi, ResponseError, type ApiPubqQueueListRequest, type Cluster, type PublicQueueItem } from '../../generated/purple_client/index.ts'
import { getCacheKey } from './cache.ts'

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

/**
 * Read a fetch `Response.body` stream into a string.
 * The stream can only be consumed once, so call this at most once per response.
 */
const readResponseBodyText = async (body: ReadableStream<Uint8Array<ArrayBuffer>> | null): Promise<string> => {
  if (!body) {
    return ''
  }
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let text = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
  } finally {
    reader.releaseLock()
  }
  return text
}

export const getApiClient = (mode?: ApiMode) => {
  const PURPLE_PUBQ_API_BASE = process.env.PURPLE_PUBQ_API_BASE
  const basePath =
    mode === 'dev'
      ? (PURPLE_PUBQ_API_BASE ?? 'http://localhost:8088')
      : (PURPLE_PUBQ_API_BASE ?? undefined)

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

const apiPubqClustersRetrieveCache: Record<string, Cluster> = {}

type ApiPubqClustersRetrieveCachedProps = {
  api: PurpleApi
  clusterNumber: number
}

export const apiPubqClustersRetrieveCached = async ({ api, clusterNumber }: ApiPubqClustersRetrieveCachedProps): Promise<Cluster> => {
  const cacheKey = getCacheKey(clusterNumber)
  if (!apiPubqClustersRetrieveCache[cacheKey]) {
    // console.info('[apiPubqClustersRetrieveCached] cache miss', `cluster ${clusterNumber}`, { cacheKey })
    try {
      apiPubqClustersRetrieveCache[cacheKey] = await api.apiPubqClustersRetrieve({ number: clusterNumber })
    } catch (e) {
      if (e instanceof ResponseError) {
        const body = await readResponseBodyText(e.response.body)
        console.error('API response error from', e.response.url, `HTTP ${e.response.status} (${e.response.statusText})`, body, e.cause, e.message, e.name)
      }
      throw e
    }
  } else {
    // console.info('[apiPubqClustersRetrieveCached] cache hit', `cluster ${clusterNumber}`, { cacheKey })
  }
  return apiPubqClustersRetrieveCache[cacheKey]
}

const ApiPubqQueueListCache: Record<string, PublicQueueItem[]> = {}

type ApiPubqQueueListCachedProps = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

export const apiPubqQueueListCached = async ({ api, params }: ApiPubqQueueListCachedProps): Promise<PublicQueueItem[]> => {
  const cacheKey = getCacheKey(params)
  if (!ApiPubqQueueListCache[cacheKey]) {
    try {
      // console.info('[apiPubqQueueListCached] cache miss', JSON.stringify(params))
      ApiPubqQueueListCache[cacheKey] = await api.apiPubqQueueList(params)
    } catch (e) {
      if (e instanceof ResponseError) {
        const body = await readResponseBodyText(e.response.body)
        console.error('API response error from', e.response.url, `HTTP ${e.response.status} (${e.response.statusText})`, body, e.cause, e.message, e.name)
      }
      throw e
    }
  } else {
    // console.info('[apiPubqQueueListCached] cache hit', JSON.stringify(params))
  }
  return ApiPubqQueueListCache[cacheKey]
}
