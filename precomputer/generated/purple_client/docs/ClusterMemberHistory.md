
# ClusterMemberHistory

Serialize a HistoricalClusterMember record as a membership change event

## Properties

Name | Type
------------ | -------------
`time` | Date
`by` | string
`type` | string
`draftName` | string

## Example

```typescript
import type { ClusterMemberHistory } from ''

// TODO: Update the object below with actual values
const example = {
  "time": null,
  "by": null,
  "type": null,
  "draftName": null,
} satisfies ClusterMemberHistory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClusterMemberHistory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


