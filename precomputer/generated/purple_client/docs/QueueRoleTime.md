
# QueueRoleTime

Time spent in one assignment role (or legacy state) within a period.

## Properties

Name | Type
------------ | -------------
`role` | string
`isBlocked` | boolean
`seconds` | number

## Example

```typescript
import type { QueueRoleTime } from ''

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "isBlocked": null,
  "seconds": null,
} satisfies QueueRoleTime

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QueueRoleTime
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


