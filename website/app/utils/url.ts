import { kebabCase } from 'es-toolkit'
import { assertIsString } from '../utils/typescript'
import type {
  ImagePreviewHorizontalDimensions,
  ImagePreviewVerticalDimensions
} from './meta-thumbnail'

export const assertUrlOrigin = <FallbackConst extends string>(
  runtimeConfig: unknown,
  errorKey: string,
  fallback: FallbackConst
): FallbackConst => {
  assertIsString(runtimeConfig)
  const expectedOrigin = new URL(runtimeConfig).origin
  if (expectedOrigin !== runtimeConfig) {
    throw Error(
      `Nuxt runtime config ${JSON.stringify(errorKey)} isn't a URL origin pattern as expected. Was: ${JSON.stringify(runtimeConfig)} but expected ${JSON.stringify(expectedOrigin)}`
    )
  }
  return (runtimeConfig ?? fallback) as FallbackConst // for TS purposes we'll type the response as the fallback
}

export const usePublicSiteUrlOrigin = () => {
  const runtimeConfig = useRuntimeConfig()
  return assertUrlOrigin(runtimeConfig.public.siteBase, 'siteBase', 'https://queue.rfc-editor.org')
}

export const useRedSiteUrlOrigin = () => {
  const runtimeConfig = useRuntimeConfig()
  return assertUrlOrigin(runtimeConfig.public.redBase, 'redBase', 'https://www.rfc-editor.org')
}

export const useDatatrackerSiteUrlOrigin = () => {
  const runtimeConfig = useRuntimeConfig()
  return assertUrlOrigin(
    runtimeConfig.public.datatrackerBase,
    'datatrackerBase',
    'https://datatracker.ietf.org'
  )
}

export const IETF_URL_ORIGIN = 'https://www.ietf.org'

export const FINAL_REVIEW_PATH = '/final-review/'
export const CLUSTERS_PATH = '/clusters/'
export const HOME_PATH = '/'

export const API_QUEUE_INDEX_PATH = '/api/v1/queue/index.json'
export const API_FINAL_REVIEW_INDEX_PATH = '/api/v1/final-review/index.json'
export const API_CLUSTER_INDEX_PATH = '/api/v1/clusters/index.json'

export const clusterNumberPathBuilder = (clusterNumber: number) => {
  return `/clusters/${clusterNumber}/` as const
}

export const finalReviewPathBuilder = (draftName: string) => {
  return `/final-review/${draftName}/` as const
}

export const apiClusterNumberPathBuilder = (clusterNumber: number) => {
  return `/api/v1/clusters/${clusterNumber}.json` as const
}

export const datatrackerDraftPathBuilder = (draftName: string) => {
  return `/doc/${draftName}/` as const
}

export const linkPreviewImageUrlBuilder = (
  widthPx: ImagePreviewHorizontalDimensions,
  heightPx: ImagePreviewVerticalDimensions
) => {
  return `/api/v1/thumbnail/rfc-editor-logo-${widthPx}x${heightPx}.png` as const
}

export const faviconPathBuilder = (widthPx: number, heightPx: number) =>
  `/api/v1/favicon/${widthPx}x${heightPx}.png`

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
