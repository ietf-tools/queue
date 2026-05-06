import {
  API_QUEUE_INDEX_PATH,
  API_CLUSTER_INDEX_PATH,
  apiClusterNumberPathBuilder,
  API_FINAL_REVIEW_INDEX_PATH
} from './url'
import { ClusterPackageCommonSchema } from './validators'

export const getQueueIndex = async (origin: string) => {
  const path = API_QUEUE_INDEX_PATH
  const url = new URL(path, origin).toString()
  const unverifiedData = await $fetch(url)
  const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
  if (error || !data) {
    console.error('Queue fetch succeeded but data failed validation', path, unverifiedData, error)
    throw Error('Queue fetch failed. Try again later.')
  }
  return data
}

export const getFinalReviewIndex = async (origin: string) => {
  const path = API_FINAL_REVIEW_INDEX_PATH
  const url = new URL(path, origin).toString()
  const unverifiedData = await $fetch(url)
  const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
  if (error || !data) {
    console.error(
      'Final review index fetch succeeded but data failed validation',
      path,
      unverifiedData,
      error
    )
    throw Error('Final review index fetch failed. Try again later.')
  }
  return data
}

export const getFinalReviewCluster = async (origin: string, clusterNumber: number) => {
  const path = apiClusterNumberPathBuilder(clusterNumber)
  const url = new URL(path, origin).toString()
  const unverifiedData = await $fetch(url)
  const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
  if (error || !data) {
    console.error(
      'Cluster package fetch succeeded but data failed validation',
      path,
      unverifiedData,
      error
    )
    throw Error('Cluster package fetch failed. Try again later.')
  }
  return data
}

export const getClusterIndex = async (origin: string) => {
  const path = API_CLUSTER_INDEX_PATH
  const url = new URL(path, origin).toString()
  const unverifiedData = await $fetch(url)
  const { data, error } = ClusterIndexCommonSchema.safeParse(unverifiedData)
  if (error || !data) {
    console.error(
      'Cluster index fetch succeeded but data failed validation',
      path,
      unverifiedData,
      error
    )
    throw Error('Cluster index fetch failed. Try again later.')
  }
  return data
}

export const getClusterPackage = async (origin: string, clusterNumber: number) => {
  const path = apiClusterNumberPathBuilder(clusterNumber)
  const url = new URL(path, origin).toString()
  const unverifiedData = await $fetch(url)
  const { data, error } = ClusterPackageCommonSchema.safeParse(unverifiedData)
  if (error || !data) {
    console.error(
      'Cluster package fetch succeeded but data failed validation',
      path,
      unverifiedData,
      error
    )
    throw Error('Cluster package fetch failed. Try again later.')
  }
  return data
}
