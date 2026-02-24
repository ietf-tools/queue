import { PurpleApi, type ApiPubqQueueListRequest } from "../../generated/purple_client/index.ts";
import { type QueueCommon } from '../../../website/app/utils/validators.ts'
import { getQueueCommon } from "../utils/queue.ts";

type Props = {
  api: PurpleApi
  params?: ApiPubqQueueListRequest
}

export const getFinalReviewIndex = async ({ api, params }: Props): Promise<QueueCommon> => getQueueCommon({
  api,
  params: {
    ...params,
    pendingFinalApproval: true
  }
})
