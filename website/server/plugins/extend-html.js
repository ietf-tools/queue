export default defineNitroPlugin((nitroApp) => {
  // Since nuxt upgrade stack trace was missing and this helps to get it back
  nitroApp.hooks.hook('error', async (error, { event }) => {
    console.error(`${event?.path} Application error:`, error)
  })
})