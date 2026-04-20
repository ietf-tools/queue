import path from 'node:path'
import fsPromises from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { DateTime } from 'luxon'
import { groupBy } from 'es-toolkit'
import { PurpleApi } from '../../generated/purple_client/index.ts'
import { getDOMParser, validateXml } from '../utils/dom.ts'
import { getQueueCommon } from '../utils/queue.ts'
import { type QueueCommon } from '../../../website/app/utils/validators.ts'

type Props = {
  api: PurpleApi
}

export const getQueueXML = async ({ api }: Props): Promise<string> => {
  const queue = await getQueueCommon({ api })
  return renderQueueXML(queue)
}

const xsdPath = path.resolve(import.meta.dirname, '..', 'utils', 'queue.xsd')
const xsdString = fsPromises.readFile(xsdPath, 'utf-8')

const NAMESPACE = 'http://www.rfc-editor.org/rfc-editor-queue'
const XML_DECLARATION = '<?xml version="1.0" encoding="utf-8"?>'
const XML_COMMENT = '<!-- See queue.xsd for validation -->'
const LEGACY_REFQUEUE_ALIAS = 'IN-QUEUE'

/**
 * Generates a queue.xml file aNd validate against the XSD
 */
export const renderQueueXML = async (queue: QueueCommon): Promise<string> => {
  const dom = await getDOMParser()

  const doc = dom.parseFromString(
    `<rfc-editor-queue xmlns="${NAMESPACE}"></rfc-editor-queue>`,
    'text/xml'
  )

  const itemsbyGroup = groupBy(queue.items, (item) => {
    // eg "IETF STREAM: WORKING GROUP STANDARDS TRACK"
    // or "IETF STREAM: NON-WORKING GROUP STANDARDS TRACK"
    const sectionNameParts = [
      item.stream ? `${item.stream.toUpperCase()} STREAM` : undefined,
      item.groupName?.toUpperCase()
    ].filter((val) => Boolean(val))

    if (sectionNameParts.length > 0) {
      const COLON_AND_SPACE = ': '
      const sectionName = sectionNameParts.join(COLON_AND_SPACE)
      return sectionName
    }
    return 'UNKNOWN'
  })
  const sections = Object.keys(itemsbyGroup)

  sections.forEach((section) => {
    // eg <section name="IETF STREAM: WORKING GROUP STANDARDS TRACK">
    // or <section name="IETF STREAM: NON-WORKING GROUP STANDARDS TRACK">
    const sectionEl = doc.createElementNS(NAMESPACE, 'section')
    doc.documentElement.append(sectionEl)
    sectionEl.setAttribute('name', section)

    const items = itemsbyGroup[section]

    items.forEach((item) => {
      const entryEl = doc.createElementNS(NAMESPACE, 'entry')
      sectionEl.append(entryEl)
      entryEl.setAttribute('id', item.name)

      // eg <draft>draft-ietf-ecrit-similar-location-19.txt</draft>
      const draftEl = doc.createElementNS(NAMESPACE, 'draft')
      entryEl.append(draftEl)
      draftEl.textContent = `${item.name}-${item.rev}.txt`

      // eg <date-received>2022-03-07</date-received>
      const enqueuedAtIsoDateTime = item.enqueuedAtIso
        ? DateTime.fromISO(item.enqueuedAtIso).toISO()
        : undefined
      if (enqueuedAtIsoDateTime) {
        const dateReceivedEl = doc.createElementNS(NAMESPACE, 'date-received')
        entryEl.append(dateReceivedEl)
        dateReceivedEl.textContent = enqueuedAtIsoDateTime.split('T')[0]
      }

      // was <state>MISSREF*R(1G)</state>
      // now lists each assignment rather than a derived state
      if (item.assignmentsByRoles) {
        const assignmentsEl = doc.createElementNS(NAMESPACE, 'assignments')
        entryEl.append(assignmentsEl)

        item.assignmentsByRoles.forEach((assignentByRole) => {
          const assignmentEl = doc.createElementNS(NAMESPACE, 'assignment')
          assignmentsEl.append(assignmentEl)
          assignmentEl.textContent = assignentByRole.role
        })
      }

      // eg <normRef><ref-name>draft-ietf-ecrit-lost-planned-changes</ref-name><ref-state>NOT-RECEIVED</ref-state></normRef>
      item.references?.forEach((reference) => {
        const normRefEl = doc.createElementNS(NAMESPACE, 'normRef')
        entryEl.append(normRefEl)

        const refNameEl = doc.createElementNS(NAMESPACE, 'ref-name')
        normRefEl.append(refNameEl)
        refNameEl.textContent = reference.targetDraftName

        const refStateEl = doc.createElementNS(NAMESPACE, 'ref-state')
        normRefEl.append(refStateEl)
        if (reference.relationship === 'refqueue') {
          refStateEl.textContent = LEGACY_REFQUEUE_ALIAS
        } else {
          refStateEl.textContent = reference.relationship.toUpperCase()
        }
      })

      // eg <authors>J. Jeong, Ed., C. Chung, T. Ahn, R. Kumar, S. Hares</authors>
      const authorsEl = doc.createElementNS(NAMESPACE, 'authors')
      entryEl.append(authorsEl)

      authorsEl.textContent = item.authors
        .map((author) => {
          return `${author.titlepageName}${author.isEditor ? ', Ed.' : ''}`
        })
        .join(', ')

      // eg <title>A LoST extension to return complete and similar location info</title>
      const titleEl = doc.createElementNS(NAMESPACE, 'title')
      entryEl.append(titleEl)
      titleEl.textContent = item.title

      if (item.groupName) {
        // eg <source>Emergency Context Resolution with Internet Technologies</source>
        const sourceEl = doc.createElementNS(NAMESPACE, 'source')
        entryEl.append(sourceEl)
        sourceEl.textContent = item.groupName
      }

      // eg <consensus>yes</consensus>
      const consensusEl = doc.createElementNS(NAMESPACE, 'consensus')
      entryEl.append(consensusEl)
      consensusEl.textContent = item.consensus ? 'yes' : 'no'
    })
  })

  const jsdom = new JSDOM()
  const serializer = new jsdom.window.XMLSerializer()
  const xmlString = serializer.serializeToString(doc)

  const finalXML = `${XML_DECLARATION}\n${XML_COMMENT}\n${xmlString}`

  // console.log('------')
  // console.log(finalXML)
  // console.log('------')

  validateXml(finalXML, await xsdString)

  return finalXML
}
