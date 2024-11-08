export default defineEventHandler((event) => {
  const appConfig = event.context.appConfig

  return renderCachedTemplate(event.context.templateKey, {
    pageTitle: `Password Generator - ${appConfig.title}!`,
    pageDescription: appConfig.description,
  })
})
