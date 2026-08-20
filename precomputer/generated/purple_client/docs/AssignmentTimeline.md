
# AssignmentTimeline

Per-document assignment timeline payload.

## Properties

Name | Type
------------ | -------------
`transitionDate` | Date
`tracks` | [Array&lt;TimelineTrack&gt;](TimelineTrack.md)
`summary` | [Array&lt;TimelineBand&gt;](TimelineBand.md)
`blockedReasons` | [Array&lt;TimelineBand&gt;](TimelineBand.md)
`legacy` | [Array&lt;TimelineBand&gt;](TimelineBand.md)

## Example

```typescript
import type { AssignmentTimeline } from ''

// TODO: Update the object below with actual values
const example = {
  "transitionDate": null,
  "tracks": null,
  "summary": null,
  "blockedReasons": null,
  "legacy": null,
} satisfies AssignmentTimeline

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentTimeline
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


