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

  const checks = await Promise.all(pathsToCheck.map(pathToCheck => httpCheck(
    new URL(pathToCheck, publicSiteUrlOrigin).toString()
  )))

  const allOk = checks.every(check => check.ok)

  const failedPathsMessage = checks.map((check, index) => {
    if (!check.ok) {
      return `${pathsToCheck[index]} (HTTP ${check.statusCode})`
    }
    return undefined
  }).filter(Boolean).join(', ')

  setResponseStatus(event, allOk ? 200 : 500)

  return {
    ok: allOk,
    message: allOk ? undefined : `Health check failed on ${publicSiteUrlOrigin}: ${failedPathsMessage}`,
  }
})


const httpCheck = (url: string) => {
  return new Promise<{
    ok: boolean,
    statusCode: number
  }>((resolve, reject) => {
    https
      .request(url, { method: 'HEAD' }, (res) => {
        const { statusCode } = res
        if (statusCode === undefined) {
          reject()
          return
        }
        resolve({
          // using fetch response 'ok' definition of ok
          // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
          ok: statusCode >= 200 && statusCode <= 299,
          statusCode
        }
        )
      }).on('error', (_err) => reject())
      .end()
  })
}
