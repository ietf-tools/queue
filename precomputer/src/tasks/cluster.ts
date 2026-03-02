
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterPackageCommon, ClusterPackageCommonSchema } from '../../../website/app/utils/validators.ts'
import { clusterMemberToClusterDocumentCommon } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
  clusterNumber: number
}

export const getClusterPackage = async ({ api, clusterNumber }: Props): Promise<ClusterPackageCommon | null> => {
  const cluster = await api.apiPubqClustersRetrieve({ number: clusterNumber })

  if (!cluster.isActive) {
    console.info(`Request for inactive cluster #${clusterNumber}`)
    return null
  }

  const clusterDocuments = cluster.documents?.map(clusterMemberToClusterDocumentCommon) ?? [] 

  const clusterPackage: ClusterPackageCommon = {
    cluster: {
      number: cluster.number,
      allPublished: clusterDocuments.length > 0 ? clusterDocuments.every(document => document.disposition === 'published') : false,
      documents: clusterDocuments,
    },
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const validatedClusterPackage = ClusterPackageCommonSchema.parse(clusterPackage)

  return validatedClusterPackage
}

