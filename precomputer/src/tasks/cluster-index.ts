
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterIndexCommon, type ClusterItemCommon, ClusterIndexCommonSchema } from '../../../website/app/utils/validators.ts'
import { clusterMemberToClusterDocumentCommon } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
}

export const getClusterIndex = async ({ api }: Props): Promise<ClusterIndexCommon> => {
  const clusterList = await api.apiPubqClustersList()

  const clusterIndexCommon: ClusterIndexCommon = {
    list: clusterList.filter(item => item.isActive).map((cluster): ClusterItemCommon => {
      const { number, documents } = cluster
      const clusterItems = documents?.map((clusterMember) => clusterMemberToClusterDocumentCommon(number, clusterMember)) ?? []
      return {
        number,
        allPublished: clusterItems.length > 0 ? clusterItems.every(
          document => document.disposition === 'published'
        ) : false,
        documents: clusterItems.filter(
          // don't show published documents
          document => document.disposition !== 'published'
        ) ?? []
      }
    })
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const verifiedClusterIndexCommon = ClusterIndexCommonSchema.parse(clusterIndexCommon)

  return verifiedClusterIndexCommon
}

