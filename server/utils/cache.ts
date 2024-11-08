import type { H3Event } from 'h3'
import { isProduction } from 'std-env'

export function handleBypassCache(event: H3Event): boolean {
  return !isProduction || event.node.req.url.includes('nocache')
}
