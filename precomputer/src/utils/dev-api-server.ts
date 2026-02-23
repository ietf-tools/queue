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

fastify.get('/api/v1/clusters/:number.json', async (request, reply) => {
  console.log("WHAT TEST", request.params)
  if (request.params && typeof request.params === 'object' && 'number' in request.params) {
    const { number } = request.params
    const clusterNumber = parseFloat(String(number))
    console.log("FOUND CLUSTER NUMBER", clusterNumber)

    if (!Number.isNaN(clusterNumber)) {
      const api = getApiClient()
      console.log("Get cluster", clusterNumber)
      try {
        const cluster = await getCluster({ api, clusterNumber })
        if (cluster === null) {
          reply.status(404).send()
          return
        }
        return cluster
      } catch (e) {
        console.error(clusterNumber, e)
        reply.status(500).send()
      }
    }
  }

  return { test: 234 }
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