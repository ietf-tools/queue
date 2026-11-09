<template>
  <div ref="container" :id="GRAPH_DOM_ID"
    class="overflow-hidden h-[75vh] flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md inset-shadow-sm text-center bg-white dark:bg-black">
    <Icon name="ei:spinner-3" size="1.3rem" class="animate-spin" />
  </div>

  <div v-show="tooltip.text" ref="tooltip" class="absolute transition-all" :style="{
    left: `${tooltip.position[0]}px`,
    top: `${tooltip.position[1]}px`,
  }">
    <div
      class="absolute transition-all bottom-0 text-xs text-center bg-white dark:bg-black text-black dark:text-white border border-gray-400 rounded-md shadow-xl p-2 w-[15em]"
      aria-atomic="true" aria-live="polite">
      <p v-for="line in tooltip.text">{{ line }}</p>
    </div>
  </div>

  <div class="mt-3 mb-6 text-sm">
    <p class="font-bold">Legend</p>
    <ul class="mt-2 flex flex-col gap-1">
      <li v-for="item in legend" :key="item.label">
        <span
          class="inline-block size-3 rounded-full mr-1 align-middle"
          :style="{ backgroundColor: item.color }"
          aria-hidden="true" />
        <b>{{ item.label }}</b> &ndash; {{ item.description }}
        <template v-if="item.blockingConditionsLink">
          For a list of blocking conditions, see
          <Anchor href="/about/#status" :class="ANCHOR_TAILWIND_STYLE">About</Anchor>.
        </template>
      </li>
    </ul>
    <p class="mt-2">An arrow points from a document to its normative reference.</p>
  </div>
</template>

<script setup lang="ts">
import { clamp } from 'es-toolkit';
import { drawGraph, type DrawGraphParameters, type SetTooltip } from '~/utils/document_relations';
import { blue, getClusterGraphData, green, orange, pink } from '~/utils/document_relations-utils'
import { ANCHOR_TAILWIND_STYLE } from '~/utils/theme'
import { type ClusterPackageCommon } from '../utils/validators'

type Props = {
  cluster: ClusterPackageCommon["cluster"],
}

const props = defineProps<Props>()

const clusterToUse = ref(props.cluster)

const GRAPH_DOM_ID = 'cluster-graph'

const router = useRouter()

const containerDOMRef = useTemplateRef('container')
const tooltipDOMRef = useTemplateRef('tooltip')

type Tooltip = { text: string[] | undefined, position: [number, number] }

const tooltip = ref<Tooltip>({ text: undefined, position: [0, 0] })

const setTooltip: SetTooltip = (props) => {
  const { value: tooltipDOM } = tooltipDOMRef

  if (!tooltipDOM) {
    if (
      // only bother reporting error if DOM ref was expected to be found, ie after mounting
      hasMounted.value === true
    ) {
      console.error('container ref not found')
    }
    return
  }

  if (!props) {
    tooltip.value.text = undefined
    return
  }

  const MINIMUM_TOOLTIP_WIDTH_PX = 150
  const bufferXPx = Math.max(
    MINIMUM_TOOLTIP_WIDTH_PX,
    tooltipDOM.offsetWidth // a detached element would have 0 width
  )

  const MINIMUM_TOOLTIP_HEIGHT_PX = 75
  const bufferYPx = Math.max(
    MINIMUM_TOOLTIP_HEIGHT_PX,
    tooltipDOM.offsetHeight // a detached element would have 0 width
  )

  const { position, text } = props
  const clampedPosition: Tooltip['position'] = [
    clamp(
      position[0],
      window.scrollX + bufferXPx, // ensure it's visible onscreen
      window.scrollX + window.outerWidth - bufferXPx
    ),
    clamp(
      position[1],
      window.scrollY + bufferYPx, // ensure it's visible onscreen
      window.scrollY + window.outerHeight - bufferYPx
    ),
  ]

  tooltip.value = {
    text,
    position: clampedPosition
  }
}

const legend = [
  {
    color: blue,
    label: 'Blue',
    description:
      'doc is In Progress and can move on its own through the queue (i.e., does not have a normative reference to an I-D)'
  },
  {
    color: green,
    label: 'Green',
    description: 'doc is In Progress because its normative reference is in the queue'
  },
  {
    color: pink,
    label: 'Pink',
    description: 'doc is blocked itself or its normative reference is blocked.',
    blockingConditionsLink: true
  },
  {
    color: orange,
    label: 'Orange',
    description:
      'a referenced doc that is not in the queue. This doc needs to be in the queue for blocked docs in the cluster to move.'
  }
]

const hasMounted = ref(false)

const clusterGraphData = computed(() => getClusterGraphData(clusterToUse.value))

const attemptToRenderGraph = () => {
  const { value: container } = containerDOMRef

  if (!container) {
    if (
      // only bother reporting error if DOM ref was expected to be found, ie after mounting
      hasMounted.value === true
    ) {
      console.error('container ref not found')
    }
    return
  }

  const chosenGraphData: DrawGraphParameters[0]["data"] = structuredClone(
    // d3 graph code will mutate the data so make a copy
    clusterGraphData.value
  )

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

onMounted(() => {
  hasMounted.value = true
  attemptToRenderGraph()
})
onUnmounted(() => {
  hasMounted.value = false
})

const colorMode = useColorMode()
watch(() => colorMode.value, attemptToRenderGraph)

watch(clusterGraphData, attemptToRenderGraph)
</script>
