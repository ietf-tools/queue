
# RfcToBeRequest

RfcToBeSerializer suitable for displaying full details of a single instance

## Properties

Name | Type
------------ | -------------
`title` | string
`_abstract` | string
`group` | string
`dispositionSlug` | string
`externalDeadline` | Date
`internalGoal` | Date
`labels` | Array&lt;number&gt;
`submittedFormatSlug` | string
`pages` | number
`keywords` | string
`boilerplateSlug` | string
`stdLevelSlug` | string
`streamSlug` | string
`authors` | [Array&lt;RfcAuthorRequest&gt;](RfcAuthorRequest.md)
`shepherdId` | number
`iesgContactId` | number
`rfcNumber` | number
`consensus` | boolean
`ianaStatusSlug` | [IanaStatusSlugEnum](IanaStatusSlugEnum.md)
`repository` | string
`streamManagerId` | number
`isAprilFirstRfc` | boolean
`rev` | string

## Example

```typescript
import type { RfcToBeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "_abstract": null,
  "group": null,
  "dispositionSlug": null,
  "externalDeadline": null,
  "internalGoal": null,
  "labels": null,
  "submittedFormatSlug": null,
  "pages": null,
  "keywords": null,
  "boilerplateSlug": null,
  "stdLevelSlug": null,
  "streamSlug": null,
  "authors": null,
  "shepherdId": null,
  "iesgContactId": null,
  "rfcNumber": null,
  "consensus": null,
  "ianaStatusSlug": null,
  "repository": null,
  "streamManagerId": null,
  "isAprilFirstRfc": null,
  "rev": null,
} satisfies RfcToBeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RfcToBeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


