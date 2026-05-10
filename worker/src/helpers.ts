/**
 * Create blob object response
 */
export function createBlobResponse(object: R2ObjectBody, contentType: string, canonicalUrl?: string) {
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('Cf-R2-Served', '1')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Content-Encoding', 'gzip')
  if (contentType) {
    headers.set('Content-Type', contentType)
  }
  if (canonicalUrl) {
    const formattedCanonicalUrl = formatCanonicalHeader(canonicalUrl)
    if (formattedCanonicalUrl) {
      headers.set('Link', formattedCanonicalUrl)
    }
  }

  return new Response(object.body, {
    headers
  })
}

function formatCanonicalHeader(url: string) {
  try {
    const validatedUrl = new URL(url).toString() // can throw on invalid urls, which is preferable over adding an http header that might exploit some syntax quirk
    // canonical header is surrounded by '<' and '>' chars, so characters must be escaped.
    // encodeURI handles spaces, special characters, but not / : ? = &, so protocol prefix is left
    // untouched
    const encodedUrl = encodeURI(validatedUrl)
      .replace(/</g, '%3C') // manually replace < and > just in case they are in the URL string
      .replace(/>/g, '%3E')

    return `<${encodedUrl}>; rel="canonical"`;
  } catch (e) {
    return undefined
  }
}