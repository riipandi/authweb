import type { AppConfig } from '~/types/config'

export default defineEventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig
  event.context.appConfig = appConfig
})

declare module 'h3' {
  interface H3EventContext {
    appConfig?: AppConfig
  }
}
