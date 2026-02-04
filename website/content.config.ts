import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        showToc: z.union([z.boolean(), z.literal('auto')]),
        description: z.string()
      })
    })
  }
})