export const getQueue = async () => {
    const path = API_QUEUE_PATH
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Queue fetch failed', path, response.status, response.statusText, response)        
        throw Error(`Queue fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('fetch succeeded but data failed validation', API_QUEUE_PATH, unverifiedData, error)
        throw Error('Queue fetch failed. Try again later.')
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
        console.error('fetch succeeded but data failed validation', API_QUEUE_PATH, unverifiedData, error)
        throw Error('Queue fetch failed. Try again later.')
    }
    return data
}

export const getCluster = async (clusterNumber: number) => {
    const path = clusterNumberPathBuilder(clusterNumber)
    const response = await fetch(path)
    if (!response.ok) {
        console.error('Cluster number fetch failed', path, response.status, response.statusText, response)
        throw Error(`Cluster number fetch failed ${response.status}: ${response.statusText}`)
    }
    const unverifiedData = await response.json()
    const { data, error } = ClusterCommonSchema.safeParse(unverifiedData)
    if (error || !data) {
        console.error('fetch succeeded but data failed validation', API_QUEUE_PATH, unverifiedData, error)
        throw Error('Cluster fetch failed. Try again later.')
    }
    return data
}