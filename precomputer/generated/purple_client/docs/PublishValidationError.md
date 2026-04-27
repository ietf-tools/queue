
# PublishValidationError


## Properties

Name | Type
------------ | -------------
`nonFieldErrors` | string
`disposition` | string
`rfcNumber` | string
`repository` | string

## Example

```typescript
import type { PublishValidationError } from ''

// TODO: Update the object below with actual values
const example = {
  "nonFieldErrors": null,
  "disposition": null,
  "rfcNumber": null,
  "repository": null,
} satisfies PublishValidationError

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublishValidationError
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


