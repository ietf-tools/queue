export async function blobs(request: Request, env: Env) {
	const url = new URL(request.url)
  const normalizedPath = decodeURIComponent(url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname)

	/**
   * RFC bucket usage (note env.RFC_BUCKET)
   */
  const RFC_PREFIX = '/rfc/'
  if (normalizedPath.startsWith(RFC_PREFIX)) {
    const objectPath = normalizedPath.substring(RFC_PREFIX.length)

    // -> Fetch R2 object
    if (objectPath.endsWith('.html') || objectPath.endsWith('.txt') || objectPath.endsWith('.pdf')) {
      const object = await env.RFC_BUCKET.get(objectPath)
      if (object) {
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cf-R2-Served', '1')
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Content-Encoding', 'gzip')

        return new Response(object.body, {
          headers
        })
      }
    }
  }

	/**
   * Fetch from origin as fallback
   */
  let response = await fetch(request, {
    cf: {
      cacheTtl: 300,
      cacheEverything: true
    }
  })
  response = new Response(response.body, response)
  response.headers.set('Cache-Control', 'max-age=600')
  return response
}
