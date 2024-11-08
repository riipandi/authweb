import type { H3Event } from 'h3'
import { hash } from 'ohash'
import { isProduction } from 'std-env'

export function handleBypassCache(event: H3Event): boolean {
  return !isProduction || event.node.req.url?.includes('nocache')
}

export function generateCacheKey(value: string): string {
  return hash(value)
}

export function shouldInvalidateCache(
  event: H3Event,
  currentHash: string
): boolean {
  const storedHash = event.context.cacheKey
  return storedHash !== currentHash
}
