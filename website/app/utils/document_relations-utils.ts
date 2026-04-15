import { startCase } from "es-toolkit";

/**
 * These constants were calculated from DOM Bootstrap CSS variables
 * so they've been hardcoded to ensure same rendering
 * If you change them please test a lot.
 */
export const font_size = 14
export const line_height = font_size + 2
export const font_family = 'Arial,sans-serif';
export const font = `${font_size}px ${font_family}`

export const green = "#198754"
export const blue = "#4d9efd"
export const purple = '#bb44bb'
export const orange = "#fd7e14"
export const cyan = "#0dcaf0"
export const yellow = "#ffc107"
export const red = "#ee828d"
export const pink = '#bb44bb'
export const teal = "#20c997"
export const white = "#fff"
export const black = "#212529"
export const gray200 = "#E5E7EB"
export const gray400 = "#ced4da"
export const gray800 = "#4e444a"

export type Relationship = 'refqueue' |
  'not-received' | // implicit 1g
  'not-received-2g' |
  'not-received-3g' |
  'withdrawnref'

export const ref_type: Record<Relationship, string> = {
  refqueue: 'ref queue',
  'not-received': 'not received',
  'not-received-2g': 'not received 2g',
  'not-received-3g': 'not received 3g',
  'withdrawnref': 'withdrawn ref',
} as const;

export const getHumanReadableRelationshipName = (relationship: Relationship) => {
  return relationship in ref_type ? ref_type[relationship as keyof typeof ref_type] : relationship
}

export type Group = "" | "none" | "this group" | "other group"
export type Level =
  | ""
  | "Informational"
  | "Experimental"
  | "Proposed Standard"
  | "Best Current Practice"
  | "Draft Standard"

export const parseLevel = (maybeLevel: string): Level => {
  switch (maybeLevel) {
    case "":
      return ""
    case "inf":
    case "Informational":
      return "Informational"
    case "bcp":
    case "Best Current Practice":
      return "Best Current Practice"
    case "draft":
    case "Draft Standard":
      return "Draft Standard"
    case "exp":
    case "Experimental":
      return "Experimental"
    case "ps":
    case "Proposed Standard":
      return "Proposed Standard"
  }
  console.warn("Unable to parse level: ", maybeLevel)
  return ""
}

export const dispositionValues = [undefined, 'created', 'in_progress', 'published', 'withdrawn'] as const

type Disposition = (typeof dispositionValues)[number]

export const parseDisposition = (maybeDisposition: string | undefined | null): Disposition => {
  if (!maybeDisposition) return undefined

  switch (maybeDisposition) {
    case 'created':
    case 'in_progress':
    case 'published':
    case 'withdrawn':
      return maybeDisposition
  }
  console.warn("Unable to parse disposition: ", maybeDisposition)
  return undefined
}

export const parseRelationship = (maybeRelationship: string): Relationship => {
  switch (maybeRelationship) {
    case 'refqueue' satisfies Relationship:
    case 'not-received' satisfies Relationship:
    case 'not-received-2g' satisfies Relationship:
    case 'not-received-3g' satisfies Relationship:
      return maybeRelationship
  }
  console.warn("Unable to parse relationship: ", maybeRelationship)
  return 'not-received'
}

type CircleTheme = {
  fill: string
  textColor: string,
  strokeWidth: number
  strokeStyle: 'solid' | 'dotted',
  text: Line[],
  tooltip?: string[]
}

// code partially adapted from
// https://observablehq.com/@mbostock/fit-text-to-circle
const wordsToLines = (words: string[]): Line[] => {
  const lines: Line[] = []

  let line_width_0 = Infinity

  const firstWord = words[0]

  if (!firstWord) {
    return []
  }

  let line: Line = {
    text: firstWord,
    width: line_width_0,
  }

  const target_width = Math.sqrt(measureWidth(words.join('').trim()) * line_height)
  for (let i = 0, n = words.length; i < n; ++i) {
    let line_text = `${(line.text ? `${line.text}` : '')}${words[i]}`
    let line_width = measureWidth(line_text) * 1.2
    if ((line_width_0 + line_width) / 2 < target_width) {
      line.width = line_width_0 = line_width
      line.text = line_text
    } else {
      line_width_0 = measureWidth(words[i] ?? '')
      line = { width: line_width_0, text: words[i] ?? '' }
      lines.push(line)
    }
  }
  return lines
}

function measureWidth(text: string): number {
  const context = document.createElement("canvas").getContext("2d")

  if (!context) {
    console.error({ context })
    throw Error("Unable to get canvas context. See console for more")
  }
  context.font = font
  return context.measureText(text).width
}

/**
 * If the API says nodes are !isReceived then reset the isBlocked flag
 */
export const normalizeData = (data: DataParam) => {
  return {
    nodes: data.nodes.map(node => {
      return {
        ...node,
        isBlocked: !node.isReceived ? undefined : node.isBlocked,
      }
    }),
    links: data.links
  }
}

const splitDraftNameIntoWords = (id: string): string[] => {
  return id.split(/-/g).map((part, index) => `${index > 0 ? '-' : ''}${part}`)
}

const makeTooltip = (node: NodeParam): string[] | undefined => {
  const tooltip: string[] = []
  if (node.isReceived) {
    tooltip.push('Received.')
  } else if (node.isReceived === false) {
    tooltip.push('Not received.')
  }
  if (node.disposition) {
    if (node.disposition === 'published') {
      tooltip.push('Published.')
    } else {
      tooltip.push(`Disposition: ${startCase(node.disposition)}.`)
    }
  }
  if (node.isBlocked) {
    tooltip.push('Blocked.')
  }
  return tooltip.length > 0 ? tooltip : undefined
}

/**
 * based on https://docs.google.com/spreadsheets/d/1WoPNZiFf9Hx4Qc6N5UE1-RKhYYNybBeCYZM72wL5TSM/edit?gid=0#gid=0
 */
export const getCircleTheme = (node: NodeParam): CircleTheme => {
  if (Boolean(node.isReceived) && Boolean(node.isNormRef) && !node.hasNormRef && !node.isBlocked && node.disposition === 'in_progress') {
    return {
      fill: blue,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }
  if (Boolean(node.isReceived) && Boolean(node.hasNormRef) && Boolean(node.hasNormRefInQueue) && !node.hasNormRefBlocked && !node.isBlocked && node.disposition === 'in_progress') {
    return {
      fill: green,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }
  if (Boolean(node.isReceived) && Boolean(node.isNormRef) && !node.hasNormRef && Boolean(node.isBlocked)) {
    return {
      fill: pink,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }
  if (Boolean(node.isReceived) && Boolean(node.hasNormRef) && Boolean(node.hasNormRefInQueue) && Boolean(node.hasNormRefBlocked) && Boolean(node.isBlocked)) {
    return {
      fill: pink,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }
  if (Boolean(node.isReceived) && Boolean(node.hasNormRef) && !node.hasNormRefInQueue && Boolean(node.isBlocked) && node.rfcNumber === undefined) {
    return {
      fill: pink,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }
  if (!node.isReceived && Boolean(node.isNormRef)) {
    return {
      fill: orange,
      textColor: black,
      strokeWidth: 1,
      strokeStyle: 'dotted',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }

  if (Boolean(node.isReceived) && !node.hasNormRefInQueue && (!node.hasNormRefBlocked || !node.isBlocked) && node.disposition === 'published') {
    return {
      fill: gray200,
      textColor: black,
      strokeWidth: 2,
      strokeStyle: 'solid',
      text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
      tooltip: makeTooltip(node)
    }
  }

  return {
    fill: black,
    textColor: white,
    strokeWidth: 2,
    strokeStyle: 'solid',
    text: wordsToLines([...splitDraftNameIntoWords(node.id)]),
    tooltip: makeTooltip(node)
  }
}

export type Line = {
  text: string
  width: number
  style?: string
};

export type Node = NodeParam & {
  x: number
  y: number
  r: number
  lines?: Line[]
  stroke?: number
};

export type Link = Omit<LinkParam, 'source' | 'target'> & {
  source: Node
  target: Node
  rel: Relationship
};

export type Data = {
  links: Link[]
  nodes: Node[]
};

export type NodeParam = {
  id: string
  url?: string
  isReceived?: boolean
  isBlocked?: boolean
  isNormRef?: boolean
  hasNormRef?: boolean
  hasNormRefBlocked?: boolean
  hasNormRefInQueue?: boolean
  disposition?: Disposition
  rfcNumber?: number | undefined,
  rfcToBe?: ClusterRfcToBeCommon
};

export type LinkParam = {
  source: string;
  target: string;
  rel: Relationship;
};

export type DataParam = {
  links: LinkParam[]
  nodes: NodeParam[]
}

export const legendData: DataParam = {
  links: [
    { source: "draft-one-with-rfc", target: "draft-is-not-received", rel: "not-received" },
    { source: "draft-one-with-rfc", target: "draft-refnorm-target", rel: 'not-received-2g' },
    { source: "draft-one-with-rfc", target: "draft-refqueue-target", rel: 'not-received-3g' },
    { source: "draft-one-with-rfc", target: "draft-relinfo-target", rel: 'refqueue' },
    { source: "draft-one-with-rfc", target: "draft-withdrawnref-target", rel: 'not-received' },
    { source: "draft-one-with-rfc", target: 'draft-is-received', rel: 'not-received' },
  ],
  nodes: [
    { id: 'draft-one-with-rfc', disposition: undefined },
    { id: 'draft-one-without-rfc', disposition: undefined },
    { id: 'draft-is-not-received', isReceived: false, disposition: undefined },
    { id: 'draft-is-received', isReceived: true, disposition: undefined },
    { id: 'draft-refnorm-target', isReceived: true, disposition: undefined },
    { id: 'draft-refqueue-target', isReceived: true, disposition: undefined },
    { id: 'draft-relinfo-target', isReceived: true, disposition: undefined },
    { id: 'draft-withdrawnref-target', isReceived: true, disposition: undefined },
  ],
};
