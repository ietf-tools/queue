export async function blobs(request: Request, env: Env) {
  const url = new URL(request.url)
  const normalizedPath = decodeURIComponent(url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname)

  /**
   * Queue bucket usage (note env.QUEUE_BUCKET)
   */
  const API_V1_PREFIX = '/api/v1/'
  if (normalizedPath.startsWith(API_V1_PREFIX)) {
    const objectPath = normalizedPath.substring(API_V1_PREFIX.length)

    // -> Fetch R2 object
    if (objectPath.endsWith('.json')) {
      const object = await env.QUEUE_BUCKET.get(objectPath)
      if (object) {
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cf-R2-Served', '1')
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Content-Encoding', 'gzip')
        headers.set('Content-Type', 'application/json;charset=utf-8')

        return new Response(object.body, {
          headers
        })
      }
    }

    const FAVICON_PREFIX = 'favicon/'
    if (objectPath.startsWith(FAVICON_PREFIX) && objectPath.endsWith('.png')) {
      const faviconObjectPath = `other/favicon-${objectPath.substring(FAVICON_PREFIX.length)}`

      const object = await env.QUEUE_BUCKET.get(faviconObjectPath)
      if (object) {
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cf-R2-Served', '1')
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Content-Encoding', 'gzip')
        headers.set('Content-Type', 'image/png')

        return new Response(object.body, {
          headers
        })
      }
    }
  }

  const SITEMAP_PREFIX = '/sitemap'
  if (normalizedPath.startsWith(SITEMAP_PREFIX)) {
    const objectPath = `sitemap/sitemap${normalizedPath.substring(SITEMAP_PREFIX.length)}`

    // -> Fetch R2 object
    if (objectPath.endsWith('.xml')) {
      const object = await env.QUEUE_BUCKET.get(objectPath)
      if (object) {
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cf-R2-Served', '1')
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Content-Encoding', 'gzip')
        headers.set('Content-Type', 'application/xml;charset=utf-8')

        return new Response(object.body, {
          headers
        })
      }
    }
  }

  const mappings = [
    {
      from: '/favicon.ico',
      to: 'other/favicon-32x32.png'
    },
    {
      from: '/api/v1/queue.xml',
      to: 'queue/index.xml'
    },
    {
      from: '/api/v1/queue.xsd',
      to: 'queue/queue.xsd'
    },
    {
      from: '/robots.txt',
      to: 'other/robots.txt'
    }
  ]

  const mapping = mappings.find(mapping => mapping.from === normalizedPath)
  if (mapping) {
    const objectPath = mapping.to
    // -> Fetch R2 object
    const object = await env.QUEUE_BUCKET.get(objectPath)
    if (object) {
      const headers = new Headers()
      object.writeHttpMetadata(headers)
      headers.set('etag', object.httpEtag)
      headers.set('Cf-R2-Served', '1')
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Content-Encoding', 'gzip')
      if (mapping.to.includes('.')) {
        const extension = mapping.to.substring(mapping.to.lastIndexOf('.'))
        switch (extension) {
          case '.json':
            headers.set('Content-Type', 'application/json;charset=utf-8')
            break
          case '.ico':
            headers.set('Content-Type', 'image/png')
            break;
          case '.txt':
            headers.set('Content-Type', 'text/plain;charset=utf-8')
            break;
          case '.xml':
            if (mapping.from.endsWith('rfcatom.xml')) {
              // Atom has a specific mime type
              headers.set('Content-Type', 'application/atom+xml;charset=utf-8')
            } else {
              // Note that RSS doesn't have a mime type from IANA (but Atom does!)
              // see https://www.iana.org/assignments/media-types/media-types.xhtml
              //
              // per RFC 7303 don't use `text/xml` and instead use `application/xml`.
              headers.set('Content-Type', 'application/xml;charset=utf-8')
            }
            break;
        }
      }

      return new Response(object.body, {
        headers
      })
    }
  }

  return new Response('404 - Not found', { status: 404, headers: { 'Content-Type': 'text/plain;charset=utf-8' } })
}
