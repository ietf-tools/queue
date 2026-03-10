import { PurpleApi } from "../../generated/purple_client/index.ts";
import { type QueueCommon } from '../../../website/app/utils/validators.ts'
import { getQueueCommon } from "../utils/queue.ts";

type Props = {
  api: PurpleApi
}

export const getQueueIndex = async (props: Props): Promise<QueueCommon> => getQueueCommon(props)