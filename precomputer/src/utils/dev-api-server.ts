import Fastify from 'fastify'
import { getApiClient } from './api.ts'
import { getQueueCommon } from '../tasks/queue.ts'
import { getCluster } from '../tasks/cluster.ts'
import { getClusterIndex } from '../tasks/cluster-index.ts'

const fastify = Fastify({
  logger: true
})

fastify.get('/api/v1/queue.json', async () => {
  const api = getApiClient()
  const queueCommon = await getQueueCommon({ api })
  return queueCommon
})

fastify.get('/api/v1/clusters/:clusterNumber.json', async (request, reply) => {
  if (request.params && typeof request.params === 'object' && 'clusterNumber' in request.params) {
    const { clusterNumber } = request.params
    const clusterNumbery = parseFloat(String(clusterNumber))
    if (!Number.isNaN(clusterNumbery)) {
      const api = getApiClient()
      const cluster = await getCluster({ api, clusterNumber: clusterNumbery })
      if (cluster === null) {
        reply.status(404).send()
        return
      }
      return cluster
    }
  }
  console.log('bad params?', request.params)
  throw Error(`bad param? ${JSON.stringify(request.params)}`)
})

fastify.get('/api/v1/clusters/index.json', async (request) => {
  const api = getApiClient()
  return getClusterIndex({ api })

})

fastify.listen({
  port: 3001,
  host: '0.0.0.0' // 0.0.0.0 needed to work in Docker 
}, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})