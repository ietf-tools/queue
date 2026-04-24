
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterPackageCommon, ClusterPackageCommonSchema } from '../../../website/app/utils/validators.ts'
import { clusterMemberToClusterDocumentCommon } from "../utils/converters.ts";
import { DateTime } from "luxon";

type ClusterDocumentCommon = ClusterPackageCommon["cluster"]["documents"][number]

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

  const clusterDocuments = cluster.documents?.map(clusterMember => clusterMemberToClusterDocumentCommon(cluster.number, clusterMember)) ?? []

  const clusterPackage: ClusterPackageCommon = {
    generatedAtIso: DateTime.now().toISO(),
    cluster: {
      number: cluster.number,
      allPublished: clusterDocuments.length > 0 ? clusterDocuments.every(document => document.disposition === 'published') : false,
      documents: clusterDocuments
        .map((clusterDocument): ClusterDocumentCommon => {
          const { name, rfcNumber, disposition, references, isReceived, isNormRef, isBlocked, finalApprovalCounts } = clusterDocument
          return {
            name,
            rfcNumber,
            disposition,
            references: references.map((reference): ClusterDocumentCommon["references"][number] => {
              return reference
            }),
            isReceived,
            isNormRef,
            isBlocked,
            finalApprovalCounts: finalApprovalCounts ? {
              approved: finalApprovalCounts.approved,
              total: finalApprovalCounts.total,
            } : undefined
          }
        })
        .filter(clusterDocument => clusterDocument.disposition !== 'published')
    },
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  const validatedClusterPackage = ClusterPackageCommonSchema.parse(clusterPackage)

  return validatedClusterPackage
}

