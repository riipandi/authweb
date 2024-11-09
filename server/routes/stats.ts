import { env } from 'std-env'
import { withQuery } from 'ufo'

const siteDomain = env.PLAUSIBLE_DATA_DOMAIN || 'auth.web.id'
const plausibleURL = env.PLAUSIBLE_BASE_URL || 'https://plausible.io'
const embedAuth = env.PLAUSIBLE_EMBED_AUTH || 'default-auth-key'
const embedBaseURL = `${plausibleURL}/share/${siteDomain}`

export default defineEventHandler(
  createTemplateHandler({
    title: 'Public Stats',
    extraContext: {
      embedURL: withQuery(embedBaseURL, {
        auth: embedAuth,
        embed: true,
        theme: 'system',
        width: 'manual',
      }),
    },
  })
)
