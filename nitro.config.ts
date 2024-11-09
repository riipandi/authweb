import { writeFile } from 'node:fs/promises'
import consola from 'consola'
import { resolve } from 'pathe'
import type { AcceptedPlugin } from 'postcss'
import { isDevelopment, isProduction } from 'std-env'
import { env, process, provider } from 'std-env'
import type { AppConfig } from '~/types/config'

const isCloudflarePages = provider === 'cloudflare_pages'
const baseURL = isCloudflarePages ? env.CF_PAGES_URL : 'http://localhost:3000'

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
  serverAssets: [{ baseName: 'views', dir: resolve('server/views') }],

  prerender: {
    autoSubfolderIndex: true,
    crawlLinks: false,
    failOnError: true,
    routes: ['/', '/password', '/privacy', '/terms'],
  },

  routeRules: {
    '/author': { redirect: 'https://ripandis.com/?utm_source=authweb' },
    '/github': { redirect: 'https://github.com/riipandi/authweb' },
    '/x': { redirect: 'https://x.com/intent/follow?screen_name=riipandi' },
    '/js/script.js': { proxy: 'https://stats.web.id/js/script.js' },
    '/api/event': { proxy: 'https://stats.web.id/api/event' },
  },

  hooks: {
    'rollup:before': async () => {
      consola.info('Compiling Tailwind CSS file...')

      const { default: postcss } = await import('postcss')
      const { default: tailwindcss } = await import('tailwindcss')
      const { default: autoprefixer } = await import('autoprefixer')
      const { default: cssnano } = await import('cssnano')

      const shouldMinifyCss = isCloudflarePages || !process.dev
      const postCssPlugins: AcceptedPlugin[] = [
        tailwindcss(),
        autoprefixer(),
        shouldMinifyCss && cssnano({ preset: 'default' }),
      ]

      const result = await postcss(postCssPlugins.filter(Boolean)).process(
        '@tailwind base; @tailwind components; @tailwind utilities;',
        { from: undefined }
      )

      // Write the compiled CSS to the public directory
      await writeFile(resolve('public/styles.css'), result.css)

      // This is required for Cloudflare Pages to serve the CSS file
      await writeFile(resolve('.output/styles.css'), result.css)
    },
  },

  appConfig: {
    baseURL,
    title: 'Auth Web',
    description:
      'Free online TOTP/HOTP generator and password manager. Create secure one-time passwords and 2FA tokens directly in your browser. Open source, privacy-focused, and no registration required.',
    author: 'Aris Ripandi',
  } as AppConfig,
})
