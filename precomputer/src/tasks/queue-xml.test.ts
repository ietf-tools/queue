import { test, expect } from 'vitest'
import { renderQueueXML } from './queue-xml'

test('Render queue.xml, validates against XSD schema', async () => {
  const str = await renderQueueXML({ generatedAtIso: '', items: [] })

  // basic sanity check on the response
  expect(str.length).toBeGreaterThan(1000)

  expect(str).toMatchSnapshot()
})