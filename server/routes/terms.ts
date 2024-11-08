export default defineEventHandler((event) => {
  const appConfig = event.context.appConfig

  return renderCachedTemplate(event.context.templateKey, {
    pageTitle: `Terms of Service - ${appConfig.title}!`,
    pageDescription: appConfig.description,
  })
})
