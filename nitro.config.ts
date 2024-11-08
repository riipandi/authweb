import { resolve } from 'pathe'
import { env, isDevelopment, isProduction, provider } from 'std-env'
import type { AppConfig } from '~/types/config'

/* https://nitro.unjs.io/config */
export default defineNitroConfig({
  compatibilityDate: '2024-11-08',
  srcDir: 'server',
  preset: 'cloudflare-pages',
  minify: isProduction,
  sourceMap: isDevelopment,
  errorHandler: '~/error',

  output: { dir: resolve('.output') },
  publicAssets: [{ dir: resolve('public') }],

  prerender: {
    autoSubfolderIndex: true,
    crawlLinks: true,
    failOnError: true,
    routes: ['/'],
  },

  appConfig: {
    baseURL:
      provider === 'cloudflare_pages'
        ? env.CF_PAGES_URL
        : 'http://localhost:3000',
    title: 'Auth Web',
    description: 'Online One Time Password (HOTP/TOTP) generator',
  } as AppConfig,
})
