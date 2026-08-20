
# PublishedStreamStatusCount

Count of RFCs published for one (stream, status) cell of a period.

## Properties

Name | Type
------------ | -------------
`stream` | [PublishedStreamEnum](PublishedStreamEnum.md)
`status` | [PublishedStatusEnum](PublishedStatusEnum.md)
`count` | number

## Example

```typescript
import type { PublishedStreamStatusCount } from ''

// TODO: Update the object below with actual values
const example = {
  "stream": null,
  "status": null,
  "count": null,
} satisfies PublishedStreamStatusCount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublishedStreamStatusCount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


