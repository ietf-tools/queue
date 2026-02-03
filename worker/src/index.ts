import { IttyRouter } from 'itty-router'
import { blobs } from './blobs'

const router = IttyRouter()

router
  .get('*', blobs)

export default {
  ...router
}
