import { renderSVG } from 'uqr'
import { z } from 'zod'
import { generateCacheKey, shouldInvalidateCache } from '../utils/cache'

// Query params schema
const QueryParamSchema = z.object({
  chl: z.string({ message: 'Invalid QR code data' }),
})

export default defineCachedEventHandler(
  async (event) => {
    try {
      // Validate query params
      const query = getQuery(event)

      // Handle missing query params
      if (!query.chl) {
        setResponseStatus(event, 400)
        return {
          status: 400,
          success: false,
          message: 'Missing required parameter: chl',
        }
      }

      // Validate query params
      const { chl } = QueryParamSchema.parse(query)

      // Generate cache key based on QR content
      const cacheKey = generateCacheKey(chl)
      event.context.cacheKey = cacheKey

      const svg = renderSVG(chl)
      setResponseHeader(event, 'Content-Type', 'image/svg+xml')
      setResponseHeader(event, 'Cache-Control', 'public, max-age=43200') // 12 hours
      return svg
    } catch (error) {
      setResponseStatus(event, 500)
      return {
        status: 500,
        success: false,
        message: error.message,
        error,
      }
    }
  },
  {
    shouldBypassCache: (event) => {
      const query = getQuery(event)
      if (!query.chl) return true

      const cacheKey = generateCacheKey(query.chl as string)
      return shouldInvalidateCache(event, cacheKey)
    },
    maxAge: 60 * 60 * 12, // 12 hours
  }
)
