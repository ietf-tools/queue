
# QueuePublishedStatPeriod

Published-RFC counts by stream and status for one period (bin).

## Properties

Name | Type
------------ | -------------
`label` | string
`start` | Date
`end` | Date
`counts` | [Array&lt;PublishedStreamStatusCount&gt;](PublishedStreamStatusCount.md)

## Example

```typescript
import type { QueuePublishedStatPeriod } from ''

// TODO: Update the object below with actual values
const example = {
  "label": null,
  "start": null,
  "end": null,
  "counts": null,
} satisfies QueuePublishedStatPeriod

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QueuePublishedStatPeriod
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


