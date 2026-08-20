
# TimelineBand

An aggregate lane: blocked/working summary or one legacy label.

## Properties

Name | Type
------------ | -------------
`kind` | [KindEnum](KindEnum.md)
`label` | string
`segments` | [Array&lt;TimelineSegment&gt;](TimelineSegment.md)

## Example

```typescript
import type { TimelineBand } from ''

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "label": null,
  "segments": null,
} satisfies TimelineBand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimelineBand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


