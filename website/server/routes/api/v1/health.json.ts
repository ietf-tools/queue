import https from 'https'
import { usePublicSiteUrlOrigin } from '~/utils/url'

/**
 * Health check
 */
export default defineEventHandler(async (event) => {
  const publicSiteUrlOrigin = usePublicSiteUrlOrigin()

  const pathsToCheck = [
    '/',
    '/about/',
    '/robots.txt',
    '/sitemap.xml',
    '/api/v1/queue/index.json',
    '/api/v1/final-review/index.json'
  ]

  const oks = await Promise.all(pathsToCheck.map(pathToCheck => httpOk(
    new URL(pathToCheck, publicSiteUrlOrigin).toString()
  )))

  const allOk = oks.every(ok => ok)

  const failedPaths = oks.map((ok, index) => {
    if (!ok) {
      return pathsToCheck[index]
    }
    return undefined
  }).filter(Boolean).join(', ')

  setResponseStatus(event, allOk ? 200 : 500)

  return {
    ok: allOk,
    message: allOk ? undefined : `Health check failed on ${publicSiteUrlOrigin}: ${failedPaths}`,
  }
})

const httpOk = (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    https
      .request(url, { method: 'HEAD' }, (res) => {
        const { statusCode } = res
        if (statusCode === undefined) {
          reject()
          return
        }
        resolve(
          // using fetch response 'ok' definition of ok
          // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
          statusCode >= 200 && statusCode <= 299
        )
      }).on('error', (err) => reject(err))
      .end();
  })
}
