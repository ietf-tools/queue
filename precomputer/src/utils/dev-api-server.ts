import Fastify from 'fastify'
import { getApiClient } from './api.ts'
import { getQueueCommon } from '../tasks/queue.ts'

const fastify = Fastify({
  logger: true
})

fastify.get('/api/v1/queue.json', async () => {
  const api = getApiClient()
  const queueCommon = await getQueueCommon({ api })
  return queueCommon
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