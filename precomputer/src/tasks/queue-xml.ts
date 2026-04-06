import { PurpleApi } from '../../generated/purple_client/index.ts'
import { getClusterIndex } from './cluster-index.ts'

export const getQueueXML = async (api: PurpleApi): Promise<string> => {
  const clusterIndex = await getClusterIndex({ api })

  return JSON.stringify(clusterIndex) ?? ''
}