import { IttyRouter } from 'itty-router'
import { blobs } from './blobs'

const router = IttyRouter()

router
  .get('/robots.txt', blobs)
  .get('/sitemap*', blobs)
  .get('/favicon*', blobs)
  .get('/api/v1/queue*', blobs)
  .get('/api/v1/thumbnail*', blobs)
  .get('/api/v1/clusters*', blobs)
  .get('/api/v1/final-review*', blobs)
  // Fallback to origin
  .all('*', async (req) => {
    let resp = await fetch(req, {
      cf: {
        cacheTtl: 300,
        cacheEverything: true
      }
    })
    resp = new Response(resp.body, resp)
    resp.headers.set('Cache-Control', 'max-age=600')
    return resp
  })

export default {
  ...router
}
