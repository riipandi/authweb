import type { AppConfig } from '~/types/config'

export default eventHandler((event) => {
  const appConfig = useAppConfig(event) as AppConfig
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appConfig.title}</title>
    <meta name="description" content="${appConfig.description}"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${appConfig.title}" />
    <meta property="og:description" content="${appConfig.description}" />
    <meta property="og:url" content="${appConfig.baseURL}" />
    <meta property="og:site_name" content="${appConfig.title}" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Inter:400,700" />
    <link rel="icon" type="image/x-icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABR1BMVEUAAADvnyLzniTooi7voCPvoCPwoST0nyDwoCPxnyL/qgDyoSLvnyTzoiP1ox/woSLqqivwoCPwoCPwnyLwnyPwoifxnyTwoCTwoCPwnyPuoiLwoSLwoCTvoCTxoSTzniTyoSjxnyLxnyP0myHmmRrvoCPxoCPjqhzwoCPwoCTwoSPwoCPwoCPvoCTvoCPwnyPwoCTvoSPwoCTxnyPwoCPwnyPxoCLvoSL/qivwoCPxoCPwoCPwoCPyoCPwoCPvoCPyoSLwoCPxnyLwoCPxnyLwoCPtniPwoCPunyLwoCTwoCPwoSTvoCX/nyDwoSPwoCTvoSPwoCPwoCLypibyniPwoCPwoSPyoSTtpCTwoCPwoCPrnSfwoCPwnyLwoCPwoCPwoCPxoCPynyDwoSTwoSPuoiLwoCLwnyTynSHwoCPwoCPwoCMAAACLgF6TAAAAa3RSTlMAcCoLg5N6GO4lAyZAFhlEDGapyGUhXe3sqB53VoFcFRNaWBcK5uUJ+tdXmflOXph5krpI97hZbwa3wv62O/2RTO81+ErZHdYtI/yHPgiaRl/7hhQ64eA5HPPyGjN4zMa7bihkqjxDiCfc25nru3cAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gwTEhI7xlnrsAAAAUdJREFUKM+d0ldbwjAUBuDDLhWlFES0roK7DnCBE7eAAgruiSBDz/+/Nym0pYXc+F2cpnmfNOdJCmCKzQb9Y3fQ6nTS6rD3sMtFq9ttjE3xcF5SeZ6UAc7T+3XfoDYa8vfdXgiIwaAYEizTw6LaSngE1UTCaqujYx3mJW6cNI16JgAmOYnX109Ng4xdiUIsZtpgZrab5+Yt+0cNW1hEXLKwouvyyirimiFxJSHAuqEbm4hbICSUuMrbUjIFO4i7e7riPqSSUrTryBEPQoeaYtqy9xHi8UnotKN4ZmH+nPpFRy95E2ay4MsRv2pr7hqyGR3zhUgR4CanNX9LDr0YKeS1qy6V6ePuvq0Pj/StXLJe+tMz1ZdXxu8G3jcSL0vh/eOzUvlictVPUmVy7ZukxuR6gKTOZFkhkf+7GhrNZoOt0Pr5bZkm/gC4WlyqqnyCMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMi0xOVQxNzoxODo1OSswMTowMN/V1S0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTItMTlUMTc6MTg6NTkrMDE6MDCuiG2RAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-2xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-8 bg-gray-50 shadow-lg sm:rounded-3xl sm:p-16">
        <div class="max-w-md mx-auto">
          <div>
            <h2 class="text-center text-sm text-rose-500 uppercase font-semibold mb-3">Welcome to</h2>
            <h1 class="text-center text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              ${appConfig.title}
            </h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-sm leading-5 space-y-6 text-gray-700 sm:text-base sm:leading-6 text-justify">
              <p>
                Our website is still in progress, but you can stay connected with us in the meantime.
                Follow us on social media or subscribe to our newsletter for the latest updates.
              </p>

              <div class='py-4 items-center justify-center flex flex-col'>
                <form class='mb-4 flex justify-center w-full' autocomplete='off'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    class='rounded-l-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-300'
                    requiindigo
                  />
                  <button
                    type='submit'
                    class='rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50'
                  >
                    Notify Me
                  </button>
                </form>
                <p class='text-gray-500 text-sm'>We promise not to spam your inbox.</p>
              </div>

              <p>
                We&apos;re working hard to deliver an exceptional experience. <br/>Thank you for your patience and support.
              </p>
            </div>

            <div class="tracking-wide pt-6 text-sm leading-6 font-medium sm:text-base sm:leading-7">
              <div class='flex justify-center space-x-6 text-gray-500'>
                <a href='https://x.com/riipandi' class='hover:text-blue-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.556c-.884.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.896-.954-2.172-1.549-3.591-1.549-2.719 0-4.924 2.204-4.924 4.924 0 .386.043.762.127 1.124-4.092-.205-7.719-2.166-10.141-5.144-.424.727-.667 1.57-.667 2.472 0 1.705.869 3.212 2.188 4.096-.807-.026-1.567-.247-2.231-.616v.062c0 2.381 1.693 4.366 3.946 4.818-.412.111-.846.171-1.293.171-.316 0-.624-.031-.924-.088.625 1.953 2.437 3.377 4.584 3.416-1.68 1.316-3.801 2.101-6.102 2.101-.396 0-.786-.023-1.17-.068 2.176 1.395 4.755 2.209 7.527 2.209 9.03 0 13.974-7.483 13.974-13.974 0-.213-.005-.426-.014-.637.961-.695 1.794-1.562 2.453-2.549z' />
                  </svg>
                </a>
                <a href='https://github.com/riipandi' class='hover:text-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2.163c-5.421 0-9.837 4.416-9.837 9.837 0 4.354 2.813 8.067 6.72 9.372.491.09.672-.214.672-.476 0-.235-.009-.857-.014-1.682-2.737.594-3.313-1.319-3.313-1.319-.447-1.135-1.092-1.439-1.092-1.439-.892-.611.068-.599.068-.599 1.105.078 1.686 1.135 1.686 1.135.982 1.684 2.576 1.198 3.204.917.099-.713.385-1.199.699-1.475-2.187-.248-4.487-1.093-4.487-4.865 0-1.075.384-1.954 1.014-2.644-.101-.248-.439-1.244.096-2.591 0 0 .827-.265 2.707 1.008.785-.218 1.627-.326 2.464-.33.836.004 1.679.112 2.464.33 1.879-1.273 2.706-1.008 2.706-1.008.536 1.347.198 2.343.097 2.591.63.69 1.013 1.569 1.013 2.644 0 3.78-2.303 4.614-4.497 4.855.396.342.75 1.015.75 2.046 0 1.478-.013 2.671-.013 3.034 0 .265.18.57.676.475 3.905-1.308 6.716-5.02 6.716-9.372 0-5.421-4.416-9.837-9.837-9.837z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
})
