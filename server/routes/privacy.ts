export default defineEventHandler((event) => {
  const appConfig = event.context.appConfig

  return renderCachedTemplate(event.context.templateKey, {
    pageTitle: `Privacy Policy - ${appConfig.title}!`,
    pageDescription: appConfig.description,
    siteAuthor: appConfig.author,
  })
})
