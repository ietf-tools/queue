import { type Cluster, type QueueItem } from "../../generated/purple_client/index.ts";
import { type ClusterDocumentCommon, type ClusterDocumentReferenceCommon, type QueueCommonItem } from "../../../website/app/utils/validators.ts";
import { assertIsString, assertNever } from "./typescript.ts";

export const parseDisposition = (disposition: string): QueueCommonItem["disposition"] => {
  switch (disposition) {
    case 'created':
    case 'in_progress':
    case 'published':
    case 'withdrawn':
      return disposition
  }
  throw Error(`Unable to parse disposition ${JSON.stringify(disposition)}`)
}

export const parseIanaStatus = (ianaStatus: QueueItem["ianaStatus"]): QueueCommonItem['ianaStatus'] => {
  if (!ianaStatus) {
    return undefined
  }
  if (!ianaStatus.used) {
    return undefined
  }

  return {
    slug: ianaStatus.slug,
    name: ianaStatus.name,
    description: ianaStatus.desc
  }
}

type LabelsCommon = NonNullable<QueueCommonItem["labels"]>
type Labels = NonNullable<QueueItem["labels"]>

export const parseColor = (color: Labels[number]['color']): LabelsCommon[number]['themeColor'] => {
  switch (color) {
    case undefined:
      return 'neutral' // default color
    case 'amber':
    case 'blue':
    case 'cyan':
    case 'emerald':
    case 'fuchsia':
    case 'gray':
    case 'green':
    case 'indigo':
    case 'lime':
    case 'neutral':
    case 'orange':
    case 'pink':
    case 'purple':
    case 'red':
    case 'rose':
    case 'sky':
    case 'slate':
    case 'stone':
    case 'teal':
    case 'violet':
    case 'yellow':
    case 'zinc':
      return color
  }
  assertNever(color)
}

export const parseLabels = (labels: QueueItem["labels"]): QueueCommonItem["labels"] => {
  if (!labels) {
    return undefined
  }

  return labels
    .filter(label => label.used)
    .map((label): LabelsCommon[number] => {
      const { slug, color, isException, isComplexity } = label
      return {
        slug,
        themeColor: parseColor(color),
        isException: Boolean(isException),
        isComplexity: Boolean(isComplexity),
      }
    })
}

export const parseRelationship = (relationship: string) => {
  switch (relationship) {
    case 'refqueue':
    case 'not-received':
    case 'not-received-2g':
    case 'not-received-3g':
      return relationship
  }
  throw Error(`Unable to parse relationship ${JSON.stringify(relationship)}`)
}

type ClusterDocuments = NonNullable<Cluster["documents"]>
type ClusterMember = ClusterDocuments[number]

export const clusterMemberToClusterDocumentCommon = (clusterNumber: number, clusterMember: ClusterMember): ClusterDocumentCommon => {
  const { name, rfcNumber, disposition, references, isReceived } = clusterMember

  console.log(`[cluster ${clusterNumber}]`, `[${name}]`, references?.length ? `${references.length} reference(s)` : 'no references')

  return {
    name,
    disposition: disposition ? parseDisposition(disposition) : undefined,
    isReceived: Boolean(isReceived),
    rfcNumber: rfcNumber ?? undefined,
    references: references?.map((reference): ClusterDocumentReferenceCommon => {
      const {
        relationship,
        draftName,
        targetDraftName,
        targetRfcNumber,
        sourceRfcNumber,
        targetDisposition,
      } = reference

      assertIsString(draftName)
      assertIsString(targetDraftName)

      return {
        relationship: parseRelationship(relationship),
        draftName,
        targetDraftName,
        targetRfcNumber,
        sourceRfcNumber,
        targetDisposition: targetDisposition ? parseDisposition(targetDisposition) : undefined
      }
    }) ?? []
  }
}