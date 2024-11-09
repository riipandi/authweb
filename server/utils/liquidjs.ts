// Reference: https://github.com/manniL/alexander-lichter-nitro-ejs

import { type Options as MinifyOptions, minify } from 'html-minifier'
import { Liquid, type LiquidOptions } from 'liquidjs'
import { resolve } from 'pathe'
import { isProduction } from 'std-env'

// Storage key for view templates in Nitro
const TEMPLATE_STORAGE_KEY = 'assets:views'

// Templates that should skip caching
const SKIP_CACHE_TEMPLATES = ['index', 'blog'] as const
type SkipCacheTemplate = (typeof SKIP_CACHE_TEMPLATES)[number]

/**
 * Configuration for Liquid template engine
 */
const LIQUID_ENGINE_CONFIG: LiquidOptions = {
  root: [resolve('server/views')],
  cache: !process.dev,
  extname: '.liquid',
  trimTagRight: true,
  strictVariables: true,
  strictFilters: true,
} as const

const MINIFY_OPTIONS: MinifyOptions = {
  html5: true,
  caseSensitive: true,
  collapseWhitespace: !process.dev,
  includeAutoGeneratedTags: true,
  maxLineLength: 240,
  preserveLineBreaks: false,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortClassName: false,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
} as const

/**
 * Renders a Liquid template with caching support
 * @param templatePath - Template path to render
 * @param context - Template context data
 * @returns Rendered HTML string
 */
export const renderCachedTemplate = defineCachedFunction(
  async (templatePath: string, context?: Record<string, unknown>) => {
    return renderTemplate(templatePath, context)
  },
  {
    shouldBypassCache: (templatePath: string): boolean => {
      const shouldSkipCache = SKIP_CACHE_TEMPLATES.includes(
        templatePath.replace('pages:', '') as SkipCacheTemplate
      )
      const isBlogPost = /^pages:blog\/.+/.test(templatePath)
      return !isProduction || shouldSkipCache || isBlogPost
    },
    name: 'liquid-template',
    maxAge: 60 * 60 * 24,
    swr: true,
  }
)

/**
 * Renders a Liquid template from storage
 * @param templatePath - Template path to render
 * @param context - Template context data
 * @returns Rendered HTML string
 */
export async function renderTemplate(
  templatePath: string,
  context?: Record<string, unknown>
) {
  const templateStorage = useStorage(TEMPLATE_STORAGE_KEY)
  const templateContent = await templateStorage.getItem<string>(
    `${templatePath}.liquid`
  )

  if (!templateContent) {
    const message = `Page not found: ${templatePath}`
    throw createError({ status: 404, message })
  }

  const liquidEngine = new Liquid(LIQUID_ENGINE_CONFIG)
  const htmlContent = await liquidEngine.parseAndRender(
    templateContent,
    context
  )

  return minify(htmlContent, MINIFY_OPTIONS)
}