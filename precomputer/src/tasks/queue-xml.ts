import path from 'node:path'
import fsPromises from 'node:fs/promises'
import { DateTime } from 'luxon'
import { groupBy } from 'es-toolkit'
import { PurpleApi } from '../../generated/purple_client/index.ts'
import { getDOMParser, validateXml } from '../utils/dom.ts'
import { getQueueCommon } from '../utils/queue.ts'
import { QueueCommon } from '../../../website/app/utils/validators.ts'
import { JSDOM } from 'jsdom'

const xsdPath = path.resolve(import.meta.dirname, '..', 'utils', 'queue.xsd')
const xsdString = fsPromises.readFile(xsdPath, 'utf-8')

export const getQueueXML = async (api: PurpleApi): Promise<string> => {
  const queue = await getQueueCommon({ api })
  return renderQueueXML(queue)
}
/**
 * Generates a queue.xml file per the XSD
 */
export const renderQueueXML = async (queue: QueueCommon): Promise<string> => {
  console.log(JSON.stringify(queue, null, 2))

  const dom = await getDOMParser()

  const NAMESPACE = 'http://www.rfc-editor.org/rfc-editor-queue'
  const doc = dom.parseFromString(`<rfc-editor-queue xmlns="${NAMESPACE}"></rfc-editor-queue>`, 'text/xml')

  const itemsbyGroup = groupBy(queue.items, (item) => item.stream ?? 'NO STREAM')
  const sections = Object.keys(itemsbyGroup)

  sections.forEach(section => {
    const sectionEl = doc.createElementNS(NAMESPACE, 'section')
    doc.documentElement.append(sectionEl)
    sectionEl.setAttribute('name', section.toUpperCase())

    const items = itemsbyGroup[section]
    items.forEach(item => {
      const entryEl = doc.createElementNS(NAMESPACE, 'entry')
      sectionEl.append(entryEl)
      entryEl.setAttribute('xml:id', item.name)

      // eg <draft>draft-ietf-ecrit-similar-location-19.txt</draft>
      const draftEl = doc.createElementNS(NAMESPACE, 'draft')
      entryEl.append(draftEl)
      draftEl.textContent = item.name

      // eg <date-received>2022-03-07</date-received>
      if (item.enqueuedAtIso) {
        const dateReceivedEl = doc.createElementNS(NAMESPACE, 'date-received')
        entryEl.append(dateReceivedEl)
        dateReceivedEl.textContent = DateTime.fromISO(item.enqueuedAtIso).toFormat('')
      }

      // was <state>MISSREF*R(1G)</state>
      // now lists each assignment rather than a derived state
      if (item.assignmentsByRoles) {
        const assignmentsEl = doc.createElementNS(NAMESPACE, 'assignments')
        entryEl.append(assignmentsEl)

        item.assignmentsByRoles.forEach(assignentByRole => {
          const assignmentEl = doc.createElementNS(NAMESPACE, 'assignment')
          entryEl.append(assignmentEl)
          assignmentEl.textContent = assignentByRole.role
        })
      }

      // TODO
      // eg <normRef><ref-name>draft-ietf-ecrit-lost-planned-changes</ref-name><ref-state>NOT-RECEIVED</ref-state></normRef>
      // TODO

      // eg <authors>B. Rosen, R. Marshall, J. Martin</authors>
      const authorsEl = doc.createElementNS(NAMESPACE, 'authors')
      entryEl.append(authorsEl)

      authorsEl.textContent = item.authors.map(author => {
        return `${author.titlepageName}`
      }).join(', ')

      // eg <title>A LoST extension to return complete and similar location info</title>
      const titleEl = doc.createElementNS(NAMESPACE, 'title')
      entryEl.append(titleEl)
      titleEl.textContent = item.title

      // TODO
      // eg <source>Emergency Context Resolution with Internet Technologies</source>
      // const sourceEl = doc.createElementNS(NS, 'source')
      // entryEl.append(sourceEl)
      // titleEl.textContent = item.source
      // TODO

      // eg <consensus>yes</consensus>
      const consensusEl = doc.createElementNS(NAMESPACE, 'consensus')
      entryEl.append(consensusEl)
      consensusEl.textContent = item.consensus ? 'yes' : 'no'
    })
  })
  
  const jsdom = new JSDOM()
  const serializer = new jsdom.window.XMLSerializer()
  const xmlString = serializer.serializeToString(doc);

  validateXml(xmlString, await xsdString)

  return xmlString
}