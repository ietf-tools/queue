export const getQueue = async () => {
    const response = await fetch(API_QUEUE_PATH)
    if (!response.ok) {
        console.error('fetch failed', API_QUEUE_PATH, response)
        throw Error('Queue fetch failed')
    }
    const unverifiedData = await response.json()
    const { data, error } = QueueCommonSchema.safeParse(unverifiedData)
    if (error) {
        console.error('fetch succeeded but data failed validation', API_QUEUE_PATH, unverifiedData, error)
        throw Error('Queue fetch failed. Try again later.')
    }
    return data
}