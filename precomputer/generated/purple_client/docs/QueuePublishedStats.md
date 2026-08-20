
# QueuePublishedStats

RFCs published by stream and status across selectable past periods.  ``streams`` and ``statuses`` are the non-empty ones in display order (the axes to render); each period\'s ``counts`` holds only its non-zero cells.

## Properties

Name | Type
------------ | -------------
`streams` | [Array&lt;PublishedStreamEnum&gt;](PublishedStreamEnum.md)
`statuses` | [Array&lt;PublishedStatusEnum&gt;](PublishedStatusEnum.md)
`periods` | [Array&lt;QueuePublishedStatPeriod&gt;](QueuePublishedStatPeriod.md)

## Example

```typescript
import type { QueuePublishedStats } from ''

// TODO: Update the object below with actual values
const example = {
  "streams": null,
  "statuses": null,
  "periods": null,
} satisfies QueuePublishedStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QueuePublishedStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


