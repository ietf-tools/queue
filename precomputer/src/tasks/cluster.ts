
import { uniq } from "es-toolkit";
import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type ClusterCommon, type ClusterRfcToBeCommon, ClusterCommonSchema } from '../../../website/app/utils/validators.ts'
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

  const rfcToBeOrNulls = await Promise.all(uniqueNames.map(async (draftName) => {
    try {
      const rfcToBe = await api.documentsRetrieve({ draftName })
      return rfcToBe
    } catch (e) {
      console.error(`Cannot access draft ${JSON.stringify(draftName)}`)
      return null
    }
  }))

  const rfcToBes = rfcToBeOrNulls.filter(val => val !== null)

  const clusterCommon: ClusterCommon = {
    cluster: {
      number: cluster.number,
      documents: cluster.documents?.map(clusterMemberToClusterDocumentCommon) ?? []
    },
    rfcToBes: rfcToBes.map((rfcToBe): ClusterRfcToBeCommon => {
      const {
        name,
        disposition,
        rfcNumber,
      } = rfcToBe
      assertIsString(name)

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

