import { PurpleApi, type ApiPubqQueueListRequest } from "../../generated/purple_client/index.ts";
import { FinalReviewIndexCommonSchema, type FinalReviewIndexCommon } from '../../../website/app/utils/validators.ts'
import { getQueueCommon } from "../utils/queue.ts";

type Props = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

export const getFinalReviewIndex = async ({ api, params }: Props): Promise<FinalReviewIndexCommon> => {
  const [pendingFinalApproval, notPendingFinalApproval] = await Promise.all([
    getQueueCommon({
      api,
      params: {
        ...params,
        pendingFinalReview: true
      }
    }),
    getQueueCommon({
      api,
      params: {
        ...params,
        pendingFinalReview: false
      }
    })
  ])

  const finalReviewIndex: FinalReviewIndexCommon = {
    timestampIso: pendingFinalApproval.timestampIso,
    pendingFinalApproval: pendingFinalApproval.items,
    notPendingFinalApproval: notPendingFinalApproval.items,
  }

  // This will throw on invalid, and it will remove additional props (ie deleting props unknown to schema)
  return FinalReviewIndexCommonSchema.parse(finalReviewIndex)
}
