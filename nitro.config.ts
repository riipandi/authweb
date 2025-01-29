import { writeFile } from 'node:fs/promises'
import { makeDirectory } from 'make-dir'
import { resolve } from 'pathe'
import type { AcceptedPlugin } from 'postcss'
import { isDevelopment, isProduction } from 'std-env'
import { env, process, provider } from 'std-env'
import type { AppConfig } from '~/types/config'

const isCloudflarePages = provider === 'cloudflare_pages'
const baseURL = isCloudflarePages ? env.CF_PAGES_URL : 'http://localhost:3000'
const umamiURL = env.UMAMI_BASE_URL

// Create a reusable function for Tailwind compilation
const compileTailwind = async () => {
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

  // Create assets direcctory for Tailwind CSS output file
  await makeDirectory(resolve('.output/assets'), { mode: 0o755 })
  await makeDirectory(resolve('public/assets'), { mode: 0o755 })

  // Write the compiled CSS to the public directory
  await writeFile(resolve('public/assets/styles.css'), result.css)

  // This is required for Cloudflare Pages to serve the CSS file
  await writeFile(resolve('.output/assets/styles.css'), result.css)
}

/* https://nitro.unjs.io/config */
export default defineNitroConfig({
  compatibilityDate: '2024-11-11',
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
    crawlLinks: true,
    failOnError: true,
    routes: ['/', '/password', '/privacy', '/terms', '/stats'],
  },

  routeRules: {
    '/author': {
      redirect: 'https://ripandis.com/?utm_source=authweb',
      prerender: false,
    },
    '/github': {
      redirect: 'https://github.com/riipandi/authweb',
      prerender: false,
    },
    '/x': {
      redirect: 'https://x.com/intent/follow?screen_name=riipandi',
      prerender: false,
    },
    '/js/script.js': { proxy: `${umamiURL}/script.js` },
  },

  hooks: {
    'rollup:before': async () => {
      await compileTailwind()
    },
    'dev:reload': async () => {
      await compileTailwind()
    },
  },

  appConfig: {
    baseURL,
    title: 'AuthWeb',
    description:
      'Free online TOTP/HOTP generator and password manager. Create secure one-time passwords and 2FA tokens directly in your browser. Open source, privacy-focused, and no registration required.',
    author: 'Aris Ripandi',
    siteDomain: env.UMAMI_DATA_DOMAIN,
    umamiWebsiteId: env.UMAMI_WEBSITE_ID,
  } as AppConfig,
})
