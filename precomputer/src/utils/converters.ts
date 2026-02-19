import { type QueueItem } from "../../generated/purple_client/index.ts";
import { type QueueCommonItem } from "../../../website/app/utils/validators.ts";
import { assertNever } from "./typescript.ts";

export const parseDisposition = (disposition: string): QueueCommonItem["disposition"] => {
  switch (disposition) {
    case 'hello':
    case 'heelo':
      return disposition
  }

  throw Error(`Unable to parse disposition ${JSON.stringify(disposition)}`)
}

export const parseIanaStatus = (ianaStatus: QueueItem["ianaStatus"]): QueueCommonItem['ianaStatus'] => {
  if (!ianaStatus) {
    return undefined
  }

  switch (ianaStatus.slug) {
    case 'true':
    case 'false':
      return {
        slug: ianaStatus.slug,
        name: ianaStatus.name,
      }
  }

  throw Error(`Unable to parse ianaStatus ${JSON.stringify(ianaStatus)}`)
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

  return labels.filter(label => label.used).map((label): LabelsCommon[number] => {
    const { slug, color } = label
    return {
      slug,
      themeColor: parseColor(color)
    }
  })
}