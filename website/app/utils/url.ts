import { kebabCase } from 'lodash-es'

export const IETF_URL_ORIGIN = 'https://www.ietf.org'
export const RFC_EDITOR_SITE_URL_ORIGIN = 'https://www.rfc-editor.org'
export const QUEUE_RFC_EDITOR_SITE_URL_ORIGIN = 'https://queue.rfc-editor.org'
export const DATATRACKER_URL_ORIGIN = 'https://datatracker.ietf.org'

const httpRegex = /^https?:\/\//
export const isExternalLink = (href?: string): boolean => {
  if (
    href === undefined
    // although this scenario isn't an external link we shouldn't treat it as a Vue Router link so we'll consider it external
  ) {
    return true
  }
  return httpRegex.test(href ?? '')
}

export const isInternalLink = (href?: string): boolean => !isExternalLink(href)

export const isHashLink = (href?: string): boolean => !!href?.startsWith('#')

const mailtoRegex = /^mailto:/
export const isMailToLink = (href?: string): boolean => {
  return mailtoRegex.test(href ?? '')
}

/**
 * Converts arbitrary text into a custom id that is DOMId compliant (ie no whitespace)
 *
 * WARNING: this does not ensure unique DOM ids. It's not a uuid/useId hook. It just derives
 * an id from the input string.
 */
export const textToAnchorId = (text: string): string | undefined => {
  const normalized = text
    .trim()
    .toLowerCase() // lowercase before kebabCase() because otherwise kebabCase() will split 'RFCs' into 'rf-cs'
    .replace(/\./g, '-') // replace periods because otherwise "section 2.2" becomes "section22" rather than "section2-2" which is more readable in the url
    .replace(/[^0-9\-a-zA-Z\s]/g, '') // removes non-alphanumeric eg question marks
  if (
    // if it's an empty string then getVNodeText() probably returned an empty string, so just return `undefined`
    !normalized
  ) {
    return
  }

  return kebabCase(normalized)
}