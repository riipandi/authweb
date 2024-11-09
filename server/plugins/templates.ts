import { consola } from 'consola'
import { H3Error } from 'h3'
import { parsePath } from 'ufo'

const logger = consola.withTag('templates')

// Configuration constants
const TEMPLATE_CONFIG = {
  keyPrefix: 'pages',
  maxPathLength: 200,
  allowedChars: /^[a-zA-Z0-9-_/]+$/,
} as const

// Custom error types
class TemplateError extends H3Error {
  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

// Type definitions
interface TemplateContext {
  slug: string
  templateKey: string
  debug?: DebugInfo
}

interface DebugInfo {
  originalPath: string
  routeSlug?: string
  templateKey: string
  timestamp: number
}

// Template key cache
const templateKeyCache = new Map<string, string>()

/**
 * Nitro plugin for handling Liquid template routing and context
 */
export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    try {
      // Get path from route param first, fallback to parsed pathname
      const routeSlug = getRouterParam(event, 'slug')
      const pathname = parsePath(event.path).pathname

      if (!pathname) {
        throw new TemplateError('Invalid path', 400)
      }

      // Determine final route path with validation
      const routePath = sanitizePath(
        routeSlug || (pathname === '/' ? 'index' : pathname.slice(1))
      )

      if (!validatePath(routePath)) {
        throw new TemplateError('Invalid path format', 400)
      }

      // Generate template key with caching
      const templateKey = generateTemplateKey(routePath)

      // Set context values
      event.context.slug = routePath
      event.context.templateKey = templateKey

      // Add metadata for debugging
      event.context.debug = {
        originalPath: pathname,
        routeSlug,
        templateKey,
        timestamp: Date.now(),
      }

      logger.debug({
        message: 'Template route processed',
        path: pathname,
        templateKey,
      })
    } catch (error) {
      logger.error({
        message: 'Template processing failed',
        error,
        path: event.path,
        timestamp: new Date().toISOString(),
      })

      if (error instanceof TemplateError) {
        throw error
      }
      throw new TemplateError('Failed to process template route')
    }
  })
})

/**
 * Validates path format and length
 */
function validatePath(path: string): boolean {
  return (
    path.length <= TEMPLATE_CONFIG.maxPathLength &&
    TEMPLATE_CONFIG.allowedChars.test(path)
  )
}

/**
 * Sanitizes path by removing special characters and multiple slashes
 */
function sanitizePath(path: string): string {
  return path
    .replace(/[^a-zA-Z0-9-_/]/g, '') // Remove special chars except - _ /
    .replace(/\/+/g, '/') // Remove multiple slashes
    .replace(/^\/|\/$/g, '') // Remove leading/trailing slashes
}

/**
 * Generates cached template key from path
 */
function generateTemplateKey(path: string): string {
  if (templateKeyCache.has(path)) {
    return templateKeyCache.get(path) ?? ''
  }

  const key = `${TEMPLATE_CONFIG.keyPrefix}:${path.replaceAll('/', ':')}`
  templateKeyCache.set(path, key)
  return key
}
// Type augmentation for H3
declare module 'h3' {
  interface H3EventContext extends TemplateContext {}
}
