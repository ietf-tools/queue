export const clusterPathBuilder = (cluster: number) => `/clusters/${cluster}/` as const

export const finalReviewClusterPathBuilder = (cluster: number) => `/final-review/C${cluster}/` as const

export const finalReviewDraftPathBuilder = (draft: string) => `/final-review/${draft}/` as const

// There can be multiple sitemap files but this is the entry point hence '_0' suffix.
export const SITEMAP_XML_0 = '/sitemap.xml' as const