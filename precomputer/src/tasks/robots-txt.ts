import { SITEMAP_XML_0 } from "../utils/url.ts"

// placeholder string that shouldn't collide with actual data
const ORIGIN_PLACEHOLDER = '__ORIGIN__'

const ROBOTS_TXT_TEMPLATE = [
  'User-agent: *',
  `Sitemap: ${ORIGIN_PLACEHOLDER}${SITEMAP_XML_0}`]
  .join('\n')

const originPlaceholderRegex = new RegExp(ORIGIN_PLACEHOLDER, 'g')

export const getRobotsTxt = (websiteOrigin: string) => {
  return ROBOTS_TXT_TEMPLATE.replace(originPlaceholderRegex, websiteOrigin)
}