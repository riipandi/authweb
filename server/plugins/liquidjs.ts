import { parsePath } from 'ufo'

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    // Get path from route param first, fallback to parsed pathname
    const routeSlug = getRouterParam(event, 'slug')
    const pathname = parsePath(event.path).pathname

    // Determine final route path
    const routePath =
      routeSlug || (pathname === '/' ? 'index' : pathname.slice(1))

    // Generate template key with sanitized path
    const templateKey = `pages:${routePath.replaceAll('/', ':')}`

    // Set context values
    event.context.slug = routePath
    event.context.templateKey = templateKey

    // if (!isProduction) {
    //   console.debug('[DEBUG:liquidjsPlugin]', { pathname, routeSlug, routePath, templateKey })
    // }
  })
})

declare module 'h3' {
  interface H3EventContext {
    slug?: string
    templateKey?: string
  }
}
