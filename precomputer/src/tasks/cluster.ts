
import { uniq } from "es-toolkit";
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterCommon, type ClusterRfcToBeCommon, type ClusterDocumentReferenceCommon, ClusterCommonSchema } from '../../../website/app/utils/validators.ts'
import { assertIsString } from "../utils/typescript.ts";
import { clusterMemberToClusterDocumentCommon, parseDisposition } from "../utils/converters.ts";

type Props = {
  api: PurpleApi
  clusterNumber: number
}

export const getCluster = async ({ api, clusterNumber }: Props): Promise<ClusterCommon | null> => {
  const cluster = await api.apiPubqClustersRetrieve({ number: clusterNumber })

  if (!cluster.isActive) {
    console.info(`Request for inactive cluster #${clusterNumber}`)
    return null
  }

  const names = cluster.documents?.flatMap((document): string[] => {
    return [document.name,
    ...(document.references ?? []).flatMap(reference => {
      return [reference.draftName, reference.targetDraftName].filter(val => typeof val === 'string')
    })
    ]
  }) ?? []

  const uniqueNames = uniq(names)

  const rfcToBes = await Promise.all(uniqueNames.map((draftName) =>
    api.documentsRetrieve({ draftName })
  ))

  const clusterCommon: ClusterCommon = {
    cluster: {
      number: cluster.number,
      documents: cluster.documents?.map(clusterMemberToClusterDocumentCommon) ?? []
    },
    rfcToBes: rfcToBes.map((rfcToBe): ClusterRfcToBeCommon => {
      const {
        name,
        title,
        disposition,
        rfcNumber,
      } = rfcToBe
      assertIsString(name)
      assertIsString(title)

      return {
        name,
        rfcNumber: rfcNumber ?? undefined,
        disposition: parseDisposition(disposition),
      }
    })
  }

  // This will throw on invalid, and it will remove additional props
  const verifiedClusterCommon = ClusterCommonSchema.parse(clusterCommon)

  return verifiedClusterCommon
}

