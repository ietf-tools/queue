
# QueuePeriodStat

Per-role assignment-time breakdown and blocked/not-blocked totals for one period (bin).

## Properties

Name | Type
------------ | -------------
`label` | string
`start` | Date
`end` | Date
`docCount` | number
`totalBlockedSeconds` | number
`totalWorkingSeconds` | number
`byRole` | [Array&lt;QueueRoleTime&gt;](QueueRoleTime.md)
`legacyIncluded` | boolean

## Example

```typescript
import type { QueuePeriodStat } from ''

// TODO: Update the object below with actual values
const example = {
  "label": null,
  "start": null,
  "end": null,
  "docCount": null,
  "totalBlockedSeconds": null,
  "totalWorkingSeconds": null,
  "byRole": null,
  "legacyIncluded": null,
} satisfies QueuePeriodStat

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QueuePeriodStat
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


