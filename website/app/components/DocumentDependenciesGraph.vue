<template>
  <div ref="container"
    class="overflow-hidden h-[75vh] flex items-center justify-center border border-gray-700 dark:border-gray-200 rounded-md inset-shadow-sm text-center">
    <Icon name="ei:spinner-3" size="1.3rem" class="animate-spin" />
  </div>

  <div v-show="tooltip.text" class="absolute transition-all" :style="{
    left: `${tooltip.position[0]}px`,
    top: `${tooltip.position[1]}px`,
  }">
    <div
      class="absolute transition-all bottom-0 text-xs text-center bg-white dark:bg-black text-black dark:text-white border border-gray-400 rounded-md shadow-xl p-2 w-[15em]"
      aria-atomic="true" aria-live="polite">
      <p v-for="line in tooltip.text">{{ line }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uniqBy } from 'es-toolkit';
import { drawGraph, type DrawGraphParameters, type SetTooltip } from '~/utils/document_relations';
import { legendData, type DataParam, type LinkParam, type NodeParam } from '~/utils/document_relations-utils'
import { type ClusterDocumentCommon, type ClusterPackageCommon } from '../utils/validators'
import { datatrackerDraftUrlBuilder } from '~/utils/url';

type Props = {
  cluster: ClusterPackageCommon["cluster"],
}

const props = defineProps<Props>()

const clusterToUse = ref(props.cluster)

const router = useRouter()

const containerRef = useTemplateRef('container')

const tooltip = ref<{ text: string[] | undefined, position: [number, number] }>({ text: undefined, position: [0, 0] })

const setTooltip: SetTooltip = (props) => {
  if (!props) {
    tooltip.value.text = undefined
    return
  }
  tooltip.value = props
}

const showLegend = ref(false)

const hasMounted = ref(false)

const clusterGraphData = computed(() => {
  const newClusterGraphData: DataParam = {
    links: [],
    nodes: []
  }

  const isNodeParam = (data: unknown): data is NodeParam => {
    const isANode = Boolean((data && typeof data === 'object' && 'id' in data))
    if (!isANode) {
      console.log("!IS A NODE", isANode, data)
    }
    return isANode
  }

  const isLinkParam = (data: unknown): data is LinkParam => {
    return Boolean((data && typeof data === 'object' && 'source' in data && 'target' in data && 'rel' in data))
  }

  let referenceNodes: NodeParam[] = []

  newClusterGraphData.nodes.push(
    ...(clusterToUse.value.documents ?? []).flatMap((clusterMember): NodeParam[] | null => {
      const { name, rfcNumber, disposition, references, isReceived, isBlocked } = clusterMember

      const hasNormRef = references ? references.length > 0 : undefined
      const hasNormRefInQueue = references ? references.some(reference => reference.relationship === 'refqueue') : undefined
      const hasNormRefBlocked = references ? references.some(reference => {
        if (!reference.targetDraftName || !clusterToUse.value.documents) {
          return
        }
        const targetDocument = clusterToUse.value.documents.find(doc => doc.name === reference.targetDraftName)
        if (!targetDocument) {
          referenceNodes.push({
            id: reference.targetDraftName,
            url: `/docs/${reference.targetDraftName}`,
            isNormRef: true,
          })
          return true
        }
        return Boolean(targetDocument.isBlocked)
      }) : undefined

      const rfcToBeToNodeParam = (rfcToBe: ClusterDocumentCommon, partialNodeParam: Partial<NodeParam>): NodeParam | undefined => {
        const { name, disposition } = rfcToBe
        if (!name) {
          console.warn("rfcToBe had no name?", rfcToBe)
          return
        }

        return {
          id: name,
          rfcNumber: rfcToBe.rfcNumber ?? undefined,
          url: `/docs/${name}`,
          disposition: parseDisposition(disposition),
          ...partialNodeParam,
        }
      }

      referenceNodes.push(...(references ?? []).flatMap(reference => {
        const { draftName, targetDraftName } = reference
        const draft = draftName ? clusterToUse.value.documents.find(doc => doc.name === draftName) : undefined
        const target = targetDraftName ? clusterToUse.value.documents.find(doc => doc.name === targetDraftName) : undefined

        return [
          draft ? rfcToBeToNodeParam(draft, { isNormRef: false }) : draftName ? { id: draftName, url: `/docs/${draftName}`, isNormRef: false } : undefined,
          target ? rfcToBeToNodeParam(target, {
            isNormRef: true, // all targets are norm refs
          }) : targetDraftName ? { id: targetDraftName, url: `/docs/${targetDraftName}`, isNormRef: true } : undefined,
        ].filter(isNodeParam)
      }))

      return [{
        id: name,
        url: datatrackerDraftUrlBuilder(name),
        rfcNumber,
        isReceived,
        disposition,
        isBlocked,
        isNormRef: false,
        hasNormRef,
        hasNormRefInQueue,
        hasNormRefBlocked
      }]
    }).filter(isNodeParam)
  )

  referenceNodes = referenceNodes.filter(
    // only include reference nodes if they weren't already mentioned
    referenceNode => !newClusterGraphData.nodes.some(graphDataNode => graphDataNode.id === referenceNode.id)
  )
  newClusterGraphData.nodes.push(...referenceNodes)

  newClusterGraphData.links.push(
    ...(clusterToUse.value.documents ?? []).flatMap((clusterMember): LinkParam[] | null => {
      const { references } = clusterMember

      return references.map((reference): LinkParam => {
        const { draftName, targetDraftName, relationship } = reference

        return {
          source: draftName,
          target: targetDraftName,
          rel: relationship,
        }
      })
    }).filter(isLinkParam)
  )

  newClusterGraphData.nodes = uniqBy(newClusterGraphData.nodes, (node) => node.id)
  newClusterGraphData.links = uniqBy(newClusterGraphData.links, (link) => JSON.stringify([link.source, link.target, link.rel]))

  return newClusterGraphData
})

const attemptToRenderGraph = () => {
  const { value: container } = containerRef

  if (!container) {
    if (
      // only bother reporting error if DOM ref was expected to be found, ie after mounting
      hasMounted.value === true) {
      console.error('container ref not found')
    }
    return
  }

  const graphData = structuredClone(
    // the D3 code will mutate data so we'll make a copy
    clusterGraphData.value
  )

  const chosenGraphData: DrawGraphParameters[0]["data"] = showLegend.value
    ? legendData
    : graphData

  let [leg_el, leg_sim] = drawGraph({
    data: chosenGraphData,
    pushRouter: router.push,
    colorMode: colorMode.value === 'dark' ? 'dark' : 'light',
    setTooltip,
  });

  if (!(leg_el instanceof SVGElement) || !leg_sim) {
    console.error(`Received unexpected response from draw_graph.`, { leg_el, leg_sim })
    return
  }

  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }

  container.appendChild(leg_el)

  if (leg_sim instanceof SVGSVGElement) {
    console.error(
      'Expected `leg_sim` to be D3 Simulation Node not SVGSVGElement.',
      { leg_sim })
    return
  } else {
    leg_sim.restart();
  }
}

const colorMode = useColorMode()

watch(() => colorMode.value, attemptToRenderGraph)
watch(clusterGraphData, attemptToRenderGraph)
watch(showLegend, attemptToRenderGraph)
onMounted(attemptToRenderGraph)
</script>
