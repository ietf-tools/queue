import path from 'node:path'
import fsPromises from 'node:fs/promises'
import { WriteStream } from 'node:fs'
import { PassThrough, Readable } from 'node:stream'
import { type SitemapItemLoose, EnumChangefreq, SitemapAndIndexStream, SitemapStream, streamToPromise } from 'sitemap'
import { type ClusterIndexCommon, type QueueCommon } from '../../../website/app/utils/validators.ts'
import { clusterPathBuilder, finalReviewClusterPathBuilder, finalReviewDraftPathBuilder } from '../utils/url.ts'
import { S3UploadTask, siteMapXmlFilenameBuilder, siteMapXmlPathPrefixBuilder } from '../utils/s3.ts'

const precomputerRoot = path.resolve(import.meta.dirname, '..', '..')
export const markdownPathsJsonPath = path.join(precomputerRoot, 'src', 'assets', 'markdown-paths.json')
export const markdownPathsJsonPromise = fsPromises.readFile(markdownPathsJsonPath, 'utf-8')

type Props = {
  websiteOrigin: string
  clusterIndex: ClusterIndexCommon
  finalReviewIndex: QueueCommon
}

export const getSiteMapXmls = async ({ websiteOrigin, clusterIndex, finalReviewIndex }: Props): Promise<S3UploadTask[]> => {
  const markdownPathsJson = await markdownPathsJsonPromise;
  const markdownPaths = JSON.parse(markdownPathsJson);
  if (!Array.isArray(markdownPaths) || !markdownPaths.every(markdownPath => typeof markdownPath === 'string')) {
    throw Error(`Expected ${markdownPathsJsonPath} to be array of strings`);
  }

  const rfcSitemapItems: SitemapItemLoose[] = [
    {
      url: `${websiteOrigin}/`,
      changefreq: EnumChangefreq.DAILY,
      priority: 0.3
    },
    {
      url: `${websiteOrigin}/clusters/`,
      changefreq: EnumChangefreq.DAILY,
      priority: 0.3
    },
    ...markdownPaths.map((markdownPath): SitemapItemLoose => {
      return {
        url: `${websiteOrigin}${markdownPath}`,
        changefreq: EnumChangefreq.WEEKLY,
        priority: 0.4
      };
    }),
    ...clusterIndex.list.flatMap((clusterItem): SitemapItemLoose[] => {
      return [
        {
          url: `${websiteOrigin}${clusterPathBuilder(clusterItem.number)}`,
          changefreq: EnumChangefreq.WEEKLY,
          priority: 0.3
        }
      ]
    }),
    ...finalReviewIndex.items.flatMap((queueItem): SitemapItemLoose[] => {
      return [
        ...(queueItem.clusters ?? []).map(cluster => {
          return {
            url: `${websiteOrigin}${finalReviewClusterPathBuilder(cluster)}`,
            changefreq: EnumChangefreq.WEEKLY,
            priority: 0.3
          }
        }),
        {
          url: `${websiteOrigin}${finalReviewDraftPathBuilder(queueItem.name)}`,
          changefreq: EnumChangefreq.WEEKLY,
          priority: 0.3
        }
      ]
    })
  ];

  const sitemapFiles: S3UploadTask[] = [];
  const pendingPromises: Promise<void>[] = [];

  const siteMapStream = new SitemapAndIndexStream({
    /**
     * Googlebot imposes a limit:
     * 
     * "Any Sitemap file is limited to 50MB (uncompressed) with a maximum of 50,000 URLs."
     * 
     * so we'll just split our index over several files.
     * 
     * This also helps test sitemap-*.xml worker routes which otherwise might break and not
     * be used
     *  */
    limit: 6000,
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({ hostname: websiteOrigin })
      const destination = new PassThrough()
      const filename = siteMapXmlFilenameBuilder(i + 1)
      sitemapStream.pipe(destination);
      const capturePromise = streamToPromise(destination).then(data => {
        sitemapFiles.push({
          key: siteMapXmlPathPrefixBuilder(filename),
          contents: data.toString()
        });
      });
      pendingPromises.push(capturePromise)

      return [`${websiteOrigin}${filename}`, sitemapStream, destination as unknown as WriteStream];
    }
  });

  const indexPromise = streamToPromise(siteMapStream).then(data => {
    sitemapFiles.push({
      key: siteMapXmlPathPrefixBuilder(siteMapXmlFilenameBuilder(0)),
      contents: data.toString()
    })
  });

  Readable.from(rfcSitemapItems).pipe(siteMapStream);

  await Promise.all([indexPromise, ...pendingPromises]);

  return sitemapFiles;
};
