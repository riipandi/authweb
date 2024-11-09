import { env } from 'std-env'
import { withQuery } from 'ufo'

const plausibleURL = env.PLAUSIBLE_BASE_URL || 'https://plausible.io'
const embedAuth = env.PLAUSIBLE_EMBED_AUTH || 'default-auth-key'

export default defineEventHandler(
  createTemplateHandler({
    title: 'Public Stats',
    extraContext: {
      embedURL: withQuery(`${plausibleURL}/share/auth.web.id`, {
        auth: embedAuth,
        embed: true,
        theme: 'system',
        width: 'manual',
      }),
    },
  })
)
