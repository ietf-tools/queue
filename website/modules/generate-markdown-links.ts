/**
 * This file is responsible listing markdown files for precomputer
 */
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { globby } from 'globby'
import { defineNuxtModule, useLogger } from 'nuxt/kit'

const __dirname = import.meta.dirname
const websitePath = path.resolve(__dirname, '..')
const contentPath = path.resolve(websitePath, 'content')

const precomputerPath = path.resolve(websitePath, '..', 'precomputer')
const publicPathsForPrecomputer = path.join(precomputerPath, 'src', 'assets', 'markdown-paths.json')

type Logger = ReturnType<typeof useLogger>

const regenerateMarkdownList = async (logger?: Logger) => {
  const markdownPaths = await globby(['**/*.md'], {
    cwd: contentPath
  })
  const markdownPathToPublicPath = (markdownPath: string) => {
    return `/${markdownPath.replace(/\.md$/, '/').replace(/\/index\/$/, '/')}`
  }

  const markdownPublicPaths: string[] = markdownPaths.map(markdownPathToPublicPath)

  await fsPromises.writeFile(
    publicPathsForPrecomputer,
    JSON.stringify(markdownPublicPaths.sort(), null, 2)
  )

  const message = ` - regenerated ${path.basename(publicPathsForPrecomputer)}`

  if (logger) {
    logger.info(message)
  } else {
    console.info(message)
  }
}

export default defineNuxtModule({
  setup(options, nuxt) {
    const logger = useLogger('generate-markdown-links', {
      level: options.quiet ? 0 : 3
    })

    nuxt.hook('builder:watch', async (_event, watcherPath) => {
      logger.info(
        `Regenerating markdown list because "${watcherPath}" changed`
      )
      await regenerateMarkdownList(logger)
    })
  }
})

// Create the file(s) initially on Nuxt load so there aren't import errors on CI
await regenerateMarkdownList()
