import consola from 'consola'
import type { H3Event } from 'h3'
import type { LiquidTemplateError } from '~/utils/liquidjs'

interface PageMeta {
  title?: string
  description?: string
  extraContext?: Record<string, unknown> | (() => Record<string, unknown>)
}

function isLiquidTemplateError(error: unknown): error is LiquidTemplateError {
  return error instanceof Error && error.name === 'LiquidTemplateError'
}

export function createTemplateHandler(pageMeta?: PageMeta) {
  return async (event: H3Event) => {
    const { appConfig, templateKey } = event.context
    const logger = consola.withTag('template-handler')

    try {
      const extraContext =
        pageMeta?.extraContext && typeof pageMeta.extraContext === 'function'
          ? pageMeta.extraContext()
          : pageMeta?.extraContext

      const templateContext = {
        pageTitle: pageMeta?.title
          ? `${pageMeta.title} - ${appConfig.title}!`
          : appConfig.title,
        pageDescription: pageMeta?.description || appConfig.description,
        siteAuthor: appConfig.author,
        currentPath: event.path,
        renderTimestamp: Date.now(),
        ...extraContext,
      }

      logger.debug({
        message: `Rendering ${pageMeta?.title || 'default'} template`,
        templateKey,
        context: templateContext,
      })

      return await renderCachedTemplate(templateKey, templateContext)
    } catch (error) {
      logger.error({
        message: `Failed to render ${pageMeta?.title || 'default'} template`,
        error,
        templateKey,
      })

      if (isLiquidTemplateError(error)) {
        throw createError({
          statusCode: error.statusCode,
          message: error.message,
        })
      }

      throw createError({ statusCode: 500, message: 'Internal server error' })
    }
  }
}
