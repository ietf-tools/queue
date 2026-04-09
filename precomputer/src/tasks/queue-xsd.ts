
import path from 'node:path'
import fsPromises from 'node:fs/promises'

const xsdPath = path.resolve(import.meta.dirname, '../utils/queue.xsd')
const xsdFileData = fsPromises.readFile(xsdPath, 'utf-8')

export const getQueueXSD = async () => {
  return await xsdFileData
}

