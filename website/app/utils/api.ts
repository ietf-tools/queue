import { API_QUEUE_INDEX_PATH, API_CLUSTER_INDEX_PATH, clusterNumberPathBuilder, API_FINAL_REVIEW_INDEX_PATH } from './url'
import { ClusterPackageCommonSchema } from './validators'

export const getQueueIndex = async () => {
    const path = API_QUEUE_INDEX_PATH
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Queue fetch failed', path, response.status, response.statusText, response)
        throw Error(`Queue fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('Queue fetch succeeded but data failed validation', path, unverifiedData, error)
        throw Error('Queue fetch failed. Try again later.')
    }
    return data
}

export const getFinalReviewIndex = async () => {
    const path = API_FINAL_REVIEW_INDEX_PATH
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Final review fetch failed', path, response.status, response.statusText, response)
        throw Error(`Final review fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('Final review fetch succeeded but data failed validation', path, unverifiedData, error)
        throw Error('Final review fetch failed. Try again later.')
    }
    return data
}

export const getClusterIndex = async () => {
    const path = API_CLUSTER_INDEX_PATH
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Cluster index fetch failed', path, response.status, response.statusText, response)
        throw Error(`Cluster index fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = ClusterIndexCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('Cluster index fetch succeeded but data failed validation', path, unverifiedData, error)
        throw Error('Cluster index fetch failed. Try again later.')
    }
    return data
}

export const getClusterPackage = async (clusterNumber: number) => {
    const path = clusterNumberPathBuilder(clusterNumber)
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Cluster number fetch failed', path, response.status, response.statusText, response)
        throw Error(`Cluster number fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = ClusterPackageCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('Cluster number fetch succeeded but data failed validation', path, unverifiedData, error)
        throw Error('Cluster number fetch failed. Try again later.')
    }
    return data
}

