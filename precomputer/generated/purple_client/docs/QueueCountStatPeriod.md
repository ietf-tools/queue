
# QueueCountStatPeriod

Document/page counts for one period (bin).

## Properties

Name | Type
------------ | -------------
`label` | string
`start` | Date
`end` | Date
`docsAtStart` | number
`docsEntered` | number
`pagesAtStart` | number
`pagesEntered` | number
`rfcsPublished` | number
`pagesPublished` | number
`pagesToEdit` | number
`pagesBlockedEnd` | number
`pagesInProgressEnd` | number
`docsBlockedEntire` | number
`docsEnteredMissingRef` | number
`avgPctBlocked` | number
`avgPctBlockedAll` | number
`legacyIncluded` | boolean

## Example

```typescript
import type { QueueCountStatPeriod } from ''

// TODO: Update the object below with actual values
const example = {
  "label": null,
  "start": null,
  "end": null,
  "docsAtStart": null,
  "docsEntered": null,
  "pagesAtStart": null,
  "pagesEntered": null,
  "rfcsPublished": null,
  "pagesPublished": null,
  "pagesToEdit": null,
  "pagesBlockedEnd": null,
  "pagesInProgressEnd": null,
  "docsBlockedEntire": null,
  "docsEnteredMissingRef": null,
  "avgPctBlocked": null,
  "avgPctBlockedAll": null,
  "legacyIncluded": null,
} satisfies QueueCountStatPeriod

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QueueCountStatPeriod
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


