
# TimelineSegment

One span of time in a single state (see rpc.stats.timeline).

## Properties

Name | Type
------------ | -------------
`start` | Date
`end` | Date
`kind` | [KindEnum](KindEnum.md)
`role` | string
`label` | string
`personId` | number
`personName` | string
`state` | string

## Example

```typescript
import type { TimelineSegment } from ''

// TODO: Update the object below with actual values
const example = {
  "start": null,
  "end": null,
  "kind": null,
  "role": null,
  "label": null,
  "personId": null,
  "personName": null,
  "state": null,
} satisfies TimelineSegment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimelineSegment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


