import type { AppConfig } from '~/types/config'

export default eventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig
  return `
      <h1>${appConfig.title} Privacy Policy</h1>
      <p>Get started by editing the <code>server/routes/index.ts</code> file.</p>
      <p>Learn more from <a href="https://nitro.unjs.io" target="_blank">Nitro Documentation</a></p>
    `
})
