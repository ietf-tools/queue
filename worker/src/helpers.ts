/**
 * Create blob object response
 *
 * @param {*} object Blob Object
 * @param {string} [contentType] Content-Type
 * @returns {Response} Blob Response
 */
export function createBlobResponse(object, contentType, canonicalUrl) {
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
