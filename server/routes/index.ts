export default defineEventHandler((event) => {
  const appConfig = event.context.appConfig

  return renderCachedTemplate(event.context.templateKey, {
    pageTitle: `TOTP Generator - ${appConfig.title}!`,
    pageDescription: appConfig.description,
  })
})
