export default defineEventHandler((event) => {
  const appConfig = event.context.appConfig

  return renderCachedTemplate(event.context.templateKey, {
    pageTitle: `Welcome to ${appConfig.title}!`,
    pageDescription: appConfig.description,
  })
})
