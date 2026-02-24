
import { uniq } from "es-toolkit";
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterPackageCommon, type ClusterRfcToBeCommon, ClusterPackageCommonSchema } from '../../../website/app/utils/validators.ts'
import { assertIsString } from "../utils/typescript.ts";
import { clusterMemberToClusterDocumentCommon, parseDisposition } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
  clusterNumber: number
}

export const getCluster = async ({ api, clusterNumber }: Props): Promise<ClusterPackageCommon | null> => {
  const cluster = await api.apiPubqClustersRetrieve({ number: clusterNumber })

  if (!cluster.isActive) {
    console.info(`Request for inactive cluster #${clusterNumber}`)
    return null
  }

  const clusterPackage: ClusterPackageCommon = {
    cluster: {
      number: cluster.number,
      documents: cluster.documents?.map(clusterMemberToClusterDocumentCommon) ?? []
    },
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const validatedClusterPackage = ClusterPackageCommonSchema.parse(clusterPackage)

  return validatedClusterPackage
}

