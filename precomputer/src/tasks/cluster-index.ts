
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterIndexCommon, ClusterIndexCommonSchema, ClusterItemCommon } from '../../../website/app/utils/validators.ts'
import { clusterMemberToClusterDocumentCommon } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
}

export const getClusterIndex = async ({ api }: Props): Promise<ClusterIndexCommon> => {
  const clusterList = await api.apiPubqClustersList()

  const clusterIndexCommon: ClusterIndexCommon = {
    list: clusterList.filter(item => item.isActive).map((cluster): ClusterItemCommon => {
      const { number, documents } = cluster
      return {
        number,
        documents: documents?.map(clusterMemberToClusterDocumentCommon) ?? []
      }
    })
  }

  // This will throw on invalid, and it will remove additional props
  const verifiedClusterIndexCommon = ClusterIndexCommonSchema.parse(clusterIndexCommon)

  return verifiedClusterIndexCommon
}

