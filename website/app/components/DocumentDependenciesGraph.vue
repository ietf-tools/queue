<template>
  <div ref="container"
    class="overflow-hidden h-[75vh] flex items-center justify-center border border-gray-700 dark:border-gray-200 rounded-md inset-shadow-sm text-center">
    <Icon name="ei:spinner-3" size="1.3rem" class="animate-spin" />
  </div>

  <div v-if="tooltip.text" class="absolute transition-all" :style="{
    left: `${tooltip.position[0]}px`,
    top: `${tooltip.position[1]}px`,
  }">
    <div
      class="absolute transition-all bottom-0 text-xs text-center bg-white dark:bg-black text-black dark:text-white border border-gray-400 rounded-md shadow-xl p-2 w-[15em]"
      aria-atomic="true"
      aria-live="polite"
      >
      <p v-for="line in tooltip.text">{{ line }}</p>
    </div>
  </div>

  <div class="flex gap-2 justify-between py-2 px-1.5">
    <span class="flex flex-row items-center text-sm pl-1">
      Pan and zoom the dependency graph after the layout settles.
    </span>
  </div>
</template>

<script setup lang="ts">
import { uniqBy } from 'es-toolkit';
import { drawGraph, type DrawGraphParameters, type SetTooltip } from '~/utils/document_relations';
import { legendData, type DataParam, type LinkParam, type NodeParam } from '~/utils/document_relations-utils'
import { type ClusterPackageCommon } from '../utils/validators'

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
  // delay building graph until this is available

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
      const { name, rfcNumber, disposition, references, isReceived } = clusterMember

      referenceNodes.push(...(references ?? []).flatMap(reference => {
        const {
          draftName,
          targetDraftName,
          sourceRfcNumber,
          targetRfcNumber,
          targetDisposition,
        } = reference

        return [
          {
            id: draftName,
            rfcNumber: sourceRfcNumber,
            url: `/docs/${draftName}`,
            disposition,
            isReceived,
          },
          {
            id: targetDraftName,
            rfcNumber: targetRfcNumber,
            url: `/docs/${targetDraftName}`,
            disposition: targetDisposition,
            isReceived: undefined,
          }
        ]
      }))

      return [{
        id: name,
        url: `/docs/${name}`,
        rfcNumber,
        isReceived,
        disposition,
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
    // the D3 code will mutate arg data so we'll make a copy
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
