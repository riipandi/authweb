import { renderSVG } from 'uqr'
import { z } from 'zod'

// Query params schema
const QueryParamSchema = z.object({
  chl: z.string({ message: 'Invalid QR code data' }),
})

export default defineEventHandler(async (event) => {
  try {
    // Validate query params
    const query = getQuery(event)
    const { chl } = QueryParamSchema.parse(query)
    const svg = renderSVG(chl)

    setResponseHeader(event, 'Content-Type', 'image/svg+xml')
    return send(event, svg)
  } catch (error) {
    setResponseStatus(event, 500)
    return { status: 500, success: false, message: error.message, error }
  }
})
