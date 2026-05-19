<template>
  <div v-if="finalReviewDraft">
    <Heading :level="props.headingLevel" class="mt-8 mb-2 text-gray-600 dark:text-gray-200 font-semibold text-balance"
      :id="props.id" has-internal-link>
      <template v-if="
        finalReviewDraft.rfcNumber
      ">
        <span>RFC-to-be{{ NBSP }}</span>
        <span class="font-bold">{{ finalReviewDraft.rfcNumber }}</span>
        {{ SPACE }}
        <span class="font-mono mr-2">({{ props.draftName }})</span>
      </template>
      <template v-else>
        <span class="font-mono mr-2">{{ props.draftName }}</span>
      </template>

      <component :is="AssignmentsAsRolesComponent" />
      <component :is="LabelsComponent" />
    </Heading>

    <p v-if="finalReviewDraft.clusters" class="text-sm">This document is part of
      <template v-for="(cluster, index) in finalReviewDraft.clusters">
        <Anchor :href="clusterNumberPathBuilder(cluster)" :class="`${ANCHOR_TAILWIND_STYLE} font-bold`">
          <span class="sr-only">Cluster </span>
          <Icon name="pajamas:group" title="Cluster" class="h-4 w-4 align-middle inline-block mr-1" />{{ cluster }}
        </Anchor>
        <template v-if="index < finalReviewDraft.clusters.length - 1">{{ COMMA }} </template>
      </template>, so may have additional holds before publication.
    </p>

    <FinalReviewDraftApprovalStatus :heading-level="headingLevelPlusOne" :final-review-draft="finalReviewDraft" />

    <FinalReviewDraftActionHolders :heading-level="headingLevelPlusOne" :final-review-draft="finalReviewDraft" />

    <Heading :level="headingLevelPlusOne" :style-level="headingLevelPlusTwo"
      class="mt-3 mb-2 text-gray-600 dark:text-gray-200 font-semibold text-balance">
      Notes
    </Heading>
    <ol
      v-if="finalReviewDraft.renderableApprovalLogMessages && finalReviewDraft.renderableApprovalLogMessages.length > 0"
      class="flex flex-col gap-2 text-sm">
      <li v-for="approvalLog in finalReviewDraft.renderableApprovalLogMessages">
        <component :is="approvalLog.logMessageComponent" />
        <p v-if="approvalLog.time" class="text-xs italic text-gray-600 dark:text-gray-400 mt-1">Log posted
          <TimeStamp :dateTime="approvalLog.time" />
        </p>
      </li>
    </ol>
    <p v-else class="italic text-sm">No notes available.</p>
  </div>
</template>

<script setup lang="ts">
import { clamp } from 'es-toolkit'
import { DateTime } from 'luxon'
import { renderAssignmentsByRoles } from '../utils/queue'
import { COMMA, NBSP } from '../utils/strings'
import Label from './Label.vue'
import type { FinalReviewDraft, RenderableApprovalLogMessage } from '~/utils/final-review'
import Linkify from './Linkify.vue'

type Props = {
  id: string
  headingLevel: HeadingLevel
  draftName: string
  queue: QueueCommon
}

const props = defineProps<Props>()

const headingLevelPlusOne = computed((): HeadingLevel => {
  return (
    clamp(
      parseInt(props.headingLevel, 10) + 1,
      1,
      6
    )
  ).toString() as HeadingLevel
})

const headingLevelPlusTwo = computed((): HeadingLevel => {
  return (
    clamp(
      parseInt(props.headingLevel, 10) + 2,
      1,
      6
    )
  ).toString() as HeadingLevel
})

const finalReviewDraft = computed((): FinalReviewDraft | null => {
  if (!props.queue) return null
  const finalReviewDraftData = props.queue.items.find(queueCommonItem => queueCommonItem.name === props.draftName)
  if (!finalReviewDraftData) return null
  return {
    ...finalReviewDraftData,
    generatedAt: props.queue.timestampIso ? DateTime.fromISO(props.queue.timestampIso) : undefined,
    renderableApprovalLogMessages: finalReviewDraftData?.approvalLogMessages?.map((approvalLogMessage): RenderableApprovalLogMessage => {
      const time = approvalLogMessage.timeIso ? DateTime.fromISO(approvalLogMessage.timeIso) : undefined
      const timeAgo = time ? time.toRelativeCalendar() : undefined

      return {
        ...approvalLogMessage,
        logMessageComponent: h('div', { class: 'font-mono flex flex-col gap-2' },
          approvalLogMessage.logMessage.split(/\n/g).map(
            line => h('p', h(Linkify, { html: line }))
          )
        ),
        time,
        timeAgo,
      }
    }) ?? undefined
  }
})

if (!finalReviewDraft.value) {
  console.error(`[404] ${props.draftName}`)
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true
  })
}

const AssignmentsAsRolesComponent = computed(() => {
  if (!props.queue) return null
  const item = props.queue.items.find(queueCommonItem => queueCommonItem.name === props.draftName)
  if (!item) return null
  const { assignmentsByRoles, pendingActivities, ianaStatus } = item
  if (!assignmentsByRoles) return

  return renderAssignmentsByRoles({
    assignmentsByRoles,
    pendingActivities,
    ianaStatus,
    hideLinkDetails: true,
    linkFinalReviewsBy: item.rfcNumber ? {
      type: 'RFC_NUMBER',
      rfcNumber: item.rfcNumber
    } : {
      type: 'DRAFTNAME',
      draftName: item.name
    }
  })
})

const LabelsComponent = computed(() => {
  if (!props.queue) return null
  const item = props.queue.items.find(queueCommonItem => queueCommonItem.name === props.draftName)
  if (!item || !item.labels) return null

  return h('ul', { class: 'ml-2 inline-flex flex-wrap gap-2' }, item.labels.map(label => {
    return h('li', { class: 'inline' }, h(Label, { label }))
  }))
})
</script>