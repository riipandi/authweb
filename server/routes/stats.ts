import { env } from 'std-env'
import { withQuery } from 'ufo'

const siteDomain = env.UMAMI_DATA_DOMAIN || 'auth.web.id'
const umamiURL = env.UMAMI_BASE_URL || 'https://umami.io'
const embedAuth = env.UMAMI_EMBED_AUTH || 'default-auth-key'
const embedBaseURL = `${umamiURL}/share/${embedAuth}/${siteDomain}`

export default defineEventHandler(
  createTemplateHandler({
    title: 'Public Stats',
    extraContext: {
      embedURL: withQuery(embedBaseURL, {
        // embed: true,
        // auth: embedAuth,
        // width: 'manual',
        theme: 'system',
      }),
    },
  })
)
