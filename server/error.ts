import { process } from 'std-env'
import type { AppConfig } from '~/types/config'

export default defineNitroErrorHandler((error, event) => {
  const appConfig = useAppConfig(event) as AppConfig

  const formatErrorStack = (stack?: string) => {
    if (!stack) return ''
    return stack
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        if (line.startsWith('at ')) {
          const [context, location] = line.split('(')
          return `<span class="text-red-500">${context}</span> <span class="text-red-400">${location ? `(${location}` : ''}</span>`
        }
        return `<span class="font-semibold text-red-600">${line}</span>`
      })
      .join('<br />')
  }

  const formatCause = (cause: unknown): string => {
    if (!cause) return ''
    if (typeof cause === 'string') return cause
    if (cause instanceof Error) return cause.message
    return JSON.stringify(cause, null, 2)
  }

  if (event.path.startsWith('/api')) {
    setResponseHeader(event, 'Content-Type', 'application/json')
    return send(
      event,
      JSON.stringify({
        statusCode: error.statusCode || 500,
        message:
          error.statusCode === 404
            ? 'Resource not found'
            : error.message || 'Internal Server Error',
        ...(process.dev && {
          issues: error.stack
            ?.split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
        }),
      })
    )
  }

  const htmlBody = /* html */ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${appConfig.description}">
    <title>${error.statusCode} - ${appConfig.title}</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gradient-to-br from-white to-gray-100 min-h-screen flex items-center justify-center p-4">
    <main class="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div class="space-y-6">
        <div class="text-center space-y-4">
          <h1 class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">
            ${error.statusCode}
          </h1>
          <h2 class="text-3xl font-bold text-gray-900">Something went wrong!</h2>
          <p class="text-gray-600 text-lg max-w-xl mx-auto">
            ${error.message || 'The page you are looking for might have been removed or is temporarily unavailable.'}
          </p>
        </div>

        ${
          process.dev
            ? `
        <div class="space-y-6">
          <div class="bg-red-50 rounded-lg p-6 overflow-auto max-h-max text-left border border-red-200">
            <div class="font-mono text-sm leading-relaxed">
              <div class="mb-2">
                <span class="font-semibold text-red-800">Error Type:</span>
                <span class="text-red-700">${error.name}</span>
              </div>
              <div class="space-y-1">
                ${formatErrorStack(error.stack)}
              </div>
              ${
                error.cause
                  ? `
              <div class="mt-4 pt-4 border-t border-red-200">
                <span class="font-semibold text-red-800">Cause:</span>
                <pre class="text-red-700 mt-2 whitespace-pre-wrap">${formatCause(error.cause)}</pre>
              </div>
              `
                  : ''
              }
            </div>
          </div>
        </div>
        `
            : ''
        }

        <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <a href="${appConfig.baseURL}" class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 shadow hover:shadow-md w-full">
            Return Home
          </a>
          <button onclick="window.location.reload()" class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-all duration-200 shadow hover:shadow-md w-full">
            Try Again
          </button>
        </div>
      </div>
    </main>
  </body>
</html>`

  setResponseHeader(event, 'Content-Type', 'text/html')
  return send(event, htmlBody)
})
