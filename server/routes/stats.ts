import consola from 'consola'
import { env } from 'std-env'
import { withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const { appConfig, templateKey } = event.context
  const logger = consola.withTag('route')

  const embedBaseURL = `${env.PLAUSIBLE_BASE_URL}/share/auth.web.id`
  const embedParams = {
    auth: env.PLAUSIBLE_EMBED_AUTH,
    embed: true,
    theme: 'system',
    width: 'manual',
  }

  try {
    const templateContext = {
      pageTitle: `Public Stats - ${appConfig.title}!`,
      pageDescription: appConfig.description,
      siteAuthor: appConfig.author,
      currentPath: event.path,
      embedURL: withQuery(embedBaseURL, embedParams),
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
