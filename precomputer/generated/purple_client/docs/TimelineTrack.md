
# TimelineTrack

All active spans of a single assignment (one Gantt row).

## Properties

Name | Type
------------ | -------------
`assignmentId` | number
`role` | string
`personId` | number
`personName` | string
`isBlocked` | boolean
`segments` | [Array&lt;TimelineSegment&gt;](TimelineSegment.md)

## Example

```typescript
import type { TimelineTrack } from ''

// TODO: Update the object below with actual values
const example = {
  "assignmentId": null,
  "role": null,
  "personId": null,
  "personName": null,
  "isBlocked": null,
  "segments": null,
} satisfies TimelineTrack

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimelineTrack
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


