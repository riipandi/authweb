import consola from 'consola'

export default defineEventHandler(async (event) => {
  const { appConfig, templateKey } = event.context
  const logger = consola.withTag('route')

  try {
    const templateContext = {
      pageTitle: `Privacy Policy - ${appConfig.title}!`,
      pageDescription: appConfig.description,
      siteAuthor: appConfig.author,
      currentPath: event.path,
      renderTimestamp: Date.now(),
    }

    logger.debug({
      message: 'Rendering index template',
      templateKey,
      context: templateContext,
    })

    return await renderCachedTemplate(templateKey, templateContext)
  } catch (error) {
    logger.error({
      message: 'Failed to render index template',
      error,
      templateKey,
    })

    if (error instanceof Error && 'statusCode' in error) {
      throw createError({
        statusCode: error.statusCode as number,
        message: error.message,
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    })
  }
})
