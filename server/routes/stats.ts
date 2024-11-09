import { env } from 'std-env'
import { withQuery } from 'ufo'

export default defineCachedEventHandler(
  async (event) => {
    const appConfig = event.context.appConfig

    const embedBaseURL = `${env.PLAUSIBLE_BASE_URL}/share/auth.web.id`
    const embedParams = {
      auth: env.PLAUSIBLE_EMBED_AUTH,
      embed: true,
      theme: 'system',
      width: 'manual',
    }

    return renderCachedTemplate(event.context.templateKey, {
      pageTitle: `Public Stats - ${appConfig.title}!`,
      pageDescription: appConfig.description,
      siteAuthor: appConfig.author,
      embedURL: withQuery(embedBaseURL, embedParams),
    })
  },
  {
    shouldBypassCache: (event) => handleBypassCache(event),
    maxAge: 60 * 60 * 12, // 12 hours
  }
)
