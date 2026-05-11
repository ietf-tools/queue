<template>
  <div v-if="finalReview">
    <Heading :level="props.headingLevel" :style-level="headingLevelPlusOne" class="mt-8 mb-1" :id="props.id"
      has-internal-link>
      <template v-if="
        finalReview.rfcNumber // all final reviews should have an RFC number, but the model doesn't require it so we'll conditionally render it
      ">
        <span>RFC-to-be{{ NBSP }}</span>
        <span class="font-bold">{{ finalReview.rfcNumber }}</span>
      </template>
      <span class="font-mono">({{ props.draftName }})</span>
      <component :is="AssignmentsAsRolesComponent" />
      <component :is="LabelsComponent" />
    </Heading>

    <p v-if="finalReview.clusters" class="text-sm">This document is part of
      <template v-for="(cluster, index) in finalReview.clusters">
        <Anchor :href="clusterNumberPathBuilder(cluster)" :class="`${ANCHOR_TAILWIND_STYLE}`">
          <span class="sr-only">Cluster </span>
          <Icon name="pajamas:group" title="Cluster" class="h-5 w-5 align-middle inline-block mr-0.5" />{{ cluster }}
        </Anchor>
        <template v-if="index < finalReview.clusters.length - 1">{{ COMMA }} </template>
      </template>, so may have additional holds before publication.
    </p>

    <Heading :level="headingLevelPlusOne" :style-level="headingLevelPlusTwo" class="mt-3 mb-1">Approval Status</Heading>
    <RpcTable v-if="finalReview.finalApprovals && finalReview.finalApprovals.length > 0" class="mx-auto">
      <RpcThead>
        <tr>
          <RpcTh>Approver Name</RpcTh>
          <RpcTh>Approver Comment</RpcTh>
          <RpcTh text-align="center">Approval Status</RpcTh>
          <RpcTh>Date Approved</RpcTh>
        </tr>
      </RpcThead>
      <RpcTbody>
        <tr v-for="approverItem in finalReview.finalApprovals">
          <RpcTd>{{ approverItem.approverName }}</RpcTd>
          <RpcTd>{{ approverItem.comment }}</RpcTd>
          <RpcTd text-align="center">
            <abbr v-if="
              Boolean(approverItem.approvedAtIso) // is there a timestamp            
            " title="Yes" class="no-underline px-2 py-1">Y</abbr>
            <abbr v-else title="No" class="no-underline px-2 py-1">N</abbr>
          </RpcTd>
          <RpcTd>
            <time v-if="approverItem.approvedAtIso" :datetime="approverItem.approvedAtIso">
              {{ approverItem.approvedAtIso.split("T")[0] }}
            </time>
            <span v-else>(not available)</span>
          </RpcTd>
        </tr>
      </RpcTbody>
    </RpcTable>
    <p v-else class="italic">No final approvals available.</p>

    <Heading :level="headingLevelPlusOne" :style-level="headingLevelPlusTwo" class="mt-3 mb-1">Action Holders</Heading>
    <RpcTable v-if="actionholderSet && actionholderSet.length > 0" class="mx-auto">
      <RpcThead>
        <tr>
          <RpcTh>Action Holder Name</RpcTh>
          <RpcTh>Comment</RpcTh>
          <RpcTh>Date Requested</RpcTh>
          <RpcTh>Approval Status</RpcTh>
          <RpcTh>Deadline</RpcTh>
          <RpcTh>Body</RpcTh>
        </tr>
      </RpcThead>
      <RpcTbody>
        <tr v-for="actionHolder in actionholderSet">
          <RpcTd>{{ actionHolder.person?.name ?? '(unnamed)' }}</RpcTd>
          <RpcTd>{{ actionHolder.comment ?? '(no comment)' }}</RpcTd>
          <RpcTd>
            <template v-if="actionHolder.sinceWhenComponent">
              <Component :is="actionHolder.sinceWhenComponent" />
            </template>
            <i v-else>
              (unknown)
            </i>
          </RpcTd>
          <RpcTd>
            <template v-if="actionHolder.completedComponent">
              <Component :is="actionHolder.completedComponent" />
            </template>
            <i v-else>
              (pending)
            </i>
          </RpcTd>
          <RpcTd>
            <template v-if="actionHolder.deadlineComponent">
              <Component :is="actionHolder.deadlineComponent" />
            </template>
            <i v-else>
              (none)
            </i>
          </RpcTd>
          <RpcTd>{{ actionHolder.body ?? '(none)' }}</RpcTd>
        </tr>
      </RpcTbody>
    </RpcTable>
    <p v-else class="italic text-sm">No action holders available</p>

    <Heading :level="headingLevelPlusOne" :style-level="headingLevelPlusTwo" class="mt-3 mb-1">Notes</Heading>
    <ol v-if="finalReview.renderableApprovalLogMessages && finalReview.renderableApprovalLogMessages.length > 0"
      class="flex flex-col gap-2 text-sm">
      <li v-for="approvalLog in finalReview.renderableApprovalLogMessages">
        <component :is="approvalLog.logMessageComponent" />
        <p v-if="approvalLog.time" class="text-xs italic text-gray-600 dark:text-gray-400 mt-1">Log posted
          <TimeStamp :dateTime="approvalLog.time" />
        </p>
      </li>
    </ol>
    <p v-else class="italic">No notes available</p>

  </div>
</template>

<script setup lang="ts">
import { clamp } from 'es-toolkit'
import { DateTime } from 'luxon'
import { renderAssignmentsByRoles } from '../utils/queue'
import { COMMA, NBSP } from '../utils/strings'
import Label from './Label.vue'

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

const finalReview = computed(() => {
  if (!props.queue) return null
  const item = props.queue.items.find(queueCommonItem => queueCommonItem.name === props.draftName)
  if (!item) return null
  return {
    ...item,
    generatedAt: props.queue.timestampIso ? DateTime.fromISO(props.queue.timestampIso) : undefined,
    renderableApprovalLogMessages: item?.approvalLogMessages?.map(approvalLogMessage => {
      const time = approvalLogMessage.timeIso ? DateTime.fromISO(approvalLogMessage.timeIso) : undefined
      const timeAgo = time ? time.toRelativeCalendar() : undefined

      return {
        ...approvalLogMessage,
        logMessageComponent: h('div', { class: 'font-mono flex flex-col gap-2' },
          approvalLogMessage.logMessage.split(/\n/g).map(
            line => h('p', String(line))
          )
        ),
        time,
        timeAgo,
      }
    }) ?? undefined
  }
})

if (!finalReview.value) {
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
  const { assignmentsByRoles, name } = item
  if (!assignmentsByRoles) return

  return renderAssignmentsByRoles({
    assignmentsByRoles,
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

  return h('ul', { class: 'inline-flex flex-wrap gap-2' }, item.labels.map(label => {
    return h('li', { class: 'inline' }, h(Label, { label }))
  }))
})

const actionholderSet = computed(() => {
  if (!finalReview.value) {
    return
  }
  const { actionholderSet } = finalReview.value
  if (!actionholderSet) {
    return undefined
  }
  return actionholderSet.map((actionHolder: ActionHolder) => {
    return {
      ...actionHolder,
      sinceWhenComponent: renderIsoDateAsTooltipComponent(actionHolder.sinceWhenIso),
      completedComponent: renderIsoDateAsTooltipComponent(actionHolder.completedIso),
      deadlineComponent: renderIsoDateAsTooltipComponent(actionHolder.deadlineIso),
    }
  })
})

</script>