import {
  XmlDocument,
  XsdValidator,
  XmlValidateError
} from 'libxml2-wasm'
import { JSDOM } from 'jsdom'

export const getDOMParser = async (): Promise<DOMParser> => {
  const jsdom = new JSDOM()
  return new jsdom.window.DOMParser()
}

export const getNodeType = (maybeNode: unknown): number | undefined => {
  // this comparison avoids `val instanceof HTMLElement` approaches because
  // it's used in Node, and DOM/HTMLElement don't exist natively in Node and
  // each Node DOM library would have its own HTMLElement implementation to
  // instanceof compare against. TS can have DOM types available but that
  // doesn't mean there's a Node HTMLElement available at runtime.
  if (
    maybeNode &&
    typeof maybeNode === 'object' &&
    'nodeType' in maybeNode &&
    typeof maybeNode.nodeType === 'number'
  ) {
    return maybeNode.nodeType
  }
}

const W3CDOM_NODETYPE_ELEMENT = 1
const W3CDOM_NODETYPE_TEXT = 3
const W3CDOM_NODETYPE_COMMENT = 8

/**
 * Technically just checks whether it's an Element not an HTMLElement
 * but this is sufficient for our needs
 */
export const isHtmlElement = (
  maybeHtmlElement: unknown
): maybeHtmlElement is HTMLElement =>
  getNodeType(maybeHtmlElement) === W3CDOM_NODETYPE_ELEMENT

export const isTextNode = (maybeText: unknown): maybeText is Text =>
  getNodeType(maybeText) === W3CDOM_NODETYPE_TEXT

export const isCommentNode = (maybeComment: unknown): maybeComment is Comment =>
  getNodeType(maybeComment) === W3CDOM_NODETYPE_COMMENT

export const elementAttributesToObject = (
  attributes: NamedNodeMap
): Record<string, string> =>
  Array.from(attributes).reduce((acc, attribute) => {
    acc[attribute.name] = attribute.value
    return acc
  }, {} as Record<string, string>)

export const getInnerText = (element: HTMLElement): string => {
  return Array.from(element.childNodes)
    .map((node) => {
      if (isHtmlElement(node)) {
        return getInnerText(node)
      } else if (isTextNode(node)) {
        return node.textContent
      }
      return ''
    })
    .join('')
}

export const getParentElementNodeNames = (node: Node): string[] => {
  let pointer = node
  const parents: string[] = []
  while (pointer.parentElement !== null && pointer !== pointer.ownerDocument) {
    parents.push(pointer.nodeName.toLowerCase())
    pointer = pointer.parentElement
  }
  return parents
}

export const deleteDefaultNamespaces = (xml: string): string => {
  return xml.replace(/\s?xmlns="[^"]+"/gi, '')
}

/**
 * validate xml
 */
export const validateXml = (xml: string, xsd: string): boolean => {  
  const xsdDocument = XsdValidator.fromDoc(XmlDocument.fromString(xsd))
  const xmlDocument = XmlDocument.fromString(xml)
  try {
    xsdDocument.validate(xmlDocument)
    return true
  } catch (e) {
    if (e instanceof XmlValidateError) {
      const lines = xml.split('\n')
      console.error(
        e.details
          .map((detail) => {
            const nearby = lines
              .slice(
                Math.max(0, detail.line - 5),
                Math.min(lines.length, detail.line + 5)
              )
              .join('')
            return `${detail.message}\n${nearby}`
          })
          .join('\n')
      )
    } else {
      console.error('rfc-index.xml validiation failure during rendering', e)
    }
    throw e
  }
}